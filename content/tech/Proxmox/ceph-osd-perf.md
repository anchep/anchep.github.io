---
title: ceph osd perf 性能指标命令
tags: [Proxmox, 技术]
---

# ceph osd perf 性能指标命令
原始链接：[https://www.280i.com/series/pve](https://www.280i.com/series/pve)
## 技术信息
作者：半兽人
链接：https://www.orchome.com/17232
来源：OrcHome
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
在 Ceph 集群中，ceph osd perf 命令用于查看各个 OSD 的性能指标，包括 op/s（操作数/秒）和 latency（延迟）。这是监控 Ceph OSD 性能的重要工具，特别是在排查集群性能瓶颈时。
**使用方法** ceph osd perf 输出示例
执行命令后，你可能会看到类似如下的输出： OSD Commit_Latency(ms) Apply_Latency(ms)
0 2.345 1.456
1 2.678 1.789
2 3.123 1.987 字段解释
*OSD*
OSD 编号。
*Commit_Latency(ms)*
提交延迟：从接收到客户端请求到完成写入 WAL（Write-Ahead Log）的延迟（单位为毫秒）。
高延迟可能意味着 OSD 的 WAL 写入速度较慢，通常与磁盘的 IOPS 性能相关。
*Apply_Latency(ms)*
应用延迟：从写入 WAL 到数据写入最终存储的延迟（单位为毫秒）。
高延迟可能表明存储设备（如 HDD、SSD 或 NVMe）在写入数据时存在性能瓶颈。
**常见场景分析**
*高 Commit Latency*
瓶颈可能在磁盘的顺序写性能或网络延迟上。
优化措施：
确保 WAL 日志存储在高性能的设备上（如 NVMe 或 SSD）。
检查网络延迟，优化网络配置。
*高 Apply Latency*
瓶颈可能在存储设备的随机写性能上。
使用更高性能的存储介质。
增加存储设备的数量以分散负载。
部分 OSD 性能异常
如果只有个别 OSD 的延迟较高，可能是硬件故障、负载不均衡或网络问题。
检查该 OSD 的磁盘、CPU、内存和网络性能。
使用 ceph osd reweight 或 ceph balancer 平衡负载。
**其他相关命令**
查看所有 OSD 的状态： ceph osd tree 检查具体 OSD 的详细信息： ceph osd dump 查看集群的整体性能统计： ceph status 通过 ceph osd perf 的数据，可以迅速定位 OSD 性能瓶颈，并结合其他命令和监控工具进一步分析问题所在。
**一般参考标准**
以下是常见硬件配置的参考延迟范围：
存储类型
Commit_Latency
Apply_Latency
HDD
5-15 ms
10-30 ms
SSD
1-5 ms
2-10 ms
NVMe
1-3 ms
何时需要关注延迟？
*明显高于参考标准：*
比如，HDD 的 Commit_Latency 达到 30 ms 或以上，这表明 WAL 写入速度可能存在瓶颈。
SSD 的 Apply_Latency 超过 10 ms，可能是存储设备或负载分布的问题。
*延迟显著高于其他 OSD：*
如果某些 OSD 的延迟远高于集群中其他 OSD，例如：
大多数 OSD 的 Commit_Latency 为 5 ms，个别 OSD 达到 50 ms。
排查该 OSD 是否存在硬件故障、网络瓶颈或负载异常。
*随着负载增加，延迟剧烈上升：*
在集群负载较高时（如 IOPS 增加），延迟曲线呈现非线性增长。这表明集群已接近硬件或网络性能瓶颈。
*延迟直接影响业务：*
客户端读写操作的响应时间明显延长。
Ceph 提示延迟相关的健康警告（如 OSD 宕机或过载）。
如何优化高延迟？
*高 Commit_Latency：*
使用高性能设备（如 SSD 或 NVMe）作为 WAL 存储。
检查网络延迟，确保带宽充足且无丢包。
*高 Apply_Latency：*
增加 OSD 数量分散写负载。
升级存储介质（如将 HDD 替换为 SSD 或 NVMe）。
优化后端文件系统（如使用 BlueStore 替代 FileStore）。
*分布不均的延迟：*
使用 ceph balancer 平衡数据分布。
检查网络连接是否有问题（如 MTU 不一致、链路瓶颈）。
通过结合延迟标准和实际业务需求，你可以更有效地判断延迟是否过高，并采取相应的优化措施。
ceph osd perf 性能指标命令 – 指尖风暴 Typhon Finger 2 3.123 1.987
OSD
Commit_Latency(ms)
Apply_Latency(ms)
常见场景分析
高 Commit Latency
高 Apply Latency
其他相关命令
ceph osd tree
ceph osd dump
ceph status
一般参考标准
< 1 ms
明显高于参考标准：
延迟显著高于其他 OSD：
随着负载增加，延迟剧烈上升：
延迟直接影响业务：
高 Commit_Latency：
高 Apply_Latency：
分布不均的延迟：