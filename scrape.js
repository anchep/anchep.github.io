import { chromium } from 'playwright';
import fs from 'fs';

async function scrape() {
  console.log('Starting scrape...');
  let browser;
  
  try {
    // 模拟真实用户的浏览器配置
    browser = await chromium.launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '--disable-dev-shm-usage',
        '--no-sandbox'
      ]
    });
    
    console.log('Browser launched successfully');
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: {
        width: 1920,
        height: 1080
      }
    });
    
    console.log('Context created successfully');
    
    const page = await context.newPage();
    console.log('Page created successfully');
    
    // 禁用自动化特征
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['zh-CN', 'zh', 'en-US', 'en']
      });
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5]
      });
    });
    
    console.log('Automation features disabled');
    
    console.log('Navigating to website...');
    await page.goto('https://www.280i.com/series/pve', {
      waitUntil: 'load',
      timeout: 30000
    });
    
    console.log('Navigation completed');
    
    // 检查是否遇到Cloudflare验证
    const cloudflareChallenge = await page.locator('.cf-browser-verification').count();
    if (cloudflareChallenge > 0) {
      console.log('Cloudflare challenge detected, waiting...');
      // 等待用户手动完成验证
      await page.waitForTimeout(30000);
    }
    
    // 模拟真实用户行为
    await page.mouse.move(100, 100);
    await page.waitForTimeout(500);
    await page.mouse.move(200, 200);
    await page.waitForTimeout(500);
    await page.mouse.move(300, 300);
    await page.waitForTimeout(500);
    
    // 等待页面加载完成
    console.log('Waiting for page to load...');
    await page.waitForTimeout(3000);
    
    // 获取页面标题
    const title = await page.title();
    console.log('Page title:', title);
    
    // 获取页面内容
    const content = await page.content();
    console.log('Page content length:', content.length);
    
    // 保存内容到文件
    fs.writeFileSync('scraped-content.html', content);
    console.log('Content saved to scraped-content.html');
    
  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed');
    }
    console.log('Scrape completed');
  }
}

scrape();