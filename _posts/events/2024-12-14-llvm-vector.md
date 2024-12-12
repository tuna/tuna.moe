---
layout: event
title: "金枪鱼之夜：在 LLVM 中支持新向量指令集"
date: 2024-12-14
time: 19:00-21:00
place: 三教 1102
author: Meow-meow
categories:
  - event
tags:
  - tunight
  - llvm
---

随着现代 CPU 架构不断进化，向量化已经成为提升计算性能的重要手段。通过将标量运算转换为向量运算，我们能够更高效地利用 CPU 中的 SIMD 指令集，显著提高程序的执行效率。然而，向量化的过程并非一蹴而就，其中涉及的概念、优化策略及工具链的应用都需要深入了解。为了更好地理解这一技术，主讲人将在本次 Tunight 分享在 llvm 实现新指令集向量后端的基本原理、当前的挑战以及未来的研究方向。

在本次分享中，我们邀请到了 [@inclyc](https://github.com/inclyc) 同学，与大家详细探讨以下内容：
- 什么样的程序最能从向量化中获益？
- 向量化涉及的基本概念，如 Module、Function 和 BasicBlock。
- 向量化过程中需要完成的工作，包括标量 IR 到向量 IR 的转换。
- 向量 IR 到机器指令的转化过程，重点讨论数据对齐、溢出问题以及一些常见的技巧。
- 未来的工作方向：RVV（RISC-V 向量扩展）与 SVE（ARM 可扩展向量扩展）。

---

活动信息：

* 主讲人：龙英池
* 时间：**2024/12/14（校历第十四周周六） 19:00** UTC +08:00
* 活动形式：线下 + 线上会议 + 直播
  * 地点：三教 **1102**
  * 线上会议：[腾讯会议 642-295-922 密码 241214](https://meeting.tencent.com/dm/2B61QoQRb8HG)
  * 直播链接：[https://youtube.com/live/ECxWLb8aVtY](https://youtube.com/live/ECxWLb8aVtY)
