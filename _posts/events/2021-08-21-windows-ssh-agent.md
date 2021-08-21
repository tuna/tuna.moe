---
layout: event
title: "金枪鱼之夜：SSH agent 行于 Windows 之上"
date: 2021-08-21
time: 19:00-21:00
place: Zoom
author: Shengqi Chen
categories:
  - event
tags:
  - tunight
  - Windows
  - ssh agent
---

在 Linux 上使用 ssh 时，`ssh-agent` 的存在极大地方便了认证的过程。而场景切换到 Windows 上之后，各家实现为替代 Unix 域套接字各显神通，让好用的东西又变得不是那么好用了起来。随着 Windows 开始提供官方的 `ssh-agent`，在 Windows 上使用统一 的 SSH agent 又有了希望。本次 Tunight 将以 OSPP 2021 的对应项目的实现为背景，向大家介绍现今 Windows 上存在的常见 ssh agent 所使用的进程间通信方式，如何对他们进行通译，在 WSL 环境下“借用”宿主 Windows 的 SSH agent 的方法，以及防止其他用户访问以保证安全的 trick。

活动信息：

* 主讲人：张奇夫
* 时间：**2021/08/21（周六） 19:00** UTC +08:00
* 活动形式：线上会议 + 直播
  * Zoom：621 219 8453
  * 直播链接：YouTube，开始后公布

P.S. 本次 Tunight 的内容来源于 OSPP 2021 的“Windows 平台 SSH agent 的统一实现”项目，可见 [OSPP 项目页面](https://summer.iscas.ac.cn/#/org/prodetail/210160039)、[项目 GitHub 页面](https://github.com/Apache553/ssh-agent-bridge)。上述简介由主讲人编写。

欢迎一起来玩！
