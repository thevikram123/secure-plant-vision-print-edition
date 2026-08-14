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
  document.documentElement.classList.add("static-capture");
  document.body.style.background = "#f5f2e9";

  // The screen deck's viewport-fit zoom excludes Section 2's final outcome row
  // from the element screenshot. Capture that plate at its natural bounds;
  // other sections retain their intentionally compact screen composition.
  const staticStyles = document.createElement("style");
  staticStyles.textContent = `
    #why-now,
    #use-cases {
      zoom: 1 !important;
      max-height: none !important;
      overflow: visible !important;
    }
    #why-now > div,
    #use-cases > div {
      max-width: 72rem !important;
    }
    *, *::before, *::after {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `;
  document.head.append(staticStyles);
});

const sections = page.locator("main > section");
const count = await sections.count();
for (let index = 0; index < count; index += 1) {
  const section = sections.nth(index);
  await section.evaluate((element) => element.scrollIntoView({ block: "start", inline: "nearest" }));
  // Let IntersectionObserver-driven content and lazy images resolve after the
  // section enters the viewport, then capture the complete element itself.
  await page.waitForTimeout(300);
  await section.locator("img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode?.().catch(() => undefined)));
  });
  await section.screenshot({
    path: resolve(outputDir, `section-${String(index + 1).padStart(2, "0")}.png`),
  });
}

await browser.close();
console.log(`Captured ${count} static section plates.`);
