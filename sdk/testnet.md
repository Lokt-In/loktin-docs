---
description: "Contract ids, releases, role addresses and attestation checks for Loktin's testnet deployment."
---

# Testnet contracts

These are the contracts the SDK uses on Stellar testnet. There is no mainnet deployment.

## Network

| Setting            | Value                               |
| ------------------ | ----------------------------------- |
| Network passphrase | `Test SDF Network ; September 2015` |
| RPC                | `https://soroban-testnet.stellar.org` |

## Contracts

| Contract       | Id |
| -------------- | -- |
| Target Savings | [`CCJH2IRI7JVZ7JV7J4XLUPVIPVMLG2HB7OBDQC2F3XLPVOVBH3QQVP4Z`](https://stellar.expert/explorer/testnet/contract/CCJH2IRI7JVZ7JV7J4XLUPVIPVMLG2HB7OBDQC2F3XLPVOVBH3QQVP4Z) |
| Spend & Save   | [`CCUFRRPCCE7YVKTG3FWE2RAW5ACMU7KVACTVKDM452C5QFMABAXQTTCN`](https://stellar.expert/explorer/testnet/contract/CCUFRRPCCE7YVKTG3FWE2RAW5ACMU7KVACTVKDM452C5QFMABAXQTTCN) |
| USDC           | [`CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA`](https://stellar.expert/explorer/testnet/contract/CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA) |

USDC here is Circle's testnet USDC.

## Live releases

Both contracts run release [`contracts-v0.3.0`](https://github.com/Lokt-In/loktin-sdk/tree/contracts-v0.3.0), commit `a91b9eec00eb3a4af04cf3492f2b193e1328df28`.

| Contract       | Live Wasm hash |
| -------------- | -------------- |
| Target Savings | `ccafed3e94e9d9af6b3a72d31e85050bc357168552c8745a9314ea79e29e0b3e` |
| Spend & Save   | `42c21931d32b9874f257991afc984be02552d4db343dade4b2e7e715a9a24200` |

## Upgrade history

The contracts started at `contracts-v0.1.0`. Each later release upgraded them in place, so the ids stayed the same.

| Release | Commit | Target Savings Wasm hash | Spend & Save Wasm hash |
| ------- | ------ | ------------------------ | ---------------------- |
| [`contracts-v0.1.0`](https://github.com/Lokt-In/loktin-sdk/tree/contracts-v0.1.0) | `d5fc95680bd443a5ee41020afd2b43eb9b7a91ca` | `5b67b75f7504bb748e7b4c891cbf956d381d923431c591a2e6bde072d50d047e` | `1e655573744740bfbbebbb04b7c54c9058e979c853bc23fe4f71431cc3999183` |
| [`contracts-v0.2.0`](https://github.com/Lokt-In/loktin-sdk/tree/contracts-v0.2.0) | `475217b6d679b199e54dd5efde29a63ec38c39ef` | `9686da20b05d891a317272f92fce0fb2e9d75fa7f67ec5934452be827fe9a0a9` | `d7a7bb028dca1db88cf78e5514ea99a48c8f373010c154862958153478020f95` |
| [`contracts-v0.3.0`](https://github.com/Lokt-In/loktin-sdk/tree/contracts-v0.3.0) | `a91b9eec00eb3a4af04cf3492f2b193e1328df28` | `ccafed3e94e9d9af6b3a72d31e85050bc357168552c8745a9314ea79e29e0b3e` | `42c21931d32b9874f257991afc984be02552d4db343dade4b2e7e715a9a24200` |

## Role addresses

| Role          | Address |
| ------------- | ------- |
| Admin         | `GBLRCDODEBVISJZKU64JJDPJK6Y5VUYS5DSNCBMTJWC3RMDYLAQ47BHH` |
| Fee-admin     | `GDTK23FN4KUACFLXWBXJA74VCBWJREXMNDSG4JVIA66DRQKG5CTCTJ6A` |
| Pauser        | `GDS4NBNFAO4LGGETP2WD4WU4NDPVI3CT2XOKJRDF5B354TZGM3Z4LOWF` |
| Upgrader      | `GBSSL5XPSTNFJ2J7KT3STB6FCBHED7ZY3HDFJHL6GUQPPDGXZ7CH2KPJ` |
| Fee recipient | `GBDE532O3GILO7HDUUVTAKFLI44CJTPG7X4BVSDOZSRFJCUZEZYY44RT` |

## Minimum cadence

The shortest cadence a goal may use on this instance is 86,400 seconds (1 day). [`minCadence`](/sdk/api/target-savings/classes/TargetSavings#mincadence) reads it from the contract.

## Check an attestation

Each contract's live Wasm hash has a GitHub artifact attestation in `Lokt-In/loktin-sdk`. With the GitHub CLI, download the Wasm files from the `contracts-v0.3.0` release run, then check each one. GitHub keeps this artifact until 26 January 2027.

```sh
gh run download 40702034861 --repo Lokt-In/loktin-sdk -n contracts-wasm -D <dir>
gh attestation verify <dir>/loktin_target_savings.wasm -R Lokt-In/loktin-sdk
gh attestation verify <dir>/loktin_spend_save.wasm -R Lokt-In/loktin-sdk
```

There are GitHub release pages for the SDK only, not for the contracts. See [docs/deploy.md](https://github.com/Lokt-In/loktin-sdk/blob/main/docs/deploy.md) for the full steps.
