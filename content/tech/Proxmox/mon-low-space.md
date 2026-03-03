---
title: mon pve is low on available space 解决方法
tags: [Proxmox, 技术]

# mon pve is low on available space 解决方法
原始链接：[https://www.280i.com/series/pve](https://www.280i.com/series/pve)

## 技术信息

**问题：**
mon pve is low on available space

**操作：**

1. 查看/的占用

```bash
root@pve3:~# df -h
Filesystem Size Used Avail Use% Mounted on
udev 63G 0 63G 0% /dev
tmpfs 13G 3.1M 13G 1% /run
/dev/mapper/pve-root 450G 345G 86G 81% /
```

2. 清理/目录，删除部分冗余文件