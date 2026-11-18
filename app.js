
const input = document.getElementById("mediaUrl");
const statusBox = document.getElementById("status");

const platforms = [
  ["TikTok", ["tiktok.com"]],
  ["Facebook", ["facebook.com", "fb.watch"]],
  ["Instagram", ["instagram.com"]],
  ["YouTube", ["youtube.com", "youtu.be"]],
  ["Pinterest", ["pinterest.com", "pin.it"]],
  ["X (Twitter)", ["x.com", "twitter.com", "t.co"]],
  ["Threads", ["threads.net"]],
  ["Snapchat", ["snapchat.com"]],
  ["Reddit", ["reddit.com", "redd.it"]],
  ["Vimeo", ["vimeo.com"]],
  ["Dailymotion", ["dailymotion.com", "dai.ly"]],
  ["Twitch", ["twitch.tv"]]
];

document.getElementById("year").textContent =
  new Date().getFullYear();

function showStatus(message, type = "") {
  statusBox.className = "status " + type;
  statusBox.textContent = message;
}

function detectPlatform(raw) {
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol)) return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  return platforms.find(([, domains]) =>
    domains.some(domain =>
      host === domain || host.endsWith("." + domain)
    )
  );
}

document.getElementById("pasteBtn").addEventListener("click", async () => {
  try {
    input.value = await navigator.clipboard.readText();
    showStatus("লিংক পেস্ট হয়েছে। এবার যাচাই করুন।");
  } catch {
    showStatus("লিংক পেস্ট করা যায়নি। নিজে পেস্ট করুন।", "error");
  }
});

document.getElementById("checkBtn").addEventListener("click", () => {
  const raw = input.value.trim();

  if (!raw) {
    showStatus("প্রথমে একটি লিংক দিন।", "error");
    return;
  }

  try {
    const found = detectPlatform(raw);

    if (!found) {
      showStatus("এই লিংকটি সমর্থিত প্ল্যাটফর্মের নয়।", "error");
      return;
    }

    showStatus(
      `${found[0]} লিংক সফলভাবে শনাক্ত হয়েছে! অনুমোদিত ডাউনলোড সুবিধা সংযুক্ত হলে পরবর্তী ধাপে এগোনো যাবে।`,
      "success"
    );

  } catch {
    showStatus("সঠিক URL দিন। যেমন: https://example.com", "error");
  }
});
