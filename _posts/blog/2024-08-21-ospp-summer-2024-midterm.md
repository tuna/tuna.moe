---
layout: post
title: “开源软件供应链点亮计划——暑期2024”项目中期简报
date: 2024-08-21
author: Meow-meow
categories:
    - blog
    - ospp
    - open source
    - community
permalink: /blog/2024/ospp-summer-2024-midterm/
---

[“开源软件供应链点亮计划——暑期2024”](https://summer-ospp.ac.cn) 目前项目开发时间已经过半。今年 TUNA 共立项[四个项目](https://tuna.moe/blog/2024/ospp-summer-2024/)，开发正在有序进行中。我们邀请了各位学员和导师简要介绍各自项目目前的进展，欢迎各位感兴趣的朋友们一同交流。

### Rust 基于完成的异步 QUIC

> [Asakura Mizu](mailto:asakuramizu111@gmail.com) / [Berrysoft](https://github.com/Berrysoft)

#### 目前完成的工作

经过最初的一段时间调研后，最终选择在 quinn-proto 的基础上，对 quinn-udp 和 quinn 的功能进行移植。

没曾想，在实际开发过程中，移植 quinn-udp 的"可选"功能反而花费了更长的时间，因为需要把 quinn-udp 中直接调用 syscall 实现的 socket 操作封装为“基于完成的异步”的形式并移植到 io-uring 和 iocp 上。

quinn 的移植则相对容易一些，主要就是去除对 tokio 的依赖以及把与 quinn-udp 的交互修改为与自己封装的 socket 交互。

目前已基本完成了 quinn 的大部分功能的移植，一些额外功能如统计数据、work limiter 等则暂时没有计划。不过目前 benchmark 结果表现略逊于 quinn，推测可能是 quinn-udp 使用了 recvmmsg 批量接收消息的原因，不过还需进一步确认。

#### 之后的工作

目前计划先完善当前的工作，进行 review 并 merge 到主分支上。接下来计划移植 `h3-quinn` 的功能（这东西代码才几百行），也许可以用 quic-interop-runner 进行一下测试。

### CIRCT 编译器的电路划分及 Arcilator 仿真并行化

> [Asuna](https://github.com/SpriteOvO) / [喵喵](mailto:xiaoyi.liu@tuna.tsinghua.edu.cn)

目前已在 Fork 仓库中向 CIRCT 添加了一个 Partition Pass。我们计划在 HW Dialect 层对电路模块进行划分，这样 Lower 到 Arc Dialect 层之前就是已经划分好的电路模块。

Partition Pass 已经做了初步实现，现在可以对简单带状态的单层模块进行不完全自动（需手动指定 reg 分配到哪个子模块中）划分，划分效果如下 MLIR 例子：

- 输入 CIRCT HW Dialect
```
hw.module @GCD(in %clk : !seq.clock, in %rst : i1, in %in_a : i64, in %in_b : i64, in %in_valid : i1, out in_ready : i1, out out   : i64, out out_valid : i64) {
  %c0_i63 = hw.constant 0 : i63
  %true = hw.constant true
  %c0_i64 = hw.constant 0 : i64
  %false = hw.constant false
  %smaller = seq.firreg %13 clock %clk {firrtl.random_init_start = 0 : ui64} : i64
  %larger = seq.firreg %11 clock %clk {firrtl.random_init_start = 64 : ui64} : i64
  %working = seq.firreg %15 clock %clk reset sync %rst, %false {firrtl.random_init_start = 128 : ui64} : i1
  %0 = comb.icmp bin eq %smaller, %c0_i64 : i64
  %1 = comb.and bin %0, %working {sv.namehint = "done"} : i1
  %2 = comb.concat %false, %larger : i1, i64
  %3 = comb.concat %false, %smaller : i1, i64
  %4 = comb.sub bin %2, %3 : i65
  %5 = comb.concat %false, %in_a : i1, i64
  %6 = comb.mux bin %working, %4, %5 {sv.namehint = "na"} : i65
  %7 = comb.mux bin %working, %smaller, %in_b {sv.namehint = "nb"} : i64
  %8 = comb.concat %false, %7 : i1, i64
  %9 = comb.icmp bin ugt %6, %8 : i65
  %10 = comb.extract %6 from 0 : (i65) -> i64
  %11 = comb.mux %9, %10, %7 {sv.namehint = "nlarger"} : i64
  %12 = comb.extract %6 from 0 : (i65) -> i64
  %13 = comb.mux %9, %7, %12 {sv.namehint = "nsmaller"} : i64
  %14 = comb.xor bin %1, %true : i1
  %15 = comb.mux bin %working, %14, %in_valid {sv.namehint = "nworking"} : i1
  %16 = comb.concat %c0_i63, %1 : i63, i1
  %17 = comb.xor bin %working, %true : i1
  hw.output %17, %larger, %16 : i1, i64, i64
}
```
- 输出 CIRCT HW Dialect (切分为 3 个模块)
```
"hw.module"() ({
^bb0(%arg15: i1, %arg16: !seq.clock, %arg17: i1, %arg18: i64):
  %32 = "hw.constant"() {value = true} : () -> i1
  %33 = "hw.constant"() {value = 0 : i64} : () -> i64
  %34 = "hw.constant"() {value = false} : () -> i1
  %35 = "seq.firreg"(%39, %arg16, %arg17, %34) <{name = "working"}> {firrtl.random_init_start = 128 : ui64} : (i1, !seq.clock, i1, i1) -> i1
  %36 = "comb.icmp"(%arg18, %33) <{predicate = 0 : i64, twoState}> : (i64, i64) -> i1
  %37 = "comb.and"(%36, %35) <{twoState}> {sv.namehint = "done"} : (i1, i1) -> i1
  %38 = "comb.xor"(%37, %32) <{twoState}> : (i1, i1) -> i1
  %39 = "comb.mux"(%35, %38, %arg15) <{twoState}> {sv.namehint = "nworking"} : (i1, i1, i1) -> i1
  %40 = "comb.xor"(%35, %32) <{twoState}> : (i1, i1) -> i1
  "hw.output"(%40, %35) : (i1, i1) -> ()
}) {comment = "", module_type = !hw.modty<input in_valid : i1, input clk : !seq.clock, input rst : i1, input reg_smaller : i64, output in_ready : i1, output reg_working : i1>, parameters = [], per_port_attrs = [], result_locs = [#loc, #loc1], sym_name = "GCD_P0"} : () -> ()
"hw.module"() ({
^bb0(%arg10: i64, %arg11: i64, %arg12: !seq.clock, %arg13: i1, %arg14: i64):
  %20 = "hw.constant"() {value = false} : () -> i1
  %21 = "comb.concat"(%20, %31) : (i1, i64) -> i65
  %22 = "comb.concat"(%20, %arg14) : (i1, i64) -> i65
  %23 = "comb.sub"(%21, %22) <{twoState}> : (i65, i65) -> i65
  %24 = "comb.concat"(%20, %arg10) : (i1, i64) -> i65
  %25 = "comb.mux"(%arg13, %23, %24) <{twoState}> {sv.namehint = "na"} : (i1, i65, i65) -> i65
  %26 = "comb.mux"(%arg13, %arg14, %arg11) <{twoState}> {sv.namehint = "nb"} : (i1, i64, i64) -> i64
  %27 = "comb.concat"(%20, %26) : (i1, i64) -> i65
  %28 = "comb.icmp"(%25, %27) <{predicate = 8 : i64, twoState}> : (i65, i65) -> i1
  %29 = "comb.extract"(%25) <{lowBit = 0 : i32}> : (i65) -> i64
  %30 = "comb.mux"(%28, %29, %26) {sv.namehint = "nlarger"} : (i1, i64, i64) -> i64
  %31 = "seq.firreg"(%30, %arg12) <{name = "larger"}> {firrtl.random_init_start = 64 : ui64} : (i64, !seq.clock) -> i64
  "hw.output"(%31, %31) : (i64, i64) -> ()
}) {comment = "", module_type = !hw.modty<input in_a : i64, input in_b : i64, input clk : !seq.clock, input reg_working : i1, input reg_smaller : i64, output out : i64, output reg_larger : i64>, parameters = [], per_port_attrs = [], result_locs = [#loc2, #loc1], sym_name = "GCD_P1"} : () -> ()
"hw.module"() ({
^bb0(%arg5: i64, %arg6: i64, %arg7: !seq.clock, %arg8: i1, %arg9: i64):
  %3 = "hw.constant"() {value = 0 : i63} : () -> i63
  %4 = "hw.constant"() {value = 0 : i64} : () -> i64
  %5 = "hw.constant"() {value = false} : () -> i1
  %6 = "seq.firreg"(%18, %arg7) <{name = "smaller"}> {firrtl.random_init_start = 0 : ui64} : (i64, !seq.clock) -> i64
  %7 = "comb.icmp"(%6, %4) <{predicate = 0 : i64, twoState}> : (i64, i64) -> i1
  %8 = "comb.and"(%7, %arg8) <{twoState}> {sv.namehint = "done"} : (i1, i1) -> i1
  %9 = "comb.concat"(%5, %arg9) : (i1, i64) -> i65
  %10 = "comb.concat"(%5, %6) : (i1, i64) -> i65
  %11 = "comb.sub"(%9, %10) <{twoState}> : (i65, i65) -> i65
  %12 = "comb.concat"(%5, %arg5) : (i1, i64) -> i65
  %13 = "comb.mux"(%arg8, %11, %12) <{twoState}> {sv.namehint = "na"} : (i1, i65, i65) -> i65
  %14 = "comb.mux"(%arg8, %6, %arg6) <{twoState}> {sv.namehint = "nb"} : (i1, i64, i64) -> i64
  %15 = "comb.concat"(%5, %14) : (i1, i64) -> i65
  %16 = "comb.icmp"(%13, %15) <{predicate = 8 : i64, twoState}> : (i65, i65) -> i1
  %17 = "comb.extract"(%13) <{lowBit = 0 : i32}> : (i65) -> i64
  %18 = "comb.mux"(%16, %14, %17) {sv.namehint = "nsmaller"} : (i1, i64, i64) -> i64
  %19 = "comb.concat"(%3, %8) : (i63, i1) -> i64
  "hw.output"(%19, %6) : (i64, i64) -> ()
}) {comment = "", module_type = !hw.modty<input in_a : i64, input in_b : i64, input clk : !seq.clock, input reg_working : i1, input reg_larger : i64, output out_valid : i64, output reg_smaller : i64>, parameters = [], per_port_attrs = [], result_locs = [#loc3, #loc1], sym_name = "GCD_P2"} : () -> ()
```

现在的策略是每个 output 划分成一个单独的子模块。下一步计划着手处理带 instance 的嵌套模块切分，在切这样的模块时尽力避免跨模块边界过多的连线。之后我们计划对模块进行图建模，然后引入 METIS 库来对图进行划分，并由该库来决定 reg 状态分配到哪个子模块中。在实现完这些后向上游仓库打开 PR 并推动合并。

### RISC-V 向量处理器 T1 性能评估框架

> [范书沛](mailto:dymarkfan@outlook.com) / [Sequencer](https://github.com/sequencer)

#### Profiler 实现

Profiler 使用 rust 语言实现。目前已完成 T1 profiler 的多个基本模块编写，并将已编写完成的模块组合得到了一个分析器 DEMO。

##### Event 日志读取

仿真得到的 Event Log 原始输出为 jsonl 文件，每行为一个 json 对象，描述了一个事件及其时间戳。
由于原始输出的体积庞大，仿真管线会将原始事件日志经 `zstd` 压缩之后存储。Profiler 利用了 zstd crate 可以直接读取压缩之后的日志文件。事件解析部分，利用 `serde` 库将 Json 编码的事件直接读取为 Rust 中定义的结构体。

##### 日志筛选与重排序

事件会按事件顺序给出，但由于 Chisel 语言的限制，同一时钟周期内发生的事件记录顺序难以事先确定。同时 Profiler 在执行特定的分析任务时可能只需要部分类型的事件。在处理事件之前，会先将事件进行过滤，筛选出感兴趣的事件，并对同一周期内记录的事件进行重排序。

##### 事件分析波形输出

为了更精细的分析 Profiler 得到的结果，RTL 设计人员希望能将部分较为细节的分析结果与仿真波形对齐，希望 Profiler 能以波形文件的方式部分低层次的分析结果。

目前 Profiler 以 FST 格式输出分析波形文件。本项目将 FST C-API 进行了简单的包装已完成 FST 格式输出功能。已可以输出 hierarchy 定义，记录下 int/bits 和 string 类型信号的波形，本部分功能基本完备。

#### 未来计划

性能分析的方法学部分已有初步设计，但尚未完成所有细节。
后续计划主要完善性能分析的方法学后，与 RTL 设计人员沟通，添加相应的 event log，并编写性能分析的代码。

除了核心功能开发外，还有以下非核心功能。若时间充裕，也考虑进行开发。

##### 设计参数传递

T1 支持参数化的生成多种不同配置的加速器，但目前仿真器产生的日志文件不包含配置信息，profiler 难以获得设计参数。目前阶段暂时在 profiler 硬编码设计参数。后续考虑与仿真器部分统一接口。

##### 波形查看器扩展

Profiler 输出的事件分析波形需要与仿真波形一起打开进行查看。目前使用 GtkWave 的 `twinwave` 程序可以打开两个并列且滚动同步的窗口，但使用并不方便。

目前开源的波形查看软件 GtkWave 和 Surfer 均缺乏同时打开多个波形文件，将其聚合显示在同一窗口的功能（该功能在对应的仓库均有 Feature Request，但由于社区开发力量不足，暂无实质的开发进展）。未来考虑参与到 GtkWave 或 Surfer 社区的多波形文件查看功能的开发之中。

##### 事件波形输出格式

目前事件波形以 FST 格式输出，未来会增加 VCD 格式输出的功能。由于 VCD 格式是较为简单的文本格式，。目前的 Profiler 代码中已对事件波形输出部分设计了相应的接口。添加该功能不需要大的架构改动。

#### 运行分析器

运行程序
```
t1-profiler --wave-path analysis.fst event-log.jsonl.zstd
```

查看分析结果
```
twinwave analysis.fst + wave.fst
```

### 基于前端技术栈的 OpenStreetMap 中公共交通关系编辑器

[fltb](https://github.com/fltb) / [快乐的老鼠宝宝](https://github.com/laoshubaby)

不知不觉一个多月过去了，我们也已经在官网上刊登了两次双周报。以下是对目前工作的一部分总结和一些暂时尚未写在报告中的进展。

#### 项目进展

项目仍处于早期开发阶段，我们基本确定了渲染部分的实现方式。经过测试，点和路径已经可以成功渲染，但对于复合多边形仍有一些工作需要完成。

#### 代码结构

我们计划将项目划分为[不同的组件](https://github.com/fltb/BusFensi/commit/706886d05d21b205f19bf865ffb981230ee177ab)，以便未来的开发和维护。

![组件和代码结构在提交中的展示](https://osmchina.oss-accelerate.aliyuncs.com/static/ospp/osmchina-ospp-2024-tunamidterm-figure1.png)

#### 功能

##### 编辑器的API请求

由于缺少足够简洁的OSM API封装，我开发了一个 OSM API 模块，使用 Promises 封装了 OSM 的一些接口，能够与符合 OSM 标准的 API 进行通信并提交结果，同时将返回的 XML 解析为 JavaScript 对象，以便在程序中更容易操作。

##### 渲染与可视化

目前，我们的代码无法执行任何编辑操作，虽然能从 OSM 网站获取 XML 或 JSON 数据，但尚不能直接渲染。因此，我手动构建了几个点作为非常基础的渲染测试。（请原谅配色方案的粗糙，我会在后续进行优化。）

背景瓦片功能也进行了测试，目前运行良好。

由于地球上71%的面积是海洋，大部分陆地无人居住，而我不幸随机选择了一个位于荒野中的位置，因此在这张截图里没能展示出可识别的 OSM 数据。不过瓦片确实可以正常请求和渲染，正如截图中的开发者工具所示。

![瓦片的网络请求统计](https://osmchina.oss-accelerate.aliyuncs.com/static/ospp/osmchina-ospp-2024-tunamidterm-figure2.png)

此外，我们在尝试为所有瓦片请求添加自定义 User-Agent 以遵守 OSMF 的瓦片使用政策时遇到了一个小技术问题。具体来说，我们希望自定义请求头部（例如，在 User-Agent 中插入 `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0 BusFensi/0.0.1` 之类的信息，而不是使用浏览器的默认 User-Agent）。我们需要对 pixi.js 进行一些修改，因为 pixi.js 似乎通过 `<img>` 标签加载图片。然而，这样做不符合良好的开发实践。因此，根据 [@bhousel 的建议](https://osmus.slack.com/archives/C1VE7JM9T/p1721227063592989)，我们决定放弃这个相对不重要的需求。

目前，数据渲染部分已经设置完毕，不过仍有一些细节需要打磨，比如样式和控制渲染的元素。这些将在后续功能开发中同步调整，以确保样式与编辑逻辑一致。

![显示效果](https://osmchina.oss-accelerate.aliyuncs.com/static/ospp/osmchina-ospp-2024-tunamidterm-figure3.png)

（糟糕，确实看起来不太美观）

不过，只需几行代码，我就可以移除建筑物（以及其他非公路特征）的渲染，这将使其看起来好得多。我会逐步调整样式——也许借鉴一些 iD 编辑器的颜色？

至于编辑功能，现在无法进行演示，因为目前只有拖动点、平移地图和调整缩放级别的功能。

由于其他模块的接口仍在开发中，一些功能尚未实现。例如，路径的高亮显示，目前默认逻辑是选择整个路径，而不是高亮显示路径的某一段。再比如，多边形的渲染还没有实现，因为这需要编辑模块的接口。

##### 编辑器的状态管理

目前，正在编写状态管理模块，为编辑提供稳定支持。这部分主要包括操作逻辑和全局数据管理。

在地图编辑的操作逻辑中，我引入了一个状态机，通过监听鼠标和键盘事件来管理编辑器的当前状态。状态机在代码中被称为“stateMachine.js”，它根据状态图中提供的功能和状态关系，处理状态转换和数据维护。根据当前状态，它决定触发哪 些操作以及要转换到的新状态。状态机提供了钩子，允许其他组件（如 Pixi.js 中的鼠标事件）跟踪事件。编辑操作在状态转换期间进行。

一般来说，在状态机的状态转换过程中，会对全局数据进行一系列更改。为了管理这些更改，代码中使用了一个双向链表，称为“操作列表”。该列表提供撤销、重做和执行接口。执行接口接受一个操作，执行它，然后将其添加到列表的末尾。为了避免多个重复操作，某些操作会被合并。

一个操作提供执行、撤销和重做接口，有些操作还提供合并选项。操作在执行、撤销或重做时应维护全局数据，并管理其他相关更改，例如受影响元素的 UI 和跨层的数据。这种方法确保所有更改都集中在一起，最大限度地减少在撤销和重做操作期间维护相关更改的认知负担。

全局数据是每个操作中引用的对象，操作列表确保在撤销和重做操作期间，操作的顺序是正确的。例如，它确保在撤销一个操作时，状态反映所有后续操作已经被撤销。

由于实际的编辑操作尚未完成，撤销和重做功能暂时未考虑，因为它们依赖于仍在进行中的部分代码。

![状态管理的 Mermaid 图](https://osmchina.oss-accelerate.aliyuncs.com/static/ospp/osmchina-ospp-2024-tunamidterm-figure4.png)

#### 维护路线图

项目的核心模块现已基本完成，这使我们能够进入开发的后期阶段。接下来的工作主要是在现有框架内添加新功能。

项目已经开发了大约一个半月，截止日期在九月底，时间相对紧张。因此，我将优先完成核心功能，将一些非核心功能推迟到以后完成，以确保项目顺利完成。

以下是需要实现的主要功能：

##### UI 组件

- **大纲视图**：显示所有当前元素，允许选择和基本的元素状态管理。
- **属性视图**：管理各种属性，包括全局设置和当前选定元素的元数据。
- 一些独立组件，如创建新节点、连接线段等。

请注意，UI 的实现可能会被推迟，因为优先考虑开发基本图形模块。

##### 功能方面

作为一个公共交通编辑器，它应支持公共交通编辑功能。在 OSM XML 中，公共交通关系由一个关系元素表示，该元素有一个路线和一系列标签，指示该元素的具体内容。

对于元数据的编辑，可以使用前面提到的属性视图。

对于点的精确位置编辑，将使用地图模块。我考虑添加一些样式以突出当前正在编辑的路线，使其更容易识别。

对于路线、点和路径之间的成员关系，需要将地图的选择功能与属性视图集成。

此外，可能需要一个路线创建功能，包括添加新点、创建新路线和编辑路线属性。

为了基于站点关系实现路线计算，利用现有的 API 如 Valhalla 或 OSRM 可以非常有效，因为它们本身就是基于 OSM 的模型来设计数据读取的。
