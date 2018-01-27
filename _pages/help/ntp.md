---
layout: page
title: "TUNA NTP (网络授时) 服务使用说明"
author: Jason Lau
permalink: /help/ntp/
---

### 服务总览

TUNA 现提供一台时间服务器：

    ntp.tuna.tsinghua.edu.cn

服务器位于清华校内，提供 IPv4 与 IPv6 双栈服务。校内师生可以使用这一服务进行一般的时间校准工作，而无需进行校园网认证。

### 服务介绍

NTP (网络时间协议, network time protocol) 是网络中保持时间同步的协议 ([How does it work](http://www.ntp.org/ntpfaq/NTP-s-algo.htm))。简单来说，客户端通过向服务器发送带有时间戳的数据包和服务器回复带有时间戳的数据包，来获得客户端发送时间，服务端接收时间、服务端发送时间、客户端接收时间 4 个时间戳。客户端系统时间偏移量定义为 δ = (t₃ - t₀) - (t₂ - t₁)。如果运行 ntpd 服务，一般来说 ntpd 会逐渐调整时钟，避免时间跳变。这对于运行计费系统、交易系统或者其他对时间准确性和事件先后顺序敏感的操作十分重要。

### Linux 客户端配置

在 `/etc/ntp.conf` 中添加一行 `server ntp.tuna.tsinghua.edu.cn` 即可。（若您的发行版使用 Chrony，请修改对应的配置文件 `/etc/chrony.conf`。

为了确保 ntpd 服务正在运行，使用你的发行版的 initscripts 脚本或 `systemctl`（若有）进行检查和修正。

如果你的机器的时钟发生跳变不会有严重后果 (例如在你的笔记本上)，你可以使用 `sudo ntpdate ntp.tuna.tsinghua.edu.cn` 进行一次性的同步。

### Mac 客户端配置

在“系统配置 > 日期与时间 > 自动设置日期与时间”一栏，填入 `ntp.tuna.tsinghua.edu.cn`。

与 Linux 用户相同的，你可以使用 `sudo ntpdate ntp.tuna.tsinghua.edu.cn` 来进行一次性的同步。

### Windows 客户端配置

Windows XP 及以下版本的配置方式可以参看上海大学 NTP 网站上提供的[教程](http://cms.shu.edu.cn/Default.aspx?alias=cms.shu.edu.cn/ntp)。  
#### Windows 10 客户端配置

在“控制面板 > 时钟、语言和区域 > 日期和时间 > Internet时间 > 更改设置”中勾选“与 Internet 时间服务器同步”，在“服务器”一栏填入 `ntp.tuna.tsinghua.edu.cn`。  

你也可以通过在命令提示符中使用  `w32tm /config /manualpeerlist:ntp.tuna.tsinghua.edu.cn /syncfromflags:manual /update` 来将此服务器设置为您的时间服务器.
