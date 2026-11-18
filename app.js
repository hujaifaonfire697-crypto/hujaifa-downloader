const input = document.getElementById("mediaUrl");
const statusBox = document.getElementById("status");
const platforms = [
  ["TikTok", /(^|\.)tiktok\.com$/i],
  ["Facebook", /(^|\.)facebook\.com$|(^|\.)fb\.watch$/i],
  ["Instagram", /(^|\.)instagram\.com$/i],
  ["YouTube", /(^|\.)youtube\.com$|(^|\.)youtu\.be$/i],
  ["Pinterest", /(^|\.)pinterest\.com$|(^|\.)pin\.it$/i],
  ["X", /(^|\.)x\.com$|(^|\.)twitter\.com$/i]
];

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("pasteBtn").addEventListener("click", async () => {
  try {
    input.value = await navigator.clipboard.readText();
    statusBox.className = "status";
    statusBox.textContent = "লিংক পেস্ট হয়েছে। এখন যাচাই করুন।";
  } catch {
    statusBox.className = "status error";
    statusBox.textContent = "Clipboard access পাওয়া যায়নি। নিজে লিংক পেস্ট করুন।";
  }
});

document.getElementById("checkBtn").addEventListener("click", () => {
  const raw = input.value.trim();
  statusBox.className = "status";
  if (!raw) {
    statusBox.className = "status error";
    statusBox.textContent = "প্রথমে একটি লিংক দিন।";
    return;
  }
  try {
    const url = new URL(raw);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("protocol");
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const found = platforms.find(([, pattern]) => pattern.test(host));
    if (!found) {
      statusBox.className = "status error";
      statusBox.textContent = "এই প্ল্যাটফর্মটি এখনো শনাক্ত করা যাচ্ছে না।";
      return;
    }
    statusBox.className = "status success";
    statusBox.textContent = `${found[0]} লিংক শনাক্ত হয়েছে। ডাউনলোড চালু করতে এই প্ল্যাটফর্মের অনুমোদিত API/ব্যাকএন্ড সংযোগ করতে হবে।`;
  } catch {
    statusBox.className = "status error";
    statusBox.textContent = "সঠিক সম্পূর্ণ URL দিন (https:// দিয়ে শুরু করুন)।";
  }
});
