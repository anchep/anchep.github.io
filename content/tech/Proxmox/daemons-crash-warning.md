---
title: "HEALTH_WARN: 5 daemons have recently crashed 解决方法"
tags: [Proxmox, 技术]
---

# HEALTH_WARN: 5 daemons have recently crashed 解决方法
原始链接：[https://www.280i.com/series/pve](https://www.280i.com/series/pve)

## 技术信息

**错误信息：**
```
HEALTH_WARN: 5 daemons have recently crashed
osd.9 crashed on host pve2 at 2025-01-17T06:20:03.240946Z
osd.9 crashed on host pve2 at 2025-01-17T06:58:56.349381Z
osd.9 crashed on host pve2 at 2025-01-17T07:32:07.183285Z
osd.9 crashed on host pve2 at 2025-01-17T09:46:41.084233Z
osd.9 crashed on host pve2 at 2025-01-17T10:19:21.186245Z
```

**查看错误：**

```bash
# 查看全部
ceph crash ls

# 查看全新
ceph crash ls-new

# 查看错误内容
ceph crash info
```

**逐条修复：**

```bash
ceph crash archive
```

**全部修复：**

```bash
ceph crash archive-all
```

**禁用警告：**

```bash
ceph config set mgr mgr/crash/warn_recent_interval 0
```