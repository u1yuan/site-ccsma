import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "Programs that grow futures",
    sections: [
      "Bachelor of Science in Computer Science",
      "Bachelor of Science in Information Technology",
      "Bachelor of Multimedia Arts",
      "Bachelor of Science in Cybersecurity",
      "Bachelor of Digital Marketing and Management",
      "Bachelor of Science in Financial Technology Engineering",
    ],
  },
  {
    path: "/organizations/",
    heading: "Organizations",
    sections: [
      "Association for Computing Machinery",
      "Alliance of Information Technology Students",
      "Junior Philippine Computer Society",
      "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts",
      "Student Coordinating Council",
    ],
  },
  {
    path: "/student-activities/",
    heading: "Student Activities",
    sections: [
      "Vision",
      "Mission",
      "Roles and Function",
      "Student Development programs",
      "Student Activities responsibilities",
      "Three living roots",
      "Find SADU",
    ],
  },
];

for (const route of routes) {
  test(`${route.path} renders its complete accessible story`, async ({
    page,
  }) => {
    await page.goto(route.path);

    await expect(
      page.getByRole("heading", { level: 1, name: route.heading }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("complementary", {
        name: "Unofficial concept disclaimer",
      }),
    ).toBeVisible();

    for (const section of route.sections) {
      const semanticHeading = page
        .locator("h2")
        .filter({ hasText: section })
        .first();
      await expect(semanticHeading).toBeAttached();
      await semanticHeading.scrollIntoViewIfNeeded();
      await expect(page.getByRole("heading", { name: section })).toBeVisible();
    }

    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter(
      (violation) => violation.impact === "critical",
    );
    expect(critical).toEqual([]);
  });
}

test("keyboard navigation exposes the skip link and visible focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);

  await page.keyboard.press("Tab");
  const focusedOutline = await page.locator(":focus").evaluate((element) => {
    const styles = getComputedStyle(element);
    return (
      styles.outlineStyle !== "none" &&
      Number.parseFloat(styles.outlineWidth) >= 2
    );
  });
  expect(focusedOutline).toBe(true);
});

test("organization placeholders and SADU details remain exact", async ({
  page,
}) => {
  await page.goto("/organizations/");
  await expect(page.getByText("Content coming soon")).toHaveCount(5);

  await page.goto("/student-activities/");
  await expect(page.getByText("Room 1501", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Office Hours: Monday to Friday, 8:00 a.m. – 5:00 p.m.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Trunkline: (02) 8281 8888 Local 128", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Email: sadu@feutech.edu.ph", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Address: P. Paredes St., Sampaloc, Manila 1015", {
      exact: true,
    }),
  ).toBeVisible();
});

test.describe("reduced motion", () => {
  test("disables Lenis motion, particles, ambient pulse, and parallax without hiding content", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator('[data-canvas-state="static"]')).toBeVisible();
    await expect(page.locator('[data-motion-state="animated"]')).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Bachelor of Multimedia Arts" }),
    ).toBeAttached();

    const hiddenMotionContent = await page
      .locator('[data-motion-state="static"]')
      .evaluateAll(
        (elements) =>
          elements.filter((element) => {
            const styles = getComputedStyle(element);
            return (
              styles.display === "none" ||
              styles.visibility === "hidden" ||
              styles.opacity === "0"
            );
          }).length,
      );
    expect(hiddenMotionContent).toBe(0);
  });
});
