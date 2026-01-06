---
layout: event
title: "金枪鱼之夜：Avrova Donz 与九条命的镜像站架构艺术"
date: 2025-12-28
time: 19:00-21:00
place: 三教 1102
slides: https://mirrors.tuna.tsinghua.edu.cn/tuna/tunight/2025-12-28-fma-mirrors/slide.pdf
video: https://mirrors.tuna.tsinghua.edu.cn/tuna/tunight/2025-12-28-fma-mirrors/
author: Meow-meow
categories:
  - event
tags:
  - tunight
  - mirrors
---

作为某开源镜像站的总设计师，Avrova Donz（一只擅长在服务器上睡觉的简州猫）在近年来的开源基础设施领域投下了不小的爪子印。本次Tunight，她将分享如何将九条命理论应用于高可用架构，以及如何用猫的方式优雅地解决存储、带宽和运维的终极难题。

曾经，为了应对 RevyOS 那令人发疯的硬链接数量，人类工程师们尝试过 squashfs+overlayfs 方案，结果 inode 比猫毛掉得还快；也曾在ZFS阵列前彻夜不眠，只为找到一个能同时满足「省钱」「高效」「不爆炸」的黄金压缩比。然而，光存储是不行的，还需要大量的镜像同步和高可用策略。正好Avrova Donz带领团队研发出了一套以「懒」为核心设计理念的自动化运维体系。该如何用可控的预算搭建一个既能让学术用户满意、又能佛系运维的镜像站呢？

本次 Tunight 将揭秘以下猫式工程奇迹：
- 四级猫爬架存储架构：从ZFS内存ARC（顶层阳光台）→ L2ARC NVMe SSD（跳跃中转站）→ SATA SSD（磨爪板）→ 7200转SAS/SATA机械盘（猫窝底层），每一层都有其存在的玄学理由
- RAIDZ2与单盘混用的哲学：像猫选择睡觉地点一样智能——重要的数据（如难以同步的冷门仓库）用RAIDZ2保两条命，便于同步的冷门镜像则大胆单盘存放，down了就重定向到TUNA/USTC/Aliyun（反正有备胎）
- CloudFlare双出口钓鱼策略：CERNET和电信两条猫道，对外提供精选小鱼干（镜像），对内开放全鱼宴，懂得都懂
- 磁带冷备份的优雅：每两个月才 backup 一次变更数据，就像猫埋屎——动作不大，但关键时刻能救命
- 从X79到X99平台的铲屎经济学：DDR4内存太贵？E3-1230 V6性能不足？还是老平台香，量大从优，坏了不心疼


Avrova Donz 将以她独特的四耳猫咪视角，解释为什么「能节省就不占用」是镜像站设计的第一猫律。

欢迎大家一起来玩！

---

活动信息：

* 主讲人：Avrova Donz
* 时间：**2025/12/28（校历第十五周周日） 19:00** UTC +08:00
* 活动形式：线下 + 线上会议 + 直播
  * 地点：三教 1102
  * 线上会议：[腾讯会议 695-376-640 密码 251228](https://meeting.tencent.com/dm/F8N4KhdgbF1f)
  * 直播链接：[https://youtube.com/live/b5Ro1zETHc4](https://youtube.com/live/b5Ro1zETHc4)
