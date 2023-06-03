---
layout: event
title: "金枪鱼之夜：基于 GCC 开发异构处理器编程插件"
date: 2020-10-17
time: 19:00-21:00
place: 法图 B101 + Zoom
author: Shengqi Chen
slides: https://mirrors.tuna.tsinghua.edu.cn/tuna/tunight/2020-10-17-gcc-heterogeneous-plugin/slides.pptx
video: https://mirrors.tuna.tsinghua.edu.cn/tuna/tunight/2020-10-17-gcc-heterogeneous-plugin/video.mp4
categories:
  - event
tags:
  - tunight
  - GCC
---

用于神威系列超级计算机的申威众核处理器一直以来面临编程困难的问题。它的主核（相当于常规的 CPU）具备完整的操作系统支持，可以运行各类系统调用，计算性能较低，主要用于调度；计算性能优秀的从核阵列（相当于 GPU，但没有类似显存的独立的存储空间，和主核共用主存）仅有极为受限的 I/O 操作，和主核**不共享指令集**。在这种情况下，几年来神威开发者都需要为主核和从核分别编写代码，从主核上通过专用的接口调用仅有一个指针参数的从核函数，且只能使用 C 和 Fortran 这类语言，无法在主从核边界上使用 C++ 的模板等元编程功能。参考 CUDA 和 C++AMP 等已有的针对 GPU 的语言扩展，我们决定基于 GCC 开发一个插件，使得开发者能够**在同一上下文中流畅地编写主从核混合的代码**，并在此间支持模板的协同展开、lambda 传递、参数列表自动打包等功能，结合硬件上的共享存储特征、从核上简单的串行 + SIMD 编程方式，最终达到比 CUDA 更优秀的可编程性。本次分享将主要介绍 GCC 的编译过程、如何介入这一编译过程、以及在其编译的多层中间表示上做相应的变换以达成功能需要。

活动信息：

* 主讲人：曹焕琦
* 时间：**2020/10/17（校历第五周周六）** 19:00 UTC +08:00
* 活动形式：线下 + 线上会议 + 直播
  * 地点：法图 B101（请从法图北侧绕到东侧下沉广场进入）
  * Zoom：621 219 8453
  * Zoom 直播：https://live.bilibili.com/699121

欢迎一起来玩！
