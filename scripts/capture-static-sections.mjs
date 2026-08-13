import { chromium } from "file:///C:/Users/allad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("tmp/pdfs/static-sections");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await page.goto("http://127.0.0.1:4174/index.html", { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelectorAll("header, nav, footer, .print-hidden").forEach((element) => element.remove());
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.background = "#f5f2e9";
});

const sections = page.locator("main > section");
const count = await sections.count();
for (let index = 0; index < count; index += 1) {
  const section = sections.nth(index);
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({ path: resolve(outputDir, `section-${String(index + 1).padStart(2, "0")}.png`) });
}

await browser.close();
console.log(`Captured ${count} static section plates.`);
