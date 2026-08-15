import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const port = 4173;
const outputRoot = resolve(process.cwd(), "out");
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

function resolveRequestPath(requestUrl = "/") {
  const pathname = decodeURIComponent(
    new URL(requestUrl, `http://127.0.0.1:${port}`).pathname,
  );
  const relativePath = normalize(pathname).replace(/^[/\\]+/, "");
  let candidate = resolve(join(outputRoot, relativePath));

  if (!candidate.startsWith(outputRoot)) return null;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = join(candidate, "index.html");
  } else if (!existsSync(candidate) && !extname(candidate)) {
    candidate = join(candidate, "index.html");
  }

  return candidate;
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url);

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type":
      mimeTypes.get(extname(filePath)) ?? "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Static export available at http://127.0.0.1:${port}\n`);
});
