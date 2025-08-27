// Manage extensions example (install, disable, pin, uninstall) via helper APIs
import { WhoLoginAPI, ProfileBuilder, WhoLoginAPIError } from 'whologin';

async function run() {
  const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

  try {
    const created = await api.profile.create(
      new ProfileBuilder().withProfileName('Ext Profile')
    );

    console.log('Profile:', created.id);

    // Install extensions via helper
    await api.profile.installExtensions(created.id, [
      'C:/extensions/adblock.crx',
      'C:/extensions/darkreader', // unpacked folder
    ]);
    console.log('Requested install for 2 extensions');

    await api.profile.open(created.id);

    // Disable an extension by id
    await api.profile.disableExtensions(created.id, ['ext_adblock_id']);
    console.log('Requested disable ext_adblock_id');

    // Pin an extension by id
    await api.profile.pinExtensions(created.id, ['ext_darkreader_id']);
    console.log('Requested pin ext_darkreader_id');

    // Uninstall an extension by id
    await api.profile.uninstallExtensions(created.id, ['ext_adblock_id']);
    console.log('Requested uninstall ext_adblock_id');

    // Fetch and view current extensions list (read-only view)
    const list = await api.profile.getExtensions(created.id);
    console.log('Current extensions (read-only list):', list);
  } catch (err) {
    if (err instanceof WhoLoginAPIError) {
      console.error('API Error:', err.message);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

run();
