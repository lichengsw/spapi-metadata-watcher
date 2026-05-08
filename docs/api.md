# API Guide

## Endpoints

### `GET /api/v1/releases/latest`

Returns the latest known release summary.

### `GET /api/v1/updates`

Query normalized metadata changes.

Query params:

- `marketplace`
- `productType`
- `status`
- `limit`

### `GET /api/v1/updates/latest`

Alias for the latest release change query.

### `POST /api/v1/subscriptions`

Creates a prototype webhook subscription response.

Request body:

```json
{
  "url": "https://example.com/webhooks/spapi",
  "marketplaces": ["US", "SG"],
  "productTypes": ["COFFEE"],
  "statuses": ["Upcoming", "Published"]
}
```

### `POST /api/v1/subscriptions/test`

Returns a webhook delivery preview payload.

## Language Samples

### curl

```bash
curl "http://localhost:3000/api/v1/updates?marketplace=US&productType=COFFEE"
```

### JavaScript

```js
const response = await fetch("http://localhost:3000/api/v1/updates?marketplace=US&productType=COFFEE");
const json = await response.json();
```

### Python

```python
import requests

response = requests.get(
    "http://localhost:3000/api/v1/updates",
    params={"marketplace": "US", "productType": "COFFEE"},
)
print(response.json())
```

### Go

```go
package main

import (
  "fmt"
  "io"
  "net/http"
)

func main() {
  resp, _ := http.Get("http://localhost:3000/api/v1/updates?marketplace=US&productType=COFFEE")
  body, _ := io.ReadAll(resp.Body)
  fmt.Println(string(body))
}
```
