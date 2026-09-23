import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
await fs.mkdir(".impeccable/review", { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector(".sculpture canvas");
await page.getByRole("button", { name: "Pause sculpture animation" }).click();
await page.screenshot({
  path: ".impeccable/review/desktop.png",
  fullPage: true,
});
assert.equal(
  await page
    .getByRole("button", { name: "Online payments coming soon" })
    .isDisabled(),
  true,
);
assert.match(
  await page
    .getByRole("link", { name: "Request payment details" })
    .getAttribute("href"),
  /^mailto:/,
);
assert.equal(
  await page
    .getByRole("link", { name: "Explore CrackAI" })
    .getAttribute("href"),
  "https://www.crackai.tech/",
);
assert.match(
  await page.locator("footer").innerText(),
  /Business registration name: Aarush Gupta/,
);
await page.getByRole("link", { name: "Business details" }).click();
await page.waitForLoadState("networkidle");
assert.equal(page.url(), "http://localhost:3002/business-details");
const businessDetails = await page.getByRole("main").innerText();
assert.match(businessDetails, /Business registration name\s+Aarush Gupta/);
for (const service of [
  "Web development",
  "App development",
  "AI and machine learning",
  "AI automation and integrations",
]) {
  assert.match(businessDetails, new RegExp(service));
}
await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.waitForSelector(".project");
assert.equal(await page.locator(".project").count(), 2);
await page.getByRole("button", { name: "AI & tools", exact: true }).click();
assert.equal(await page.locator(".project").count(), 0);
assert.equal(await page.locator(".resources-project").count(), 1);
await page.getByRole("button", { name: "Websites", exact: true }).click();
assert.equal(await page.locator(".project").count(), 2);
assert.equal(await page.locator(".resources-project").count(), 0);
await page.getByRole("button", { name: "All work", exact: true }).click();
await page
  .getByRole("button", { name: "AI & automations", exact: false })
  .click();
assert.equal(await page.locator("#service-1").isVisible(), true);
assert.equal(await page.locator("#service-0").isVisible(), false);
await page
  .getByRole("button", { name: "Web development", exact: false })
  .click();
await page.getByRole("button", { name: "Chrome material" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Chrome material" })
    .getAttribute("aria-pressed"),
  "true",
);
await page.getByRole("button", { name: "Orange material" }).click();
await page.getByLabel("Your name").fill("Test Client");
await page
  .getByLabel("Email address", { exact: true })
  .fill("test@example.com");
await page.getByLabel("What can I help with?").selectOption("Web development");
await page
  .getByLabel("A little about your project")
  .fill("I would like a new website for my business.");
assert.equal(
  await page.locator("form").evaluate((f) => f.checkValidity()),
  true,
);
await page.getByRole("button", { name: "Let’s start a conversation" }).click();
assert.match(
  await page.locator(".form-note").innerText(),
  /email draft is ready/,
);
for (const width of [390, 320, 768, 1024]) {
  await page.setViewportSize({ width, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(250);
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    offenders: [...document.querySelectorAll("body *")]
      .filter(
        (e) =>
          e.getBoundingClientRect().right > innerWidth + 1 &&
          getComputedStyle(e).position !== "absolute",
      )
      .map((e) => ({
        tag: e.tagName,
        class: e.className,
        right: e.getBoundingClientRect().right,
      })),
  }));
  if (layout.scroll > width) console.log(layout);
  assert.equal(layout.scroll <= width, true, `overflow at ${width}`);
  if (width === 390) {
    await page.locator("form").evaluate((f) => f.reset());
    await page.screenshot({
      path: ".impeccable/review/mobile.png",
      fullPage: true,
    });
    await page.getByLabel("Your name").focus();
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByLabel("Your name")
        .evaluate((e) => document.activeElement === e),
      true,
    );
    await page.getByRole("button", { name: "Menu", exact: false }).click();
    assert.equal(await page.locator("#navigation").isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .locator("#menu-toggle")
        .evaluate((e) => document.activeElement === e),
      true,
    );
    await page.getByRole("button", { name: "Menu", exact: false }).click();
    await page.getByRole("link", { name: "Expertise", exact: true }).click();
    assert.equal(await page.locator("#navigation").isVisible(), false);
  }
}
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await reduced.goto("http://localhost:3002", { waitUntil: "networkidle" });
assert.equal(
  await reduced
    .getByRole("button", { name: "Play sculpture animation" })
    .count(),
  1,
);
assert.equal(
  await reduced.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
  "auto",
);
assert.deepEqual(errors, []);
await browser.close();
console.log(
  "PASS: desktop/mobile renders; no overflow at 320/390/768/1024; filters; accordion; material controls; form validation and email draft; mobile navigation; reduced motion; no browser runtime errors.",
);
