---
layout: event
title: "金枪鱼之夜——Mutual Exclusion in Shared-memory Systems: From Theory to Practice"
date: 2019-11-09
time: 19:00-21:00
place: 新水 401
author: Shengqi Chen
categories:
  - event
tags:
  - tunight
  - meta
---

互斥（Mutual exclusion）问题是分布式计算领域的经典问题，1965 年，Dijkstra 提出了第一个互斥算法。本次 Tunight 将以 Dijkstra 的互斥算法为例，介绍分布式计算领域与之相关的概念与理论，并证明该算法的正确性；将该算法的伪代码简单地“翻译”成 C++ 并不能正确地实现互斥功能，因为分布式计算理论中的计算模型与实际计算机和编程语言的计算模型有诸多差别，例如实际计算机和编程语言的内存序通常更弱，本次 Tunight 将介绍 C++11 新特性 `std::atomic` ，使用它给出该算法的正确实现并给予证明。

* 主讲人：付祈安
* 时间：校历第九周周六（11/9） 19:00
* 地点：新水 401

此活动受清华大学学生社团发展支持计划的支持。
