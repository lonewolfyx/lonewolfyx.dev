---
title: 那些常说的 XDD，有哪些...
date: 2026-07-28
---

在软件开发中，我们经常听到有人问：`你们这个项目是不是用了 DDD？`、`有采用 TDD 吗？`、`有没有实践 SDD？`。那么，我们的项目真的会严格采用这些方法吗？我的答案是：

`不会，遵循个🥚。怎么舒服、怎么方便就怎么来。AI 会的 ≈ 我会的！！！`

> 需求那么多，还赶工期，遵循个 damn~

但即使不严格遵循，也得先知道有哪些 `🥚DD`，对不对~


下面整理空闲整理的(可能会缺少，欢迎 PR 纠正)。同一个缩写或名称出现在不同分类时，仍按不同语境分别计数。为了避免误导，每项都补充了它更接近哪一种性质：

- **经典或较成熟的方法**：有相对稳定的定义、概念体系或反馈循环；
- **方法变体、研究方法或新兴术语**：有明确出处，但适用范围较窄或尚未形成广泛共识；
- **架构风格、测试技术或工程实践**：真实有用，但不是完整的软件生命周期方法；
- **描述性标签或本文简称**：用于表达关注点或消除歧义，缩写通常并非行业标准。

## 传统方法、变体与已有研究（12 项）

