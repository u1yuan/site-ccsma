# Performance profile

The automated landing-page budget check uses a 390 × 844 viewport, 4× CPU slowdown, 100 ms network latency, 1.6 Mbps download throughput, and 750 Kbps upload throughput. It reads buffered `largest-contentful-paint` and `layout-shift` entries from the production static export.

Budgets:

- LCP below 2.5 seconds
- CLS below 0.1

Run it with the rest of the browser suite:

```sh
npm run test:e2e
```
