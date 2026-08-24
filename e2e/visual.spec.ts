import { expect, test } from "@playwright/test";

const visualRoutes = [
  { path: "/", name: "home" },
  { path: "/programs/", name: "programs" },
  { path: "/organizations/", name: "organizations" },
  { path: "/student-activities/", name: "student-activities" },
];

for (const route of visualRoutes) {
  test(`${route.name} desktop composition has no horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route.path, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        ".story-section, .org-card, .org-node { content-visibility: visible !important; } [data-motion-primitive] { opacity: 1 !important; transform: none !important; filter: none !important; }",
    });
    await page.waitForTimeout(100);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    await page.screenshot({
      path: `test-results/visual/${route.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
