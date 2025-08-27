// Open profile and connect with Puppeteer via WebSocket URL
import { WhoLoginAPI, ProfileBuilder, WhoLoginAPIError } from 'whologin';
import { connect } from 'puppeteer-core';

async function run() {
  const api = new WhoLoginAPI('YOUR-API-URL', 'YOUR-API-KEY');

  try {
    const created = await api.profile.create(
      new ProfileBuilder().withProfileName('Puppeteer Automation')
    );

    // Request open and get WebSocket URL from API
    const wsUrl = await api.profile.open(created.id, {
      debuggingPort: 9222,
      headless: false,
    });
    console.log('WS URL:', wsUrl);

    const browser = await connect({
      browserWSEndpoint: wsUrl,
      defaultViewport: false,
    });
    const page = await browser.newPage();
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
