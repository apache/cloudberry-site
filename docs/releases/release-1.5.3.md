---
title: 1.5.3
---

# Cloudberry Database v1.5.3 Release Notes

Version number: v1.5.3

Cloudberry Database v1.5.3 is a minor release that includes some improvements, bug fixes and doc updates.

Quick try: [v1.5.3](https://github.com/cloudberrydb/cloudberrydb/releases/tag/1.5.3)

Full changelog: [https://github.com/cloudberrydb/cloudberrydb/compare/1.5.2...1.5.3](https://github.com/cloudberrydb/cloudberrydb/compare/1.5.2...1.5.3)

## Improvements

- Support `postgres_fdw` in the default build by @[smartyhero](https://github.com/smartyhero) in [#400](https://github.com/cloudberrydb/cloudberrydb/pull/400)

- `gpconfig` does not escape '$' char by @[Ray-Eldath](https://github.com/Ray-Eldath) in [403#](https://github.com/cloudberrydb/cloudberrydb/pull/403)

- Access method flags can now indicate supporting column-oriented scanning of custom table by @[gongxun0928](https://github.com/gongxun0928) in [407#](https://github.com/cloudberrydb/cloudberrydb/pull/407)

- Add GUC `gp_random_insert_segments` to control the segments used for randomly distributed table insertion by @[foreyes](https://github.com/foreyes) in [#406](https://github.com/cloudberrydb/cloudberrydb/pull/406)

- Implement Directory Table by @[wenchaozhang-123](https://github.com/wenchaozhang-123) in [#390](https://github.com/cloudberrydb/cloudberrydb/pull/390)

- Disable dumping pax tables in `pg_dump` by @[jiaqizho](https://github.com/jiaqizho) in [#412](https://github.com/cloudberrydb/cloudberrydb/pull/412)

- Update the `googletest` module URL by @[tuhaihe](https://github.com/tuhaihe) in [#429](https://github.com/cloudberrydb/cloudberrydb/pull/429)


## Bug fixes

- Improve the outbound data buffer when calling `EVP_DecryptUpdate` (#479) by @[kongfanshen-0801](https://github.com/kongfanshen-0801) in [#408](https://github.com/cloudberrydb/cloudberrydb/pull/408)

- Add back the function that pgrx could not find after numeric change interface by @[jiaqizho](https://github.com/jiaqizho) in [#410](https://github.com/cloudberrydb/cloudberrydb/pull/410)

- Fix copy from directory tables by @[wenchaozhang-123](https://github.com/wenchaozhang-123) in [#416](https://github.com/cloudberrydb/cloudberrydb/pull/416)

- Fix visimap consults for unique checks during UPDATEs by @[lss602726449](https://github.com/lss602726449) in [#423](https://github.com/cloudberrydb/cloudberrydb/pull/423)

- Fix the directory table CI pipeline issues by @[wenchaozhang-123](https://github.com/wenchaozhang-123) in [#414](https://github.com/cloudberrydb/cloudberrydb/pull/414)

- Fix drop directory privilege check by @[wenchaozhang-123](https://github.com/wenchaozhang-123) in [#425](https://github.com/cloudberrydb/cloudberrydb/pull/425)

## Doc updates

- Update the README.md file by @[tuhaihe](https://github.com/tuhaihe) in [#411](https://github.com/cloudberrydb/cloudberrydb/pull/411)

- Update the deployment README.md by @[Zhangbaowen-Hashdata](https://github.com/Zhangbaowen-Hashdata) in [#409](https://github.com/cloudberrydb/cloudberrydb/pull/409)

## 🙌🏻️ New contributors

- @[kongfanshen-0801](https://github.com/kongfanshen-0801) made his (or her) first contribution in [#408](https://github.com/cloudberrydb/cloudberrydb/pull/408)

- @[foreyes](https://github.com/foreyes) made his (or her) first contribution in [#406](https://github.com/cloudberrydb/cloudberrydb/pull/406)

## 🧑🏻‍💻 Contributors

Thanks to all the contributors to make this release happen: @[smartyhero](https://github.com/smartyhero), @[Ray-Eldath](https://github.com/Ray-Eldath), @[gongxun0928](https://github.com/gongxun0928), @[kongfanshen-0801](https://github.com/kongfanshen-0801), @[foreyes](https://github.com/foreyes), @[tuhaihe](https://github.com/tuhaihe), @[Zhangbaowen-Hashdata](https://github.com/Zhangbaowen-Hashdata), @[jiaqizho](https://github.com/jiaqizho), @[wenchaozhang-123](https://github.com/wenchaozhang-123), @[lss602726449](https://github.com/lss602726449), @[soumyadeep2007](https://github.com/soumyadeep2007), @[ashwinstar](https://github.com/ashwinstar) 👍