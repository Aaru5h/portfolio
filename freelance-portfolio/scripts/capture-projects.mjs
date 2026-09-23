import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
for (const [name, url] of [
  ["tomas", "https://tomas-bau-website.vercel.app"],
  ["echofoil", "https://echo-foil.vercel.app"],
  ["crackai", "https://www.crackai.tech/"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(2200);
  await page.screenshot({
    path: `public/projects/${name}.jpg`,
    type: "jpeg",
    quality: 88,
  });
  await page.close();
}
await browser.close();
