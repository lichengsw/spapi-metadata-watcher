const crypto = require("node:crypto");
const { release, updates } = require("./data");

function toUpperList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function queryUpdates(params = {}) {
  const marketplaces = toUpperList(params.marketplace || params.marketplaces);
  const productTypes = toUpperList(params.productType || params.productTypes);
  const statuses = toUpperList(params.status || params.statuses);
  const limit = Math.max(1, Math.min(Number(params.limit || 20), 100));

  const items = updates.filter((item) => {
    if (marketplaces.length && !marketplaces.includes(item.marketplace)) return false;
    if (productTypes.length && !productTypes.includes(item.productType)) return false;
    if (statuses.length && !statuses.includes(item.status)) return false;
    return true;
  });

  return {
    releaseMonth: release.releaseMonth,
    total: items.length,
    limit,
    items: items.slice(0, limit)
  };
}

function getLatestRelease() {
  return {
    ...release,
    capabilities: [
      "marketplace filtering",
      "product type filtering",
      "webhook delivery",
      "release summary API"
    ]
  };
}

function createSubscription(payload) {
  const marketplaces = toUpperList(payload.marketplaces);
  const productTypes = toUpperList(payload.productTypes);
  const statuses = toUpperList(payload.statuses);
  const token = crypto.randomBytes(12).toString("hex");
  const id = `sub_${crypto.randomBytes(6).toString("hex")}`;
  const createdAt = new Date().toISOString();

  return {
    id,
    createdAt,
    active: true,
    url: payload.url,
    marketplaces,
    productTypes,
    statuses,
    secretToken: token,
    mode: payload.mode || "push",
    note: "Prototype response only. Persistence is intentionally not enabled in this open-source starter."
  };
}

function buildTestEvent(overrides = {}) {
  const sample = updates[0];
  return {
    eventId: `evt_${release.releaseMonth.replace("-", "_")}_${sample.marketplace.toLowerCase()}_${sample.productType.toLowerCase()}`,
    eventType: "product_metadata.updated",
    occurredAt: new Date().toISOString(),
    release: {
      id: release.id,
      month: release.releaseMonth,
      date: release.releaseDate,
      sourceUrl: release.sourceUrl,
      sourceFile: release.sourceFile
    },
    subscription: {
      mode: overrides.mode || "push",
      url: overrides.url || "https://example.com/webhooks/spapi"
    },
    data: {
      marketplace: sample.marketplace,
      productType: sample.productType,
      status: sample.status,
      changeCount: 1,
      changes: [
        {
          attribute: sample.attribute,
          updateType: sample.updateType,
          updateText: sample.updateText,
          contributorType: sample.contributorType
        }
      ]
    }
  };
}

module.exports = {
  buildTestEvent,
  createSubscription,
  getLatestRelease,
  queryUpdates
};
