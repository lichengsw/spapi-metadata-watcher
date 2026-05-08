const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const url = require("node:url");

const rootDir = __dirname;

const routes = {
  "/api/v1/releases/latest": require("./api/v1/releases/latest"),
  "/api/v1/updates": require("./api/v1/updates/index"),
  "/api/v1/updates/latest": require("./api/v1/updates/latest"),
  "/api/v1/subscriptions": require("./api/v1/subscriptions/index"),
  "/api/v1/subscriptions/test": require("./api/v1/subscriptions/test")
};

const staticMap = {
  "/": "index.html",
  "/docs": "docs.html",
  "/docs.html": "docs.html",
  "/index.html": "index.html",
  "/styles.css": "styles.css",
  "/script.js": "script.js",
  "/openapi.json": "openapi.json"
};

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

function serveFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  res.statusCode = 200;
  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
}

function createServer() {
  return http.createServer(async (req, res) => {
    const parsedUrl = new url.URL(req.url, "http://localhost:3000");
    const pathname = parsedUrl.pathname;

    if (routes[pathname]) {
      req.query = Object.fromEntries(parsedUrl.searchParams.entries());
      try {
        await routes[pathname](req, res);
      } catch (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(
          JSON.stringify(
            {
              ok: false,
              error: "internal_error",
              message: error.message
            },
            null,
            2
          )
        );
      }
      return;
    }

    if (staticMap[pathname]) {
      serveFile(res, path.join(rootDir, staticMap[pathname]));
      return;
    }

    if (pathname.startsWith("/assets/")) {
      serveFile(res, path.join(rootDir, pathname));
      return;
    }

    res.statusCode = 404;
    res.end("Not found");
  });
}

if (require.main === module) {
  const server = createServer();
  const port = Number(process.env.PORT || 3000);
  server.listen(port, () => {
    console.log(`spapi-metadata-watcher running at http://localhost:${port}`);
  });
}

module.exports = {
  createServer
};