| #  | 方法                                                                                                                                                                  | 中文名称       | 性质与准确定位                                                                   |
|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|---------------------------------------------------------------------------|
| 01 | **[DDD｜Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)**                                                                              | 领域驱动设计     | **经典设计体系**；强调领域知识、通用语言、领域模型和限界上下文。四层架构只是常见模式之一，并非强制结构                     |
| 02 | **[TDD｜Test-Driven Development](https://agilealliance.org/glossary/tdd/)**                                                                                          | 测试驱动开发     | **经典开发实践**；先写失败的自动化测试，再写刚好通过的代码，最后重构，即“红—绿—重构”。不必严格限定在单元测试                |
| 03 | **[BDD｜Behavior-Driven Development](https://cucumber.io/docs/bdd/)**                                                                                                | 行为驱动开发     | **成熟协作实践**；围绕具体示例建立跨角色共同理解，并形成可检查的行为文档。`Given-When-Then` 是常用格式，不等于 BDD 本身 |
| 04 | **[ATDD｜Acceptance Test-Driven Development](https://agilealliance.org/glossary/atdd/)**                                                                             | 验收测试驱动开发   | **成熟验收实践**；客户、开发和测试在实现前共同形成可验证、可自动化的验收示例或测试                               |
| 05 | **FDD｜Feature-Driven Development**                                                                                                                                  | 特性驱动开发     | **成熟增量开发方法**；建立总体模型和特性列表，再按特性规划、设计与构建                                     |
| 06 | **[MDD｜Model-Driven Development](https://www.omg.org/mda/)**                                                                                                        | 模型驱动开发     | **成熟方法族**；将模型作为一等工件，通过模型转换、解释或代码生成连接实现。代码生成是常见手段，但不是唯一形式                  |
| 07 | **[SDD｜Specification-Driven Development](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)** | 规格驱动开发     | **AI 编码语境中的新兴方法**；通过可版本化、可验证的规格约束计划、实现和验证，不宜与传统成熟方法等量齐观                   |
| 08 | **STDD｜Story Test-Driven Development**                                                                                                                              | 用户故事测试驱动开发 | **ATDD 同族称谓或变体**；围绕用户故事提前定义验收示例，不宜再包装成一套完全独立的方法                           |
| 09 | **[EDD｜Example-Driven Development](https://arxiv.org/abs/2409.00514)**                                                                                              | 示例驱动开发     | **研究性方法**；相关论文中的示例是可执行、可检查、可复用并能嵌入活文档的对象，不只是普通需求示例                        |
| 10 | **[PDD｜Property-Driven Development](https://d-nb.info/1253015759/34)**                                                                                              | 属性驱动开发     | **形式方法中的专门路径**；共同演进测试、形式规格和可执行模型。不同领域定义不完全一致，也不等同于 Property-Based Testing |
| 11 | **[RDD｜Responsibility-Driven Design](https://wirfs-brock.com/Design.html)**                                                                                         | 职责驱动设计     | **成熟对象设计方法**；按对象的角色、职责和协作关系分配行为                                           |
| 12 | **CDD｜Contract-Driven Development**                                                                                                                                 | 契约驱动开发     | **API 与系统集成实践**；先定义输入、输出、错误和交互契约。它不是统一生命周期方法，也不要与 Design by Contract 混为一谈 |

## 架构、接口与模块设计（18 项）

这一组大多规定系统围绕什么技术边界进行设计，而不是覆盖需求、实现、测试和交付的完整方法。

| # | 方法 | 中文名称 | 性质与准确定位 |
| --- | --- | --- | --- |
| 13 | **ADD｜Architecture-Driven Development** | 架构驱动开发 | **描述性泛称**；表达架构先行，但 `ADD` 在软件架构领域更稳定地指 [Attribute-Driven Design](https://www.sei.cmu.edu/library/attribute-driven-design-method-collection/)，因此不建议用 ADD 表示本词 |
| 14 | **IDD｜Interface-Driven Development** | 接口驱动开发 | **设计实践，简称不统一**；更准确地说是 Interface-first Design，即先定义抽象边界，再实现具体模块 |
| 15 | **API-DD｜API-Driven Development** | API 驱动开发 | **API 设计实践，本文简称**；更常见名称是 API-first 或 Design-first API Development |
| 16 | **CDD｜Contract-Driven Development** | 契约驱动开发 | **接口与集成实践**；以 OpenAPI、AsyncAPI、Protobuf 或 GraphQL Schema 等机器可读契约作为协作边界 |
| 17 | **[CDC｜Consumer-Driven Contracts](https://docs.pact.io/)** | 消费者驱动契约 | **契约测试模式**；消费者通过测试表达实际依赖，提供者验证契约。它不等同于、也不必从属于 contract-first API 开发 |
| 18 | **ScDD｜Schema-Driven Development** | 模式驱动开发 | **跨技术生态的通用做法，本文简称**；可指 JSON Schema、GraphQL Schema 或数据库模式先行，但三者并不是一套统一方法 |
| 19 | **[ComDD｜Component-Driven Development](https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component)** | 组件驱动开发 | **UI 开发方法**；隔离开发组件、覆盖组件状态，再自底向上组合页面。Storybook 使用的缩写是 `CDD`，`ComDD` 只是本文用于消歧 |
| 20 | **EDD｜Event-Driven Development** | 事件驱动开发 | **非统一说法**；当前描述实际更接近 `EDA｜Event-Driven Architecture`，即围绕事件生产者、通道和消费者组织异步通信 |
| 21 | **SVD｜Service-Driven Development** | 服务驱动开发 | **非通行简称**；相关实践更常写作 SOA、Service-Based Architecture 或 Microservice Architecture |
| 22 | **UCDD｜Use-Case-Driven Development** | 用例驱动开发 | **已有实践、简称不统一**；用例可以驱动分析、规划、增量实现和测试，而不仅是设计 |
| 23 | **WDD｜Workflow-Driven Development** | 工作流驱动开发 | **描述性标签**；流程系统中更准确的说法通常是 BPMN 流程建模、工作流编排或状态机驱动实现 |
| 24 | **MDD｜Metadata-Driven Development** | 元数据驱动开发 | **平台工程实践**；由元数据生成页面、表单、接口或规则，与 Model-Driven Development 共享缩写 |
| 25 | **CDD｜Configuration-Driven Development** | 配置驱动开发 | **工程实践**；通过配置改变系统行为、减少硬编码，但没有统一的 CDD 方法定义 |
| 26 | **TDD｜Template-Driven Development** | 模板驱动开发 | **工程实践**；通过模板生成重复工程结构。`TDD` 在通常语境下仍优先指 Test-Driven Development |
| 27 | **PDD｜Platform-Driven Development** | 平台驱动开发 | **描述性标签**；实际内容更接近 Platform Engineering 和 Internal Developer Platform，而非独立开发方法 |
| 28 | **Plugin-DD｜Plugin-Driven Development** | 插件驱动开发 | **架构实践，本文简称**；围绕插件协议、生命周期和扩展点组织功能，也可归入微内核或插件架构 |
| 29 | **Protocol-DD｜Protocol-Driven Development** | 协议驱动开发 | **设计实践，本文简称**；更常见说法是 Protocol-first 或 IDL-first Development |
| 30 | **Database TDD** | 数据库测试驱动开发 | **TDD 的领域应用**；先为存储过程、函数、约束、触发器或数据库模式变更建立可重复测试，再小步实现和重构 |

## 业务、产品与决策方向（14 项）

这组名称回答的是“为什么做、先做什么、根据什么调整”，多数属于产品原则或决策方式。

| # | 方法 | 中文名称 | 性质与准确定位 |
| --- | --- | --- | --- |
| 31 | **BDD｜Business-Driven Development** | 业务驱动开发 | **描述性标签**；强调商业目标、能力和收益与技术建设对齐。通常提到 BDD 时，默认含义仍是 Behavior-Driven Development |
| 32 | **VDD｜Value-Driven Development** | 价值驱动开发 | **产品与交付原则**；结合客户价值、商业价值和实现成本安排优先级，不存在唯一流程 |
| 33 | **[RDD｜Risk-Driven Development](https://www.sei.cmu.edu/library/spiral-development-experience-principles-and-refinements-spiral-development-workshop-february-9-2000/)** | 风险驱动开发 | **已有过程思想**；螺旋模型就是风险驱动的过程模型生成器，但 `RDD` 不是其公认简称 |
| 34 | **UDD｜User-Driven Development** | 用户驱动开发 | **描述性标签**；若指成熟设计方法，更常见且稳定的术语是 `UCD｜User-Centered Design` |
| 35 | **GDD｜Goal-Driven Development** | 目标驱动开发 | **描述性标签**；需求工程中更正式的相关名称是 `GORE｜Goal-Oriented Requirements Engineering` |
| 36 | **ODD｜Outcome-Driven Development** | 结果驱动开发 | **产品原则**；关注用户行为变化和业务结果，而不是功能数量，具体实践因团队而异 |
| 37 | **IDD｜Impact-Driven Development** | 影响驱动开发 | **描述性标签**；按照预期影响评估优先级，`IDD` 不是统一简称 |
| 38 | **EvDD｜Evidence-Driven Development** | 证据驱动开发 | **产品决策原则，本文消歧简称**；使用研究、实验和客观证据验证假设 |
| 39 | **ExDD｜Experiment-Driven Development** | 实验驱动开发 | **增长与产品实验原则，本文消歧简称**；围绕假设、实验、度量、分析和迭代工作 |
| 40 | **FDD｜Feedback-Driven Development** | 反馈驱动开发 | **持续改进原则**；根据用户、运行环境和团队反馈调整实现，与 Feature-Driven Development 共享缩写 |
| 41 | **Metrics-DD｜Metrics-Driven Development** | 指标驱动开发 | **描述性标签，本文简称**；以质量、性能、转化和采用率指标支持改进，但要避免指标替代真实目标 |
| 42 | **Data-DD｜Data-Driven Development** | 数据驱动开发 | **常见决策原则，本文简称**；使用行为数据和业务数据为迭代提供依据，而不是让数据机械地决定一切 |
| 43 | **KDD｜Knowledge-Driven Development** | 知识驱动开发 | **描述性标签且缩写高风险**；`KDD` 在数据领域通常指 Knowledge Discovery in Databases |
| 44 | **TDD｜Technology-Driven Development** | 技术驱动开发 | **描述性标签**；由新技术、工具或基础设施能力推动建设。`TDD` 默认仍指 Test-Driven Development |

## 文档、规范和知识表达（9 项）

| # | 方法 | 中文名称 | 性质与准确定位 |
| --- | --- | --- | --- |
| 45 | **SDD｜Specification-Driven Development** | 规格驱动开发 | **与第 07 项相同的方法**；从文档视角强调规格是需求、计划、实现和验收的重要事实来源 |
| 46 | **[DDD｜Documentation-Driven Development](https://ubuntu.com/blog/2026/02/17/a-year-of-documentation-driven-development/)** | 文档驱动开发 | **团队工程实践**；将文档、用户体验和功能设计纳入日常开发，而不是在实现结束后补写 |
| 47 | **[RDD｜README-Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html)** | README 驱动开发 | **有明确出处的社区方法**；在编码前从使用者视角写 README，以澄清产品边界、公共接口和使用方式 |
| 48 | **CDD｜Comment-Driven Development** | 注释驱动开发 | **轻量设计技巧**；先用注释或伪代码拆解意图和步骤，再完成实现，没有统一流程 |
| 49 | **Example-DD｜Example-Driven Development** | 示例驱动开发 | **与第 09 项相同的方法，本文消歧简称**；从文档视角强调可运行示例、测试和活文档的结合 |
| 50 | **Decision-DD｜Decision-Driven Development** | 决策驱动开发 | **描述性标签，本文简称**；ADR 是记录架构决策的工件，但使用 ADR 不等于采用一套独立开发方法 |
| 51 | **Rules-DD｜Rules-Driven Development** | 规则驱动开发 | **工程实践，本文简称**；先定义业务规则，再由规则引擎或执行器解释运行 |
| 52 | **Policy-DD｜Policy-Driven Development** | 策略驱动开发 | **治理实践，本文简称**；通过 Policy as Code 等可执行策略控制权限、发布或基础设施 |
| 53 | **Constraint-DD｜Constraint-Driven Development** | 约束驱动开发 | **设计原则，本文简称**；先明确不可违反的架构、合规或质量边界，再开展实现 |

## 质量属性与非功能需求（12 项）

这些名称都能表达合理关注点，但多数属于“把某项质量属性前置”的工程原则，不一定像 TDD 那样有清晰反馈循环，也不一定像 DDD 那样有稳定概念体系。

| # | 方法 | 中文名称 | 性质与准确定位 |
| --- | --- | --- | --- |
| 54 | **SecDD｜Security-Driven Development** | 安全驱动开发 | **工程原则，非统一简称**；更常见名称是 Secure SDLC、DevSecOps、Security by Design 和威胁建模 |
| 55 | **PDD｜Privacy-Driven Development** | 隐私驱动开发 | **工程原则**；更成熟的相关概念是 Privacy by Design、数据最小化、用途限制和生命周期治理 |
| 56 | **QDD｜Quality-Driven Development** | 质量驱动开发 | **工程原则**；对应 Quality Engineering、持续验证和质量门禁 |
| 57 | **PerfDD｜Performance-Driven Development** | 性能驱动开发 | **工程原则，本文消歧简称**；对应 Performance Engineering、性能预算、基准测试和容量规划 |
| 58 | **RDD｜Reliability-Driven Development** | 可靠性驱动开发 | **工程原则**；相关成熟实践包括 SRE、SLO、错误预算和可靠性工程 |
| 59 | **ResDD｜Resilience-Driven Development** | 韧性驱动开发 | **工程原则，本文消歧简称**；关注超时、重试、限流、熔断、降级、隔离和故障演练 |
| 60 | **ADD｜Accessibility-Driven Development** | 无障碍驱动开发 | **工程原则**；更常见说法是 Accessibility by Design 和 WCAG 符合性测试，`ADD` 容易与其他方法冲突 |
| 61 | **ODD｜Observability-Driven Development** | 可观测性驱动开发 | **工程原则**；对应 Observability Engineering，将日志、指标、链路、事件和诊断能力前置 |
| 62 | **CDD｜Compliance-Driven Development** | 合规驱动开发 | **工程原则**；更常见说法是 Compliance by Design、审计证据和 Policy as Code |
| 63 | **SustDD｜Sustainability-Driven Development** | 可持续性驱动开发 | **工程原则，本文消歧简称**；对应 Green Software、能耗和资源效率优化 |
| 64 | **SLO-DD｜SLO-Driven Development** | SLO 驱动开发 | **SRE 决策原则，本文简称**；依据服务等级目标和错误预算安排可靠性投入 |
| 65 | **Cost-DD｜Cost-Driven Development** | 成本驱动开发 | **FinOps 与架构原则，本文简称**；将云成本、模型成本和运行成本作为设计约束 |

## AI 与 Agent 时代的新兴说法（12 项）

从 2025 年起，随着 coding agents 普及，一批面向 AI 辅助和 Agentic 软件工程的术语开始受到关注；截至 2026 年 7 月，它们的成熟度仍有明显差异。

| # | 方法 | 中文名称 | 性质与准确定位 |
| --- | --- | --- | --- |
| 66 | **AIDD｜AI-Driven Development** | AI 驱动开发 | **宽泛描述或非统一简称**；表示 AI 参与需求、设计、编码、测试和审查。AWS 的正式方法名与缩写是 [AI-DLC｜AI-Driven Development Life Cycle](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)，不是 AIDD |
| 67 | **ADD｜Agent-Driven Development** | Agent 驱动开发 | **描述性或提案性术语**；一个或多个 coding agents 可承担研究、规划、编码、测试或审查，不等于“必须使用多 Agent” |
| 68 | **PDD｜Prompt-Driven Development** | 提示词驱动开发 | **早期、非统一术语**；把结构化、可版本化的 Prompt 当作重要工件。若只是凭自然语言反复生成代码，更接近 prompt-based 或 vibe coding |
| 69 | **[EDD｜Eval-Driven Development](https://evaldrivendevelopment.dev/)** | 评测驱动开发 | **新兴社区实践**；用代表性数据集、成功标准和评分器持续评估 LLM 或 Agent 行为，以阈值或聚合指标比较版本 |
| 70 | **SDD｜Spec-Driven Development** | 规格驱动开发 | **与第 07、45 项相同的方法**；`Spec-Driven` 是 `Specification-Driven` 的短写，不是另一套方法 |
| 71 | **CDD｜Context-Driven Development** | 上下文驱动开发 | **描述性术语**；实际工程中更常说 Context Engineering，即设计 Agent 获得的指令、代码、文档、工具结果、记忆和历史决策 |
| 72 | **IDD｜Intent-Driven Development** | 意图驱动开发 | **早期、非统一术语**；开发者声明目标和约束，由工具规划并生成实现，不同资料中的自动化边界并不一致 |
| 73 | **HITL-DD｜Human-in-the-Loop-Driven Development** | 人在回路驱动开发 | **治理机制，本文简称**；在预设检查点或高风险、不可逆操作前由人类审阅、批准或纠偏，并非所有变更都必须人工确认 |
| 74 | **Policy-DD｜Policy-Driven Agent Development** | 策略驱动 Agent 开发 | **Agent 治理实践，本文简称**；通过可执行策略限制权限、命令、文件和外部操作 |
| 75 | **Trace-DD｜Trace-Driven Development** | 轨迹驱动开发 | **可观测与调试实践，本文简称**；依据消息、工具调用、状态变化和结果等执行轨迹复盘，不应暗示可读取模型隐藏思维链 |
| 76 | **Benchmark-DD｜Benchmark-Driven Development** | 基准驱动开发 | **评估实践，本文简称**；用稳定基准辅助模型、Prompt 和工具选型，但通用基准不能替代产品自己的 eval |
| 77 | **Guardrail-DD｜Guardrail-Driven Development** | 护栏驱动开发 | **AI 安全实践，本文简称**；将权限、输入输出校验、沙箱、回滚和审计作为前置约束 |

`Eval-Driven Development` 借鉴了 `TDD` **“先定义可验证目标，再迭代实现”** 的思路，但二者不是简单的“确定性 vs. 概率性”：`TDD` 以自动化测试驱动代码设计与实现；`LLM / Agent eval` 通常在代表性任务集上组合代码型、模型型和人工评分器。确定性断言仍然可以是 `Agent eval` 的一部分，只有在输出波动明显时才需要重复采样并报告分布。二者是互补关系，`eval` 不能替代常规的单元、集成和端到端测试。[Anthropic 的 Agent eval 指南](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) 也将多种评分方式视为可组合手段。

`Human-in-the-loop`、`权限策略`、`tracing`、`benchmarks` 和 `guardrails` 都很重要，但不应仅仅因为名称后面能加 `-DD`，就把它们说成已经形成统一方法论。

## 最容易混淆的缩写

缩写没有全行业统一的分配规则。结合上面尤其需要注意：

- `ADD` 在软件架构资料中通常指 `Attribute-Driven Design`，`Architecture-`、`Agent-` 和 `Accessibility-Driven` 等含义应写出全称；
- `BDD` 通常指 `Behavior-Driven Development`，而不是 `Business-Driven Development`；
- `DDD` 通常指 `Domain-Driven Design`，`Documentation-` 和 `Data-Driven` 需要结合语境；
- `MDD` 通常指 `Model-Driven Development`，`Metadata-Driven` 应主动消歧；
- `TDD` 通常指 `Test-Driven Development`，`Template-` 和 `Technology-Driven` 不应默认占用该缩写；
- `CDD`、`EDD`、`PDD`、`RDD` 和 `SDD` 都存在多个真实或临时用法，首次出现时最好始终附上英文全称。

所以，看到一个新的 `?DD` 时，最有用的不是先背缩写，而是问四件事：

1. 它优先驱动的工件到底是什么：测试、模型、规格、风险，还是数据？
2. 它有没有清晰的反馈循环、角色分工和完成标准？
3. 它是一套完整方法，还是架构风格、测试技术或团队原则？
4. 这个缩写来自公认资料，还是作者为了方便临时起的名字？

把这四件事说清楚，比“我们项目采用了十种 DD”更有用。
