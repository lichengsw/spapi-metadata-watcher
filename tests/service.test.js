const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildTestEvent,
  createSubscription,
  getLatestRelease,
  queryUpdates
} = require("../lib/service");

test("getLatestRelease exposes expected release summary", () => {
  const release = getLatestRelease();

  assert.equal(release.releaseMonth, "2026-05");
  assert.equal(release.uniqueMarketplaces, 23);
  assert.equal(release.statusCounts.Upcoming, 22111);
  assert.ok(release.capabilities.includes("webhook delivery"));
});

test("queryUpdates filters by marketplace and product type", () => {
  const result = queryUpdates({ marketplace: "US", productType: "COFFEE" });

  assert.equal(result.total, 1);
  assert.equal(result.items[0].marketplace, "US");
  assert.equal(result.items[0].productType, "COFFEE");
});

test("queryUpdates respects status filter and limit bounds", () => {
  const result = queryUpdates({ status: "Published", limit: "1" });

  assert.equal(result.limit, 1);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].status, "Published");
});

test("createSubscription normalizes filters and returns a token", () => {
  const subscription = createSubscription({
    url: "https://example.com/webhooks/spapi",
    marketplaces: ["US", "SG"],
    productTypes: ["COFFEE"],
    statuses: ["Upcoming"]
  });

  assert.match(subscription.id, /^sub_[a-f0-9]{12}$/);
  assert.equal(subscription.url, "https://example.com/webhooks/spapi");
  assert.deepEqual(subscription.marketplaces, ["US", "SG"]);
  assert.deepEqual(subscription.productTypes, ["COFFEE"]);
  assert.deepEqual(subscription.statuses, ["Upcoming"]);
  assert.match(subscription.secretToken, /^[a-f0-9]{24}$/);
});

test("buildTestEvent uses release metadata and override url", () => {
  const event = buildTestEvent({ url: "https://example.com/custom-hook", mode: "query" });

  assert.equal(event.eventType, "product_metadata.updated");
  assert.equal(event.release.month, "2026-05");
  assert.equal(event.subscription.url, "https://example.com/custom-hook");
  assert.equal(event.subscription.mode, "query");
  assert.equal(event.data.productType, "COFFEE");
});
