---
title: ESOS
tags: [ESOS, 存储, SAN]
---

# ESOS - 企业存储操作系统

## 关于

这是企业存储操作系统（ESOS）的项目主页。ESOS是基于优秀的SCST项目的准Linux发行版；其目的是通过兼容的SAN（光纤通道、InfiniBand、iSCSI、FCoE）提供SCSI目标。简而言之，ESOS可以轻松将配备适当硬件的服务器转变为位于企业存储区域网络（SAN）上的磁盘阵列，提供可共享的块级存储卷。ESOS"存储服务器"的典型用途包括VMware ESX/ESXi上的VMFS数据存储、Windows NTFS卷、Linux磁盘等。

## 特点

ESOS自2012年1月以来一直在积极开发，并被许多人在"生产"环境中使用。功能列表仍在增长；有关所有详细信息，请参阅01_About_ESOS维基页面。以下是ESOS的一些核心功能：

- 高性能、专用（类似设备）的Linux基础，从头构建，与其他Linux发行版无关。

- ESOS是内存驻留的 - 它从USB闪存驱动器启动，所有内容都加载到RAM中。如果USB闪存驱动器出现故障，ESOS会发送警报电子邮件，您可以简单地构建新的ESOS USB闪存驱动器，然后更换故障驱动器并同步配置。

- 内核崩溃转储捕获支持。如果ESOS Linux内核发生 panic，系统将重启进入崩溃转储内核，将/proc/vmcore文件捕获到esos_logs文件系统，最后自动重启回生产ESOS内核。ESOS在系统启动时发送电子邮件警报并检查是否有任何崩溃转储。

- 两种操作模式：生产（默认）和调试。在"生产"模式下，使用SCST的性能版本（make 2perf）。如果您发现有问题并且没有获得足够的诊断日志，只需重启进入"调试"模式（完整的SCST调试构建，make 2debug）并获取额外的日志数据。

- 企业RAID控制器CLI配置工具。流行的RAID控制器CLI工具是ESOS的可选安装（例如，LSI MegaRAID、Adaptec AACRAID等），允许从运行的ESOS系统配置（添加/删除/修改）卷/逻辑驱动器。

- ESOS与大多数流行的企业RAID控制器和Tier-1服务器硬件兼容。它目前支持以下前端目标类型：光纤通道、iSCSI、InfiniBand（SRP）、以太网光纤通道（FCoE）

- 基于文本的用户界面（TUI），提供易于使用的界面和便捷的存储配置功能；请在02_Screenshots维基页面上查看其外观。

- 集群/高可用性（HA）组件：Pacemaker + Corosync + DRBD

- 使用Linux软件RAID（md）和逻辑卷管理器（LVM2）创建高级后端存储块设备配置。

- 创建可在存储区域网络（SAN）上使用的虚拟磁带库（基于磁盘）。适用于流行的软件解决方案，如Symantec NetBackup、Symantec BackupExec、EMC/Legato NetWorker、Bakbone Netvault、Tivoli Storage Manager（TSM）和Bacula。ESOS中的VTL支持通过mhVTL项目实现。

- 使用lessfs进行内联数据去重；包括使用QuickLZ、Google的Snappy或LZO的加密和压缩支持。

- 支持Linux以太网桥接和NIC绑定（EtherChannel）。

- 基于软件的块层缓存解决方案：bcache、dm-cache/lvmcache和EnhanceIO。

- 通过BTIER项目实现具有自动迁移和数据块"智能"放置的分层存储设备。

- 支持使用Ceph RBD镜像作为后端存储设备。

- 高级以太网光纤通道（FCoE）支持：ESOS包含fcst"软件"FCoE目标驱动程序，并能够（构建选项）支持Emulex OCS FCoE CNA / Chelsio Uwire FCoE CNA硬件目标。

- 高级ZFS存储子系统作为构建选项受支持（通过Linux上的ZFS项目）。

## 入门

要开始设置ESOS存储服务器，您需要一个Linux主机来使用Enterprise Storage OS USB驱动器安装程序、一个USB闪存驱动器，以及一台配备良好RAID卡、磁盘、HBA/HCA/CNA等的像样服务器作为存储服务器 - 有关更多详细信息，请参阅03_Supported_Hardware维基页面。当您准备好开始时，在此下载页面上获取最新软件包并使用12_Installation文档。有关从源代码构建ESOS的说明，请参阅11_Building维基页面。如有任何问题/评论，请使用esos-users Google Group。