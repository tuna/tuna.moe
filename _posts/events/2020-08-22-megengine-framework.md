---
layout: event
title: 金枪鱼之夜：MegEngine 架构设计
date: 2020-08-22
time: 19:00-21:00
place: Zoom
author: Shengqi Chen
categories:
  - event
tags:
  - tunight
  - deep learning
  - MegEngine
---


AI 浪潮一波又一波，仿佛不会算法就落后于时代了。深度学习框架处理了各种设备的计算细节、求导、计算优化序列的工作，而在动态、静态两套截然不同的世界中，这些步骤又各自有他们不同的优化点和瓶颈。

[MegEngine 天元](https://megengine.org.cn/)作为一个用了5年多的深度学习框架，是一个在淘金热时，坚持选择卖铲子的团队。这次讲座，我们邀请了旷视研究院 AI 系统高级技术总监、MegEngine 技术负责人许欣然作为主讲人。他将带我们了解一个深度学习框架是如何把网络的定义逐步优化并最终执行的，从框架开发者的视角来看待深度学习。

<details>
    <summary>讲座大纲</summary>

* 背景介绍
    * 深度学习框架是干啥的？
    * 道理我都懂，为什么又搞一个深度学习框架？
    * 你们为啥不用 PyTorch / TensorFlow？
    * 训推一体是个啥玩意？
* 如何写出一个深度学习框架？（超简化版）
    * 动态图训练
     * 调用 = 执行
     * 依赖关系图 forward & backward
    * megdnn kernel
     * exec
     * Shape Deduce
    * 静态图训练 + 推理（粗糙版）
        * Tensor
        * Graph、SymborVar
        * CompNode
        * Shape Inference
        * Graph Optimization
        * 拓扑排序
        * 内存优化
        * Computing Sequence
* 一个陈年静态图框架是怎么变成动态图框架的？（蛋疼的渐进式演进）
    * Dynamic Region
    * Eager Graph
    * Eager Runtime + Proxy Graph
* 对未来的展望
    * 各种芯片模组的对接，挑战训推一体的理念
    * MLIR 等技术的兴起
    * 如何做到真 JIT

</details>

<!--more-->

活动信息：

* 主讲人：许欣然
* 时间：**2020/08/22** 19:00 UTC +08:00
* 活动形式：线上会议 + 直播
  * Zoom：990 9174 0940
  * Zoom 直播：https://live.bilibili.com/22436423

欢迎一起来玩！

