import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';

// 文章列表
const articles = [
  {
    title: 'PVE迁移VM至另一个集群或主机',
    url: 'https://www.280i.com/tech/12552.html',
    filename: 'qm-remote-migrate.md'
  },
  {
    title: 'Proxmox8.0 备份任务使用NFS存储造成的卡死',
    url: 'https://www.280i.com/tech/12436.html',
    filename: 'backup-task-issue.md'
  },
  {
    title: 'HEALTH_WARN: 5 daemons have recently crashed',
    url: 'https://www.280i.com/tech/12430.html',
    filename: 'daemons-crash-warning.md'
  },
  {
    title: 'ceph osd perf 性能指标命令',
    url: 'https://www.280i.com/tech/12428.html',
    filename: 'ceph-osd-perf.md'
  },
  {
    title: 'PVE错误：service \'vm:101\' in error state, must be disabled and fixed first',
    url: 'https://www.280i.com/tech/12425.html',
    filename: 'ha-stop-error.md'
  },
  {
    title: 'PVE虚拟机BIOS中修改分辨率',
    url: 'https://www.280i.com/tech/12409.html',
    filename: 'ovmf-virtio-gpu.md'
  },
  {
    title: 'PVE虚拟机无法修改分辨率',
    url: 'https://www.280i.com/tech/12408.html',
    filename: 'vm-bios-resolution.md'
  },
  {
    title: 'ProxmoxVE_SDN_Simple网络使用',
    url: 'https://www.280i.com/tech/12392.html',
    filename: 'sdn-simple-setup.md'
  },
  {
    title: 'Ceph pg计算器',
    url: 'https://www.280i.com/tech/12373.html',
    filename: 'ceph-pg-calculation.md'
  },
  {
    title: 'Ceph错误：mon pve is low on available space',
    url: 'https://www.280i.com/tech/12369.html',
    filename: 'mon-low-space.md'
  },
  {
    title: '在Proxmox上通过Cloud-init创建ARM虚拟机',
    url: 'https://www.280i.com/tech/12251.html',
    filename: 'cloud-init-setup.md'
  },
  {
    title: '在Proxmox VE上设置ARM VM',
    url: 'https://www.280i.com/tech/12250.html',
    filename: 'network-setup-guide.md'
  }
];

async function scrapeArticle(url) {
  let browser;
  
  try {
    console.log('Launching browser...');
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
    
    console.log('Creating context...');
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: {
        width: 1920,
        height: 1080
      }
    });
    console.log('Context created successfully');
    
    console.log('Creating page...');
    const page = await context.newPage();
    console.log('Page created successfully');
    
    // 禁用自动化特征
    console.log('Disabling automation features...');
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
    
    console.log(`Navigating to URL: ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    console.log('Navigation completed');
    
    // 模拟真实用户行为
    console.log('Simulating user behavior...');
    await page.mouse.move(100, 100);
    await page.waitForTimeout(500);
    await page.mouse.move(200, 200);
    await page.waitForTimeout(500);
    await page.mouse.move(300, 300);
    await page.waitForTimeout(500);
    console.log('User behavior simulated');
    
    // 等待页面加载完成
    console.log('Waiting for page to load...');
    await page.waitForTimeout(2000);
    console.log('Page loaded');
    
    // 获取文章内容
    console.log('Getting page content...');
    const content = await page.content();
    console.log(`Page content length: ${content.length}`);
    return content;
    
  } catch (error) {
    console.error('Error scraping article:', error);
    console.error('Error stack:', error.stack);
    return null;
  } finally {
    if (browser) {
      console.log('Closing browser...');
      try {
        await browser.close();
        console.log('Browser closed');
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    }
  }
}

async function main() {
  try {
    console.log('Starting to scrape articles...');
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`Scraping article ${i + 1}/${articles.length}: ${article.title}`);
      console.log(`URL: ${article.url}`);
      
      // 创建文章目录用于存放图片
      const articleDirName = path.parse(article.filename).name;
      const articleDir = path.join('content', 'tech', 'Proxmox', articleDirName);
      console.log(`Article directory: ${articleDir}`);
      
      if (!fs.existsSync(articleDir)) {
        fs.mkdirSync(articleDir, { recursive: true });
        console.log(`Created directory: ${articleDir}`);
      } else {
        console.log(`Directory already exists: ${articleDir}`);
      }
      
      const content = await scrapeArticle(article.url);
      
      if (content) {
        console.log(`Successfully scraped article: ${article.title}`);
        
        // 保存内容到文件
        const filePath = path.join('content', 'tech', 'Proxmox', article.filename);
        console.log(`File path: ${filePath}`);
        
        // 读取现有的文件内容
        let existingContent = '';
        if (fs.existsSync(filePath)) {
          existingContent = fs.readFileSync(filePath, 'utf8');
          console.log(`Existing content length: ${existingContent.length}`);
        } else {
          console.log('File does not exist');
        }
        
        // 提取文章正文
        let articleContent = extractArticleContent(content);
        console.log(`Extracted article content length: ${articleContent.length}`);
        
        // 下载并处理图片
        articleContent = await downloadAndProcessImages(articleContent, articleDir, articleDirName);
        console.log(`Processed article content length: ${articleContent.length}`);
        
        // 更新文件内容
        const updatedContent = updateMarkdownContent(existingContent, articleContent, article.url);
        console.log(`Updated content length: ${updatedContent.length}`);
        
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated article: ${article.title}`);
      } else {
        console.log(`Failed to scrape article: ${article.title}`);
      }
      
      // 等待一段时间，避免被网站封禁
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('All articles scraped successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
    console.error('Error stack:', error.stack);
  }
}

