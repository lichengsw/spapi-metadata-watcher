const codeSamples = {
  curl: `curl "https://your-domain.vercel.app/api/v1/updates?marketplace=US&productType=COFFEE"\n\ncurl -X POST "https://your-domain.vercel.app/api/v1/subscriptions" \\\n  -H "Content-Type: application/json" \\\n  -d '{"url":"https://example.com/webhooks/spapi","marketplaces":["US","SG"],"productTypes":["COFFEE"]}'`,
  node: `const response = await fetch("https://your-domain.vercel.app/api/v1/updates?marketplace=US&productType=COFFEE");\nconst json = await response.json();\nconsole.log(json);\n\nawait fetch("https://your-domain.vercel.app/api/v1/subscriptions", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({\n    url: "https://example.com/webhooks/spapi",\n    marketplaces: ["US", "SG"],\n    productTypes: ["COFFEE"]\n  })\n});`,
  python: `import requests\n\nupdates = requests.get(\n    "https://your-domain.vercel.app/api/v1/updates",\n    params={"marketplace": "US", "productType": "COFFEE"},\n)\nprint(updates.json())\n\nsubscription = requests.post(\n    "https://your-domain.vercel.app/api/v1/subscriptions",\n    json={\n        "url": "https://example.com/webhooks/spapi",\n        "marketplaces": ["US", "SG"],\n        "productTypes": ["COFFEE"],\n    },\n)\nprint(subscription.json())`,
  go: `package main\n\nimport (\n  "fmt"\n  "io"\n  "net/http"\n)\n\nfunc main() {\n  resp, _ := http.Get("https://your-domain.vercel.app/api/v1/updates?marketplace=US&productType=COFFEE")\n  body, _ := io.ReadAll(resp.Body)\n  fmt.Println(string(body))\n}`
};

function setCodeSample(tab) {
  const sample = document.getElementById("codeSample");
  if (!sample) return;
  sample.textContent = codeSamples[tab];

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tab);
  });
}

function renderTable(items) {
  const shell = document.getElementById("demoTable");
  if (!shell) return;

  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${item.marketplace}</td>
          <td>${item.productType}</td>
          <td>${item.attribute}</td>
          <td><span class="status-chip ${item.status.toLowerCase()}">${item.status}</span></td>
        </tr>`
    )
    .join("");

  shell.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Marketplace</th>
          <th>Product Type</th>
          <th>Attribute</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function loadDemo() {
  const [releaseResponse, updatesResponse, payloadResponse] = await Promise.all([
    fetch("/api/v1/releases/latest"),
    fetch("/api/v1/updates/latest?limit=5"),
    fetch("/api/v1/subscriptions/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://example.com/webhooks/spapi" })
    })
  ]);

  const releaseJson = await releaseResponse.json();
  const updatesJson = await updatesResponse.json();
  const payloadJson = await payloadResponse.json();

  const releaseMonth = document.getElementById("releaseMonth");
  const releaseStats = document.getElementById("releaseStats");
  if (releaseMonth && releaseStats) {
    releaseMonth.textContent = releaseJson.release.releaseMonth;
    releaseStats.textContent = `${releaseJson.release.uniqueMarketplaces} marketplaces, ${releaseJson.release.uniqueProductTypes} product types, ${releaseJson.release.statusCounts.Upcoming} upcoming changes.`;
  }

  const payloadText = JSON.stringify(payloadJson.deliveryPreview, null, 2);
  ["heroPayload", "demoPayload", "docsPayload"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.textContent = payloadText;
  });

  renderTable(updatesJson.items);
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => setCodeSample(button.dataset.tab));
});

setCodeSample("curl");
loadDemo().catch((error) => {
  const message = `Failed to load demo data: ${error.message}`;
  ["heroPayload", "demoPayload", "docsPayload"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.textContent = message;
  });
});
