---
title: Ceph PG计算方法
tags: [Proxmox, 技术]

# Ceph PG计算方法
原始链接：[https://www.280i.com/series/pve](https://www.280i.com/series/pve)

## 技术信息

Ceph计算的方式是：

```
(OSDs * 100)
Total PGs =  ---
---------  
pool size
```

如果您有超过 50 个 OSD ，我们建议每个 OSD 大约有 50-100 个放置组，以平衡资源使用情况，数据耐久性和分布。 如果您的 OSD 少于 50 个，那么最好在小型集群的 PG 计数中进行选择。 对于单个对象池，可以使用上面的公式来获取基线:

其中， 池大小 是复制池的副本数或擦除编码池的 K+M 总和 (由 ceph osd erasure-code-profile get返回)。

然后，您应该检查结果是否符合您设计 Ceph 集群的方式，以最大限度提高数据耐久性，数据分布并最大限度减少资源使用情况。

结果应该 向上舍入为最接近的 2 次幂。 四舍五入是可选的，但建议 CRUSH 均衡放置组中的对象数。

对于具有 200 个 OSD 且池大小为 3 个副本的集群，您将按如下所示估算 PGs 数:

```
(200 * 100)
----------- = 6667. Nearest power of 2: 8192
3
```

有 8192 个放置组分布在 200 个 OSD 上，每个 OSD 大约评估 41 个放置组。 您还需要考虑可能在集群中使用的池数，因为每个池也将创建放置组。 确保具有合理的最大放置组计数 (请参阅 最大放置组计数)。

原文：https://www.ibm.com/docs/zh/storage-ceph/6?topic=count-calculating-placement-group