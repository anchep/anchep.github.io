import fs from 'fs';
import path from 'path';

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

async function fetchArticle(url) {
  try {
    // 使用WebFetch工具获取文章内容
    // 由于WebFetch是一个外部工具，我们需要使用fetch API来模拟它
    const response = await fetch(url);
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function main() {
  try {
    console.log('Starting to fetch articles...');
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`Fetching article ${i + 1}/${articles.length}: ${article.title}`);
      console.log(`URL: ${article.url}`);
      
      const content = await fetchArticle(article.url);
      
      if (content) {
        console.log(`Successfully fetched article: ${article.title}`);
        
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
        const articleContent = extractArticleContent(content);
        console.log(`Extracted article content length: ${articleContent.length}`);
        
        // 更新文件内容
        const updatedContent = updateMarkdownContent(existingContent, articleContent, article.url);
        console.log(`Updated content length: ${updatedContent.length}`);
        
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated article: ${article.title}`);
      } else {
        console.log(`Failed to fetch article: ${article.title}`);
      }
      
      // 等待一段时间，避免被网站封禁
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('All articles fetched successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
    console.error('Error stack:', error.stack);
  }
}

function extractArticleContent(html) {
  // 简单的提取逻辑，实际情况可能需要更复杂的处理
  // 这里只是一个示例，具体的提取逻辑需要根据网站的结构进行调整
  return html;
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

main();