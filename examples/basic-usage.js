// Basic create and update example (minimal)
import { WhoLoginAPI, ProfileBuilder, WhoLoginAPIError } from 'whologin';

async function run() {
  const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

  try {
    // Only set what you need via builder
    const created = await api.profile.create(
      new ProfileBuilder()
        .withProfileName('Minimal Profile')
        .withTag('GettingStarted')
        .withHttpProxy({ host: 'proxy.example.com', port: 8080 })
    );
    console.log('Created:', created.id);

    // Update via builder as well: note + tags + proxy
    const updated = await api.profile.update(
      created.id,
      new ProfileBuilder()
        .withNote('Updated note via builder')
        .withTags(['Updated', 'Example'])
        .withDirectProxy()
    );
    console.log('Updated:', updated.id);
  } catch (err) {
    if (err instanceof WhoLoginAPIError) {
      console.error('API Error:', err.message);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

run();
