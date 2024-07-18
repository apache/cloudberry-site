---
slug: cloudberrydb-sep-weekly
title: Cloudberry Database 社区简报 - 2023/9
authors: [cloudberrydbteam]
tags: [简报]
image: /img/blog/202309.png
---

Cloudberry Database 社区简报 2023 年 9 月期来啦！简报目标是汇总 Cloudberry Database 最新开发进展、发展趋势、关键功能实现以及社区活动等，让大家掌握最新项目动态。我们诚邀大家加入到 Cloudberry Database 社区，共同致力于 Cloudberry Database 未来发展与塑造。

马上阅读本期简报内容吧！

<!-- truncate -->

## Pull Request 清单

- Docs: merge docs for CBDB compilation on Linux systems [#224](https://github.com/cloudberrydb/cloudberrydb/pull/224) by @TomShawn
- New altertable rewrite dispatch policy [#223](https://github.com/cloudberrydb/cloudberrydb/pull/223) by @wangliang03
- bugfix: support hashdata tableam in Orca [#222](https://github.com/cloudberrydb/cloudberrydb/pull/222) by @gongxun0928
- [WIP]Add git hooks for Cloudberry Database development [#221](https://github.com/cloudberrydb/cloudberrydb/pull/221) by @tuhaihe
- Doc: update the building guide for MacOS [#220](https://github.com/cloudberrydb/cloudberrydb/pull/220) by @Zhangbaowen-Hashdata
- support alter table for hashdata format [#219](https://github.com/cloudberrydb/cloudberrydb/pull/219) by @wangliang03
- Fix incorrect index->reltuples after VACUUM [#217](https://github.com/cloudberrydb/cloudberrydb/pull/217) by @lss602726449
- Add regress pipeline for branch union_store_catalog [#211](https://github.com/cloudberrydb/cloudberrydb/pull/211) by @wenchaozhang-123
- change storage_am related catalog table main_manifest field type from… [#210](https://github.com/cloudberrydb/cloudberrydb/pull/210) by @wangliang03
- Add vacuum full in serverless [#209](https://github.com/cloudberrydb/cloudberrydb/pull/209) by @roseduan
- Implement extensible libpq protocol [#208](https://github.com/cloudberrydb/cloudberrydb/pull/208) by @wenchaozhang-123
- support analyze for unionstore table in cloudberry [#207](https://github.com/cloudberrydb/cloudberrydb/pull/207) by @gongxun0928
- SingleNode deployment [#206](https://github.com/cloudberrydb/cloudberrydb/pull/206) by @Ray-Eldath
- Add hooks for plugins to get control in transientrel_init/intorel_initplan. [#203](https://github.com/cloudberrydb/cloudberrydb/pull/203) by @HuSen8891
- Add main_manifest catalog table [#202](https://github.com/cloudberrydb/cloudberrydb/pull/202) by @roseduan
- Fix unportable scripts on macOS [#201](https://github.com/cloudberrydb/cloudberrydb/pull/201) by @Ray-Eldath
- Doc: update README.md for Cloudberry Database [#199](https://github.com/cloudberrydb/cloudberrydb/pull/199) by @tuhaihe
- Fix portability issues on macOS with gcc-13 [#198](https://github.com/cloudberrydb/cloudberrydb/pull/198) by @Ray-Eldath
- Feature: building Postgres backend into shared library [#197](https://github.com/cloudberrydb/cloudberrydb/pull/197) by @lss602726449
- Feature/add ext dml init fini hook for custom table am [#196](https://github.com/cloudberrydb/cloudberrydb/pull/196) by @gongxun0928
- Feature: separation of storage and compute [#192](https://github.com/cloudberrydb/cloudberrydb/pull/192) by @HuSen8891
- Feature: lazy initialize orca optimizer [#191](https://github.com/cloudberrydb/cloudberrydb/pull/191) by @lss602726449
- Add extensible smgr slot for other storage format. [#190](https://github.com/cloudberrydb/cloudberrydb/pull/190) by @wenchaozhang-123
- Feature: Support custom wal rmgr [#189](https://github.com/cloudberrydb/cloudberrydb/pull/189) by @gfphoenix78
- Update license headers for new CBDB source files [#187](https://github.com/cloudberrydb/cloudberrydb/pull/187) by @tuhaihe
- Fix warehouse test when external fts enabled [#182](https://github.com/cloudberrydb/cloudberrydb/pull/182) by @roseduan

## 提案与建议

- [Feature Requests] Multiple character delimiter needs to be supported [#200](https://github.com/orgs/cloudberrydb/discussions/200) by @liang8283
- [Proposal] Support SingleNode Deployment [#188](https://github.com/orgs/cloudberrydb/discussions/188) by @Ray-Eldath

## Issue 清单

- [Bug] Insert into a ao relation with 32 concurrent transactions failled [#216](https://github.com/cloudberrydb/cloudberrydb/issues/216) by @shmiwy
- [Bug] `gp_aoseg_name` may return wrong value. [#215](https://github.com/cloudberrydb/cloudberrydb/issues/215) by @shmiwy
- [Bug] `reltuples` in `pg_class` may be wrong for index [#214](https://github.com/cloudberrydb/cloudberrydb/issues/214) by @shmiwy
- [Bug] pg_relation_size may get wrong result. [#213](https://github.com/cloudberrydb/cloudberrydb/issues/213) by @shmiwy
- [Bug] count(*) query crashed and db in recovery mode [#212](https://github.com/cloudberrydb/cloudberrydb/issues/212) by @liyxbeijing
- [Bug] Report some errors after using new user-defined access methods [#195](https://github.com/cloudberrydb/cloudberrydb/issues/195) by @hw118118
- [Bug] gpinitsystem failed with missing library. [#194](https://github.com/cloudberrydb/cloudberrydb/issues/194) by @RyanWei

## 贡献者

🎈️🎊️ 感谢以下贡献者在本月对 Cloudberry Database 的贡献，无论是提交 Pull Request、报告 issue 还是更新网站或文档，都让 Cloudberry Database 项目和社区越来越好，我们都欢迎：

> @TomShawn, @wangliang03, @gongxun0928, @tuhaihe, @Zhangbaowen-Hashdata, @lss602726449, @wenchaozhang-123, @roseduan, @Ray-Eldath, @HuSen8891, @gfphoenix78, @liang8283, @shmiwy, @liyxbeijing, @hw118118, @RyanWei

## 加入我们

Cloudberry Database 致力于打造中立、开放和友好的数据库技术社区，我们面向任何人保持开放，无论其经验水平如何。我们鼓励各种类型的贡献，无论大小多少，可参考[《贡献指南》](https://cloudberrydb.org/contribute/how-to-contribute)查看可参与贡献的方式。

除此之外，我们为社区成员提供了丰富的交流、求助和获取反馈的渠道，可查看[支持页面](https://cloudberrydb.org/support)了解详情。

同时祝你周末愉快，我们下次简报见！