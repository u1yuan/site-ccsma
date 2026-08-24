import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "Welcome to CCSMA",
    sections: [
      "Explore the programs",
      "Meet your organizations",
      "Get involved with SADU",
    ],
  },
  {
    path: "/programs/",
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
    sections: [],
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

  await expect(page.getByText("C/", { exact: true })).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "CCSMA concept home" }),
  ).toBeVisible();

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

test("organization descriptions and SADU details remain exact", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto("/organizations/");
  await expect(page.getByText("Content coming soon")).toHaveCount(0);

  for (const abbr of ["ACM", "AITS", "JPCS", "PRISM", "SCC"]) {
    await expect(page.getByText(abbr, { exact: true })).toBeVisible();
  }

  await expect(page.locator('img[src="/logos/orgs/acm.jpg"]')).toBeVisible();
  await expect(page.locator('img[src="/logos/orgs/aits.jpg"]')).toBeVisible();
  await expect(page.locator('img[src="/logos/orgs/jpcs.jpg"]')).toBeVisible();
  await expect(page.locator('img[src="/logos/orgs/prism.jpg"]')).toBeVisible();
  await expect(page.locator('img[src="/logos/orgs/scc.jpg"]')).toBeVisible();

  const distinctivePhrases = [
    {
      slug: "acm",
      phrase:
        "Philippines' second internationally accredited ACM student chapter",
    },
    { slug: "aits", phrase: "Established in 2014" },
    { slug: "jpcs", phrase: "one of the oldest student organizations" },
    {
      slug: "prism",
      phrase:
        "official academic organization of the Multimedia Arts Department",
    },
    { slug: "scc", phrase: "highest governing student body" },
  ];

  for (const { phrase } of distinctivePhrases) {
    await expect(page.getByText(phrase)).toHaveCount(0);
  }

  for (const { slug, phrase } of distinctivePhrases) {
    await page.goto(`/organizations/${slug}/`);
    await expect(page.getByText("Content coming soon")).toHaveCount(0);
    const copy = page.getByText(phrase);
    await copy.scrollIntoViewIfNeeded();
    await expect(copy).toBeVisible();
  }

  await page.goto("/student-activities/");
  await expect(
    page.getByRole("img", {
      name: "Student Activities and Development Unit logo",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Directors" })).toBeVisible();
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

test("organization detail pages render from the map and stay accessible", async ({
  page,
}) => {
  test.setTimeout(90_000);
  // The organizations directory is an orbital "solar system": planets rotate for
  // sighted pointer users (and pause on hover/focus so they're clickable). For a
  // deterministic navigation check we drive the reduced-motion path, where the
  // planets hold static positions — the same code path keyboard users get.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/organizations/");
  await page.locator("#acm").scrollIntoViewIfNeeded();
  const cardLink = page
    .getByRole("link", { name: /Association for Computing Machinery/ })
    .first();
  await cardLink.click();
  await expect(page).toHaveURL(/\/organizations\/acm\/?$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Association for Computing Machinery — FEU Tech Student Chapter",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Philippines' second internationally accredited ACM student chapter",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to all organizations" }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter(
    (violation) => violation.impact === "critical",
  );
  expect(critical).toEqual([]);

  for (const slug of ["aits", "jpcs", "prism", "scc"] as const) {
    await page.goto(`/organizations/${slug}/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Photos coming soon").first()).toBeVisible();
  }
});

test("activity reveal opens from the keyboard and closes with Escape", async ({
  page,
}) => {
  await page.goto("/organizations/");
  const trigger = page.getByRole("button", { name: "ACM activity photos" });
  await trigger.hover();
  const hoverDialog = page.getByRole("dialog", { name: "ACM activity photos" });
  await expect(hoverDialog).toBeVisible();
  await expect(
    hoverDialog.getByRole("img", { name: "ACM student activity" }),
  ).toBeVisible();

  await trigger.focus();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "ACM activity photos" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("img", { name: "ACM student activity" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
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
      page.getByRole("heading", { name: "Meet your organizations" }),
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
