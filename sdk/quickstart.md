---
description: "Install the Loktin SDK, then create a first goal and a first pay-and-save on testnet."
---

# Quickstart

This page takes you from install to a first goal and a first pay-and-save. The SDK works on Stellar testnet only.

## Install

```sh
npm install @loktin/sdk@next @stellar/stellar-sdk
```

`@stellar/stellar-sdk` is a peer dependency. The SDK needs version 17.2.1 or a later 17.x.

## Create the instance

Create one SDK instance for testnet with the user's address and a signer. The signer's `signTransaction` comes from the user's wallet. The SDK never sees a secret key.

<<< @/snippets/quickstart.ts#create

Here `userAddress` and `wallet` come from your app. Every write acts for `publicKey`. See [`createLoktin`](/sdk/api/index/functions/createLoktin).

## Create the modules

Each module works for one integrator, which is your app's address, and takes your integrator fee in basis points.

<<< @/snippets/quickstart.ts#modules

Here `integratorAddress` comes from your app.

## Create a first goal

[`createGoal`](/sdk/api/target-savings/classes/TargetSavings#creategoal) creates a goal and gives you its id. Amounts are `bigint` base units. USDC has 7 decimals, and [`toBaseUnits`](/sdk/api/index/functions/toBaseUnits) converts from a decimal string.

<<< @/snippets/quickstart.ts#first-goal

By default, the goal also approves an allowance for its scheduled deposits. See the [Target Savings guide](/sdk/target-savings).

## Enrol and pay

[`enroll`](/sdk/api/spend-save/classes/SpendSave#enroll) sets how much of each spend is saved. [`payAndSave`](/sdk/api/spend-save/classes/SpendSave#payandsave) pays an address and saves the skim in the same transaction.

<<< @/snippets/quickstart.ts#first-spend

Here `shopAddress` comes from your app. See the [Spend & Save guide](/sdk/spend-save).
