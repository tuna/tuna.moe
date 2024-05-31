---
layout: event
title: "金枪鱼之夜：写一个不工作的动态链接器"
date: 2024-06-01
time: 19:00-21:00
place: 三教 3104
author: Meow-meow Liu
categories:
  - event
tags:
  - tunight
---

动态链接器 (`ld.so`) 在 Linux 上将带有动态链接的可执行程序 (ELF) 加载、链接并提供部分运行时 API (如 `dlopen`)，这样可执行程序可以与依赖库分别存储、分发，常见的 Linux 发行版的安装中并不需要存储数百份 libc，宝贵的硬盘空间可以被节约出来存储例如 Electron 的真正重要的文件，是操作系统不可缺少的重要组成部分。

<del>由于发现自己完全不懂动态链接的工作方式</del>，喵喵于近日尝试使用 Zig 自制了一个不工作的 Linux x86-64 动态链接器，并发现了其实现中众多的扭曲细节。本次 Tunight 旨在分享这些扭曲的来源和实现过程中踩到的坑，讨论如何写出一个工作的动态链接器，以及 At what cost.

* 主讲人：刘晓义
* 时间：**2024/06/01（儿童节，校历第十四周周六） 19:00-21:00** UTC +08:00
* 活动形式：线下 + 线上会议 + 直播
  * 地点：三教 3104
  * 线上会议：Zoom 会议: 947 7090 9912, 密码 20240601
  * 直播链接：YouTube 直播: [https://youtube.com/live/sb9pSRwVgf4](https://youtube.com/live/sb9pSRwVgf4)

欢迎大家一起来庆祝儿童节！

---

喵喵的推荐阅读：

- 本次 Tunight 将大量复述 @MaskRay 博客内容

  [https://maskray.me/](https://maskray.me/)
- @jiegec 近期正在博客上更新一个自制链接器的系列文章

  [https://jia.je/tags/#write-a-linker](https://jia.je/tags/#write-a-linker)
