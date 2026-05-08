const test = require("node:test");
const assert = require("node:assert/strict");

const { createServer } = require("../dev-server");

let server;
let baseUrl;

test.before(async () => {
  server = createServer();
  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
});

test("home page loads with core product copy", async () => {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(html, /Track SP-API metadata updates before they break your integration\./);
  assert.match(html, /View live demo/);
});

test("docs page loads with quickstart content", async () => {
  const response = await fetch(`${baseUrl}/docs`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Fast path for query API and webhook integration\./);
  assert.match(html, /Create a subscription/);
});

test("release endpoint returns normalized release summary", async () => {
  const response = await fetch(`${baseUrl}/api/v1/releases/latest`);
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.release.releaseMonth, "2026-05");
  assert.equal(json.release.uniqueProductTypes, 1804);
});

test("updates endpoint filters data", async () => {
  const response = await fetch(`${baseUrl}/api/v1/updates?marketplace=SG&productType=COFFEE`);
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.total, 1);
  assert.equal(json.items[0].marketplace, "SG");
  assert.equal(json.items[0].productType, "COFFEE");
});

test("subscriptions endpoint validates missing url", async () => {
  const response = await fetch(`${baseUrl}/api/v1/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  const json = await response.json();

  assert.equal(response.status, 400);
  assert.equal(json.error, "missing_url");
});

test("subscriptions endpoint returns normalized prototype subscription", async () => {
  const response = await fetch(`${baseUrl}/api/v1/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: "https://example.com/webhooks/spapi",
      marketplaces: ["US", "SG"],
      productTypes: ["COFFEE"],
      statuses: ["Upcoming"]
    })
  });
  const json = await response.json();

  assert.equal(response.status, 201);
  assert.equal(json.ok, true);
  assert.equal(json.subscription.url, "https://example.com/webhooks/spapi");
  assert.deepEqual(json.subscription.marketplaces, ["US", "SG"]);
});

test("test delivery endpoint returns preview payload", async () => {
  const response = await fetch(`${baseUrl}/api/v1/subscriptions/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: "https://example.com/webhooks/spapi"
    })
  });
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.deliveryPreview.eventType, "product_metadata.updated");
  assert.equal(json.deliveryPreview.data.marketplace, "US");
});

test("missing route returns 404", async () => {
  const response = await fetch(`${baseUrl}/does-not-exist`);
  const text = await response.text();

  assert.equal(response.status, 404);
  assert.equal(text, "Not found");
});
