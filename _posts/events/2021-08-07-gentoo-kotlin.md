---
layout: event
title: "金枪鱼之夜：GNU/Linux 软件包制作 - 摆脱构建工具的枷锁、维持软件包的可用性"
date: 2021-08-07
time: 19:00-21:00
place: Zoom
author: Shengqi Chen
categories:
  - event
tags:
  - tunight
  - Gentoo
  - Kotlin
---

有那么一类构建工具，为了方便使用 macOS 和 Windows 这些没有自带软件包管理器的系统的用户，整合了自己的依赖管理功能，但却独树一帜、闭门造车、我行我素、疑神疑鬼，即使需要的某个依赖已经在系统上装好了，版本也匹配，也一定要自己下载一份才用得安心（Maven 和 Gradle：“请直接报我们身份证号”）。在诸多 GNU/Linux 发行版这类有系统自带的软件包管理器、已经能挑起依赖管理的大梁的项目中，这些自成一派的构建工具会让软件包维护人员格外头疼，因为已有的软件包难以被重用，构建工具自己选择并使用的依赖又无法控制。那么，可不可以完全摆脱构建工具，让系统软件包管理器来全权负责依赖和构建呢？本次 Tunight 中，我们将探索一个在 Gentoo 上不使用上游项目配置的构建工具、使用系统的 Portage 软件包管理器来从源码编译 Kotlin 标准库和其它一些核心程序库的案例。

目前，上述的 Gentoo Kotlin 软件包仍在等待发行版上游审核开始，故它们现在只能寄居于非官方的软件仓库中。许多发行版都有一些关键的非官方仓库和不少用户自己的仓库，例如 Fedora 上的 RPM Fusion、Copr，以及 Arch Linux 用户换到别的发行版后经常问对等替代品的 AUR。非官方库中的软件包不免会依赖一些发行版官方仓库中的包，但官方库会不断更新，可能导致非官方库中的包无法再编译、甚至依赖关系都被破坏了。既然管生，也要管养；和软件本身一样，软件包也是需要测试和维护的。那么在出现这些软件包无法安装的情况时，非官方库的维护人员该如何探测它们，从而第一时间修复相关问题呢？了解了 Gentoo Kotlin 软件包的诞生后，我们将继续探究它们是如何被测试的，研讨一种基于持续集成（CI）工具的软件包测试方案。

活动信息：

* 主讲人：廖恒
* 时间：**2021/08/07（周六） 19:00** UTC +08:00
* 活动形式：线上会议 + 直播
  * Zoom：621 219 8453
  * 直播链接：YouTube，开始后公布

P.S. 本次 Tunight 的内容来源于 GSoC 2021 的 Expanded and Enhanced Big Data Infrastructure on Gentoo 项目，可见 [GSoC 项目页面](https://summerofcode.withgoogle.com/projects/?sp-page=2#5063497366372352) 或 [Gentoo Wiki](https://wiki.gentoo.org/wiki/Google_Summer_of_Code/2021/Ideas/Big_Data_Infrastructure_by_Gentoo) 的介绍。上述简介由主讲人编写。


欢迎一起来玩！
