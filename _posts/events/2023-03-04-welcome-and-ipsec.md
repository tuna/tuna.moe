---
layout: event
title: "金枪鱼之夜：2023 年春季学期迎新会 & IPsec: old but yet anew?"
date: 2023-03-04
time: 19:00-21:00
place: 三教 1201
author: Yipeng Liu
categories:
  - event
tags:
  - tunight
  - welcome
  - ipsec
---

百团大战还未开始，迎新会已经准备好了。
~~本次招新预计会有很多新的小伙伴加入，院系分布也更加多元，提前欢迎你们加入 TUNA！~~
按照惯例首先会有 TUNA 的简介、互相认识的环节和建设 TUNA 的 n+1 种方式，在此之外还会由申奥分享 IPsec 技术。

Gravity 是一个网状拓扑的 IPv6 Overlay Network，它及前身 entropy 的诞生与 TUNA 有着千丝万缕的关联。
Gravity 使用 NickCao 同学开发的 [RAIT](https://gitlab.com/NickCao/RAIT) 从注册表生成隧道配置并在节点间自动部署、使用 babel 路由协议进行网内路由。
但由于协议设计和布署场景不完全匹配，gravity 所使用的 WireGuard 隧道需要节点开放大量 UDP 端口，给网络维护带来不便。
除了 WireGuard，Linux kernel 还支持 IPsec 作为另一种加密隧道协议；作为一套古老而复杂的协议，它能帮助我们处理这个小众（甚至灵车）的部署环境吗？

今晚将介绍一些 Linux 下管理 IPsec 的相关知识，并讨论它和 gravity 的未来。

* 主讲人：刘一芃、申奥
* 时间：**2023/03/04（周六） 19:00** UTC +08:00
* 活动形式：线下 + 线上会议 + 直播
  * 地点：三教 1201
  * 线上会议：Zoom 990 1257 5468 密码 20230304
  * 直播链接：YouTube，开始后公布
