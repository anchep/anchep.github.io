---
title: OVMF格式与VirtIO-GPU配置指南
tags: [Proxmox, 技术]
---

# OVMF格式与VirtIO-GPU配置指南
原始链接：[https://www.280i.com/series/pve](https://www.280i.com/series/pve)

## 技术信息

1. 确保硬件是OVMF格式，并修改显示为VirtIO-GPU
![file](./ovmf-virtio-gpu/67652888ddb93.png)

2. 开机ESC进入bios
![file](./ovmf-virtio-gpu/676526ca32862.png)

3. DeviceManager – OVMF Platform Configuration
![file](./ovmf-virtio-gpu/676526ea0e22e.png)

4. 选择分辨率后确认保存
![file](./ovmf-virtio-gpu/676527353d947.png)

5. ESC到主界面，然后保存
![file](./ovmf-virtio-gpu/67652756bbfd3.png)

6. 进入系统查看分辨率
![file](./ovmf-virtio-gpu/6765285456351.png)