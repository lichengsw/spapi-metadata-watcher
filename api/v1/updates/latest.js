const { sendJson, sendMethodNotAllowed } = require("../../../lib/http");
const { queryUpdates } = require("../../../lib/service");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res, ["GET"]);
    return;
  }

  sendJson(res, 200, {
    ok: true,
    mode: "latest",
    ...queryUpdates(req.query || {})
  });
};
