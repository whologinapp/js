// Open profile and connect with Playwright via WebSocket URL
import { WhoLoginAPI, ProfileBuilder, WhoLoginAPIError } from 'whologin';
import { chromium } from 'playwright';

async function run() {
  const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

  try {
    const created = await api.profile.create(
      new ProfileBuilder().withProfileName('Playwright Automation')
    );

    // Request open and get WebSocket URL from API
    const { wsUrl } = await api.profile.open(created.id, {
      debuggingPort: 9222,
      headless: false,
    });
    console.log('WS URL:', wsUrl);

    const browser = await chromium.connectOverCDP(wsUrl);
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];
    await page.goto('https://example.com');
    console.log('Page title:', await page.title());
  } catch (err) {
    if (err instanceof WhoLoginAPIError) {
      console.error('API Error:', err.message);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

run();
