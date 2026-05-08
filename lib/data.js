const release = {
  id: "rel_2026_05",
  releaseMonth: "2026-05",
  releaseDate: "2026-05-25",
  label: "May 2026 Selling Partner Release Notes",
  sourceFile: "Release_Notes_API_May_2026.xlsx",
  sourceUrl: "https://developer-docs.amazon.com/sp-api/docs/sp-api-metadata-updates",
  totalRows: 48958,
  uniqueMarketplaces: 23,
  uniqueProductTypes: 1804,
  uniquePairs: 11398,
  statusCounts: {
    Published: 26847,
    Upcoming: 22111
  },
  marketplaceSummary: [
    { marketplace: "MX", rowCount: 11017, uniqueProductTypes: 1741 },
    { marketplace: "BR", rowCount: 10864, uniqueProductTypes: 1719 },
    { marketplace: "JP", rowCount: 1634, uniqueProductTypes: 375 },
    { marketplace: "CA", rowCount: 1438, uniqueProductTypes: 479 },
    { marketplace: "SG", rowCount: 1304, uniqueProductTypes: 376 },
    { marketplace: "US", rowCount: 1306, uniqueProductTypes: 377 }
  ],
  topProductTypes: [
    { productType: "COIN_SORTER", rowCount: 2151 },
    { productType: "ANKLE_PAD", rowCount: 1654 },
    { productType: "BIRDBATH", rowCount: 1367 },
    { productType: "SMARTWATCH", rowCount: 822 },
    { productType: "PET_ACTIVITY_TRACKER", rowCount: 617 }
  ]
};

const updates = [
  {
    id: "chg_us_coffee_01",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "COFFEE",
    attribute: "Branded Coffee Machine Insert Type",
    updateType: "valid-values-added",
    updateText: "A new list with valid values is being introduced for the attribute.",
    status: "Upcoming",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_sg_coffee_01",
    releaseMonth: "2026-05",
    marketplace: "SG",
    productType: "COFFEE",
    attribute: "Branded Coffee Machine Insert Type",
    updateType: "valid-values-added",
    updateText: "A new list with valid values is being introduced for the attribute.",
    status: "Upcoming",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_jp_coffee_01",
    releaseMonth: "2026-05",
    marketplace: "JP",
    productType: "COFFEE",
    attribute: "ブランドコーヒーマシンインサートタイプ",
    updateType: "valid-values-removed",
    updateText: "プルダウンの推奨値の削除",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_us_milk_01",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "MILK_SUBSTITUTE",
    attribute: "form_factor.value_id",
    updateType: "attribute-removed",
    updateText: "Attribute is deleted and no longer associated with the product type.",
    status: "Upcoming",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_us_milk_02",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "MILK_SUBSTITUTE",
    attribute: "Form Factor",
    updateType: "attribute-removed",
    updateText: "Attribute is deleted and no longer associated with the product type.",
    status: "Upcoming",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_sg_milk_01",
    releaseMonth: "2026-05",
    marketplace: "SG",
    productType: "MILK_SUBSTITUTE",
    attribute: "Form Factor",
    updateType: "attribute-removed",
    updateText: "Attribute is deleted and no longer associated with the product type.",
    status: "Upcoming",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_us_ankle_01",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "ANKLE_PAD",
    attribute: "Edition",
    updateType: "conditional-required-added",
    updateText: "A new conditionally required attribute is introduced to improve the product detail page. The new attribute will behave as a required attribute if the dependent attribute is filled.",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_us_ankle_02",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "ANKLE_PAD",
    attribute: "Item Display Height",
    updateType: "optional-added",
    updateText: "A new optional attribute is introduced to improve the product detail page.",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_sg_ankle_01",
    releaseMonth: "2026-05",
    marketplace: "SG",
    productType: "ANKLE_PAD",
    attribute: "Item Display Width",
    updateType: "conditional-required-added",
    updateText: "A new conditionally required attribute is introduced to improve the product detail page. The new attribute will behave as a required attribute if the dependent attribute is filled.",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_us_birdbath_01",
    releaseMonth: "2026-05",
    marketplace: "US",
    productType: "BIRDBATH",
    attribute: "Item Display Height",
    updateType: "optional-added",
    updateText: "A new optional attribute is introduced to improve the product detail page.",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_jp_pet_01",
    releaseMonth: "2026-05",
    marketplace: "JP",
    productType: "PET_ACTIVITY_TRACKER",
    attribute: "サービスプロバイダー",
    updateType: "conditional-required-added",
    updateText: "条件付き必須入力項目としてする入力項目の追加",
    status: "Published",
    contributorType: "1P + 3P"
  },
  {
    id: "chg_jp_pet_02",
    releaseMonth: "2026-05",
    marketplace: "JP",
    productType: "PET_ACTIVITY_TRACKER",
    attribute: "service_provider.value_id",
    updateType: "optional-added",
    updateText: "任意入力項目としてする入力項目の追加",
    status: "Published",
    contributorType: "1P + 3P"
  }
];

module.exports = {
  release,
  updates
};