function extractArticleContent(html) {
  // 简单的提取逻辑，实际情况可能需要更复杂的处理
  // 这里只是一个示例，具体的提取逻辑需要根据网站的结构进行调整
  
  // 直接查找entry-content类，因为我看到文章内容在这个容器里
  const startMarker = '<div class="entry-content u-text-format u-clearfix">';
  const endMarker = '<div class="post-note alert alert-info mt-2" role="alert">';
  
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    return html.substring(startIndex + startMarker.length, endIndex);
  }
  
  // 如果没有找到，尝试其他标记
  const alternativeStart = '<div class="entry-content">';
  const alternativeEnd = '<div class="entry-share">';
  
  const altStartIndex = html.indexOf(alternativeStart);
  const altEndIndex = html.indexOf(alternativeEnd);
  
  if (altStartIndex !== -1 && altEndIndex !== -1) {
    return html.substring(altStartIndex + alternativeStart.length, altEndIndex);
  }
  
  // 如果还是没有找到，返回整个HTML的一部分
  if (html.length > 1000) {
    return html.substring(0, 10000);
  }
  
  return '';
}

function updateMarkdownContent(existingContent, articleContent, url) {
  // 查找技术信息部分
  const techInfoStart = existingContent.indexOf('## 技术信息');
  if (techInfoStart !== -1) {
    // 替换技术信息部分
    const beforeTechInfo = existingContent.substring(0, techInfoStart + '## 技术信息'.length);
    const afterTechInfo = existingContent.substring(existingContent.indexOf('\n\n', techInfoStart));
    return beforeTechInfo + '\n\n' + articleContent + afterTechInfo;
  }
  
  // 如果没有技术信息部分，返回原始内容
  return existingContent;
}

async function downloadAndProcessImages(content, imageDir, dirName) {
  try {
    console.log('Processing images...');
    
    // 提取所有图片标签，支持单引号和双引号
    const imgRegex = /<img[^>]+src=(?:"([^"]+)"|'([^']+)')[^>]*>/g;
    let match;
    let processedContent = content;
    let imageCount = 0;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const imgUrl = match[1] || match[2]; // 匹配单引号或双引号中的URL
      if (imgUrl) {
        console.log(`Found image: ${imgUrl}`);
        imageCount++;
        
        try {
          // 生成图片文件名
          const imgName = path.basename(new URL(imgUrl).pathname);
          const imgPath = path.join(imageDir, imgName);
          console.log(`Saving image to: ${imgPath}`);
          
          // 下载图片
          await downloadImage(imgUrl, imgPath);
          
          // 更新图片链接为本地路径
          const localImgPath = `./${dirName}/${imgName}`;
          processedContent = processedContent.replace(imgUrl, localImgPath);
          console.log(`Updated image link to: ${localImgPath}`);
        } catch (error) {
          console.error(`Error processing image ${imgUrl}:`, error);
        }
      }
    }
    
    console.log(`Image processing completed. Found ${imageCount} images.`);
    return processedContent;
  } catch (error) {
    console.error('Error processing images:', error);
    return content; // 出错时返回原始内容
  }
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      file.close();
      reject(error);
    });
  });
}

main();