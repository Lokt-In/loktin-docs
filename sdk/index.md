---
description: "The Loktin SDK: Target Savings and Spend & Save for Stellar apps."
---

# Loktin SDK

`@loktin/sdk` is a TypeScript SDK for Loktin's savings contracts on Stellar. It has no user interface: your app supplies the screens and the wallet, and the SDK builds, checks, signs and sends the contract calls.

It covers two savings primitives:

- **Target Savings**: the user saves toward a target by a deadline, with scheduled deposits that the contract collects and deposits the user makes by hand.
- **Spend & Save**: each time the user spends, a share of the spend is saved, either to a Spend & Save balance or into a Target Savings goal. The balance can be withdrawn on one day each month.

The SDK has its own contracts, separate from the Loktin app's for now.

## Status

This is the preview release, `0.5.0`. Its API may change before `1.0.0`. It works on Stellar testnet only.

## Install

```sh
npm install @loktin/sdk@next @stellar/stellar-sdk
```

The package is on [npm](https://www.npmjs.com/package/@loktin/sdk). The code is in the [loktin-sdk repo](https://github.com/Lokt-In/loktin-sdk).

## Create an instance

Create one SDK instance for testnet with the user's address and a signer. Here `userAddress` and `wallet` come from your app.

<<< @/snippets/quickstart.ts#create

## Guides

- [Quickstart](/sdk/quickstart)
- [Target Savings](/sdk/target-savings)
- [Spend & Save](/sdk/spend-save)
- [Keeper](/sdk/keeper)
- [Security and trust](/sdk/security)
- [Testnet contracts](/sdk/testnet)

## API reference

See the [API reference](/sdk/api/).
