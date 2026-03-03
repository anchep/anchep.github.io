# 批处理脚本，用于处理所有文章

# 定义文章数量
$articleCount = 12

# 循环处理每篇文章
for ($i = 0; $i -lt $articleCount; $i++) {
    Write-Host "Processing article $($i + 1)/$articleCount..."
    node scrape-single-article.js $i
    Write-Host "Article $($i + 1) processed."
    Write-Host "-----------------------------------"
    # 等待2秒，避免过于频繁的请求
    Start-Sleep -Seconds 2
}

Write-Host "All articles processed!"
