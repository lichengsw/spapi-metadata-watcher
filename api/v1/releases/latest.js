const { sendJson, sendMethodNotAllowed } = require("../../../lib/http");
const { getLatestRelease } = require("../../../lib/service");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res, ["GET"]);
    return;
  }

  sendJson(res, 200, {
    ok: true,
    release: getLatestRelease()
  });
};
