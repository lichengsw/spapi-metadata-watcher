const { readJson, sendJson, sendMethodNotAllowed } = require("../../../lib/http");
const { createSubscription } = require("../../../lib/service");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendMethodNotAllowed(res, ["POST", "OPTIONS"]);
    return;
  }

  let payload;
  try {
    payload = await readJson(req);
  } catch (_error) {
    sendJson(res, 400, {
      ok: false,
      error: "invalid_json"
    });
    return;
  }

  if (!payload.url) {
    sendJson(res, 400, {
      ok: false,
      error: "missing_url"
    });
    return;
  }

  sendJson(res, 201, {
    ok: true,
    subscription: createSubscription(payload)
  });
};
