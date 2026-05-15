import { chromium, devices } from 'playwright';

const url = process.argv[2] || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ...devices['Pixel 7'] });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'mobile-preview-home.png', fullPage: true });
console.log('Saved mobile-preview-home.png');
await browser.close();
