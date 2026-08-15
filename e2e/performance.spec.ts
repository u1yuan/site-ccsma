import { expect, test } from "@playwright/test";

interface PageMetrics {
  lcp: number;
  cls: number;
  shifts: Array<{
    value: number;
    sources: Array<{
      element: string;
      previousY: number;
      currentY: number;
    }>;
  }>;
}

declare global {
  interface Window {
    __ccsmaMetrics: PageMetrics;
  }
}

test("landing page stays inside the documented mobile 4G performance budget", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "CDP performance emulation requires Chromium",
  );

  const client = await page.context().newCDPSession(page);
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 100,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular4g",
  });

  await page.addInitScript(() => {
    window.__ccsmaMetrics = { lcp: 0, cls: 0, shifts: [] };
    new PerformanceObserver((entries) => {
      const latest = entries.getEntries().at(-1);
      if (latest) window.__ccsmaMetrics.lcp = latest.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((entries) => {
      for (const entry of entries.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          sources: Array<{
            node: Element | null;
            previousRect: DOMRectReadOnly;
            currentRect: DOMRectReadOnly;
          }>;
          value: number;
        };
        if (!shift.hadRecentInput) {
          window.__ccsmaMetrics.cls += shift.value;
          window.__ccsmaMetrics.shifts.push({
            value: shift.value,
            sources: shift.sources.map((source) => ({
              element: source.node
                ? `${source.node.tagName.toLowerCase()}.${source.node.className}`
                : "unknown",
              previousY: source.previousRect.y,
              currentY: source.currentRect.y,
            })),
          });
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(750);

  const metrics = await page.evaluate(() => window.__ccsmaMetrics);
  expect(metrics.lcp).toBeGreaterThan(0);
  expect(metrics.lcp).toBeLessThan(2500);
  expect(metrics.cls, JSON.stringify(metrics.shifts)).toBeLessThan(0.1);
});
