import fs from 'fs';
import path from 'path';

// 定义需要转换的文件路径
const proxmoxDir = path.join('content', 'tech', 'Proxmox');

// 读取目录中的所有.md文件
const files = fs.readdirSync(proxmoxDir).filter(file => file.endsWith('.md'));

// 转换HTML元素为Markdown的函数
function convertHtmlToMarkdown(content) {
  let markdown = content;
  
  // 1. 提取YAML front matter
  let frontMatter = '';
  const frontMatterMatch = markdown.match(/^---[\s\S]*?---/);
  if (frontMatterMatch) {
    frontMatter = frontMatterMatch[0];
    markdown = markdown.replace(frontMatter, '');
  }
  
  // 2. 移除HTML头部信息和CSS样式
  markdown = markdown.replace(/<head>[\s\S]*?<\/head>/g, '');
  markdown = markdown.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  // 移除内联CSS代码
  markdown = markdown.replace(/\/\*[\s\S]*?\*\//g, '');
  markdown = markdown.replace(/\.[a-zA-Z0-9_-]+\s*\{[\s\S]*?\}/g, '');
  markdown = markdown.replace(/img:is\([^}]+\)\{[^}]+\}/g, '');
  // 移除HTML注释
  markdown = markdown.replace(/<!--[\s\S]*?-->/g, '');
  // 移除script标签
  markdown = markdown.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
  // 移除link标签
  markdown = markdown.replace(/<link[^>]*>/g, '');
  // 移除meta标签
  markdown = markdown.replace(/<meta[^>]*>/g, '');
  // 移除style标签
  markdown = markdown.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  // 移除内联样式属性
  markdown = markdown.replace(/style="[^"]*"/g, '');
  // 移除其他CSS相关内容
  markdown = markdown.replace(/:where\([^)]+\)\{[^}]+\}/g, '');
  markdown = markdown.replace(/body\s+[^}]+\}/g, '');
  // 移除数据URL
  markdown = markdown.replace(/url\("data:image\/[^)]+"\)/g, '');
  // 移除复制按钮相关CSS
  markdown = markdown.replace(/\.copy-button[^}]+\}/g, '');
  // 移除.gfm-task-list相关CSS
  markdown = markdown.replace(/\.gfm-task-list[^}]+\}/g, '');
  // 移除剩余的CSS代码
  markdown = markdown.replace(/pre\s*\{[^}]+\}/g, '');
  markdown = markdown.replace(/:where\([^)]+\)/g, '');
  // 移除声明文本
  markdown = markdown.replace(/声明：[\s\S]*$/g, '');
  // 移除网站名称和标题
  markdown = markdown.replace(/ProxmoxVE_[^–]+–[^\n]+\n/g, '');
  markdown = markdown.replace(/Ceph pg计算器 – 指尖风暴 Typhon Finger[^\n]+\n/g, '');
  // 移除剩余的CSS代码
  markdown = markdown.replace(/pre:hover[^\n]+/g, '');
  markdown = markdown.replace(/:where\([^)]+\)/g, '');
  // 处理代码块 - 首先移除所有现有的代码块标记
  markdown = markdown.replace(/```/g, '');
  // 处理行内代码
  markdown = markdown.replace(/`([^`]+)`/g, '`$1`');
  // 处理公式块
  markdown = markdown.replace(/`([\s\S]*?Total PGs[\s\S]*?pool size[\s\S]*?)`/g, '```\n$1\n```');
  markdown = markdown.replace(/`([\s\S]*?\(200 \* 100\)[\s\S]*?3[\s\S]*?)`/g, '```\n$1\n```');
  // 移除孤立的bash字符串
  markdown = markdown.replace(/bash/g, '');
  // 处理命令行 - 直接替换整个常规解决流程部分
  markdown = markdown.replace(/\*\*常规解决流程：\*\*[\s\S]*?本次经过上面的操作，进程依旧无法停止。/g, '**常规解决流程：**\n\n```bash\nvzdump -stop #停止备份任务\nps awxf | grep vzdump #查看进程\nkill -9\n```\n\n本次经过上面的操作，进程依旧无法停止。');
  // 移除重复内容
  markdown = markdown.replace(/Proxmox8\.0 备份任务使用NFS存储造成的卡死 – 指尖风暴 Typhon Finger[\s\S]*?最终解决办法：/g, '');
  // 清理多余的空白
  markdown = markdown.replace(/\s{2,}/g, ' ');
  // 确保代码块之间有适当的换行
  markdown = markdown.replace(/```bash\n/g, '\n```bash\n');
  markdown = markdown.replace(/```\n/g, '\n```\n');
  // 移除孤立的数字
  markdown = markdown.replace(/^\s*\d+\s*$/g, '');
  // 移除孤立的代码块标记
  markdown = markdown.replace(/`/g, '');
  // 清理多余的空白和空行
  markdown = markdown.replace(/\s{2,}/g, ' ');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  // 清理多余的空白和空行
  markdown = markdown.replace(/\s{2,}/g, ' ');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  // 清理多余的空白和空行
  markdown = markdown.replace(/\s{2,}/g, ' ');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  // 清理行尾的空白
  markdown = markdown.replace(/\s+$/g, '');
  // 清理文件末尾的空行
  markdown = markdown.trim();
  
  // 3. 转换 <img> 标签
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)');
  
  // 4. 转换 <pre> 标签（包含代码块）
  // 处理带有各种属性的代码块
  markdown = markdown.replace(/<div[^>]*><pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre><button[^>]*>Copy<\/button><\/div>/g, (match, code) => {
    // 转换HTML实体编码
    code = code.replace(/&lt;/g, '<');
    code = code.replace(/&gt;/g, '>');
    code = code.replace(/&amp;/g, '&');
    return '```bash\n' + code + '\n```';
  });
  
  // 5. 转换 <p> 标签
  markdown = markdown.replace(/<p>/g, '');
  markdown = markdown.replace(/<\/p>/g, '\n\n');
  
  // 6. 转换 <strong> 标签
  markdown = markdown.replace(/<strong>/g, '**');
  markdown = markdown.replace(/<\/strong>/g, '**');
  
  // 7. 转换 <code> 标签
  markdown = markdown.replace(/<code>/g, '`');
  markdown = markdown.replace(/<\/code>/g, '`');
  
  // 8. 转换 <em> 标签
  markdown = markdown.replace(/<em>/g, '*');
  markdown = markdown.replace(/<\/em>/g, '*');
  
  // 9. 转换 <br> 标签
  markdown = markdown.replace(/<br>/g, '\n');
  
  // 10. 转换HTML实体编码
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&amp;/g, '&');
  
  // 11. 移除其他HTML标签
  markdown = markdown.replace(/<[^>]+>/g, '');
  
  // 12. 清理多余的空行
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  // 13. 清理行首和行尾的空白
  markdown = markdown.trim();
  
  // 14. 移除重复内容
  // 找到所有重复的部分
  const lines = markdown.split('\n');
  const uniqueLines = [];
  const seen = new Set();
  
  for (const line of lines) {
    if (!seen.has(line) && line.trim() !== '') {
      uniqueLines.push(line);
      seen.add(line);
    }
  }
  
  markdown = uniqueLines.join('\n');
  
  // 15. 清理多余的空行
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  // 16. 重新添加YAML front matter
  if (frontMatter) {
    markdown = frontMatter + '\n' + markdown;
  }
  
  return markdown;
}

// 处理每个文件
async function processFiles() {
  console.log('开始转换HTML元素为Markdown格式...');
  
  for (const file of files) {
    if (file === 'index.md') continue; // 跳过index.md文件
    
    const filePath = path.join(proxmoxDir, file);
    console.log(`处理文件: ${file}`);
    
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 特殊处理backup-task-issue.md文件
    if (file === 'backup-task-issue.md') {
      // 先移除所有的bash字符串
      content = content.replace(/bash/g, '');
      // 然后替换整个常规解决流程部分
      content = content.replace(/\*\*常规解决流程：\*\*[\s\S]*?本次经过上面的操作，进程依旧无法停止。/g, '**常规解决流程：**\n\n```bash\nvzdump -stop #停止备份任务\nps awxf | grep vzdump #查看进程\nkill -9\n```\n\n本次经过上面的操作，进程依旧无法停止。');
    }
    
    // 转换HTML为Markdown
    const convertedContent = convertHtmlToMarkdown(content);
    
    // 写回文件
    fs.writeFileSync(filePath, convertedContent);
    console.log(`转换完成: ${file}`);
  }
  
  console.log('所有文件转换完成！');
}

// 运行转换
processFiles();
