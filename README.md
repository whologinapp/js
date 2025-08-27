## WhoLogin JS SDK

JavaScript/TypeScript SDK for interacting with the WhoLogin API.

### Installation

```bash
npm install whologin
```

### Quick Example

```typescript
import { WhoLoginAPI, ProfileBuilder } from 'whologin';

const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

// Create and update quickly (set only what you need)
const created = await api.profile.create(
  new ProfileBuilder().withProfileName('Minimal').withTag('GettingStarted')
);

// Update using builder: note + tags + proxy
await api.profile.update(
  created.id,
  new ProfileBuilder()
    .withNote('Updated')
    .withTags(['Updated', 'Example'])
    .withDirectProxy()
);
```

### Examples

See more complete examples in the `examples/` folder:

- `examples/basic-usage.js`
- `examples/extension-manager.js`
- `examples/open-with-playwright.js`
- `examples/open-with-puppeteer.js`

### Error handling

All API calls throw `WhoLoginAPIError` when the backend returns `{ success: false }`.
Wrap calls in `try/catch` and read `error.message` for a user-friendly reason.

```ts
import { WhoLoginAPI, WhoLoginAPIError, ProfileBuilder } from 'whologin';

const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

try {
  await api.profile.update(
    'non-existent-id',
    new ProfileBuilder().withNote('x')
  );
} catch (e) {
  if (e instanceof WhoLoginAPIError) {
    console.error('API failed:', e.message);
  } else {
    console.error('Unexpected error:', e);
  }
}
```

### API Overview

#### Profile Endpoints

- `create(requestOrBuilder)`
- `getAll()`
- `search(searchRequest)`
- `getById(profileId)`
- `getListOpen()`
- `update(profileId, requestOrBuilder)`
- `delete(profileId)`
- `open(profileId, openRequest?)`
- `close(profileId)`
- `addTags(profileId, tags)`
- `removeTags(profileId, tags)`
- `exportCookies(profileId)`
- `importCookies(profileId, cookies)`
- `geolocate(profileId)`
- `getTrash()`
- `deleteFromTrash(profileId)`
- `cleanTrash()`
- `restoreAllFromTrash()`
- `restoreFromTrash(profileId)`

#### Proxy Endpoints

- `getAll()`
- `create(createRequest)`
- `update(proxyId, updateRequest)`
- `delete(proxyId)`
- `geolocateById(proxyId)`
- `geolocate(geolocateRequest)`

#### Tag Endpoints

- `getAll()`
- `create(createRequest)`
- `update(tagId, updateRequest)`
- `delete(tagId)`
