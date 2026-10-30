---
description: "What a keeper does, the keeper functions in the Loktin SDK, and the keeper template."
---

# Keeper

A keeper collects the scheduled deposits of Target Savings goals when they are due.

Anyone may collect a due goal. There is no keeper role and no allowlist, so you can run a keeper without any permission from Loktin. A collect can only move the due amount from the goal owner's wallet into that owner's goal. The keeper's account needs only XLM for fees.

## The keeper functions

`@loktin/sdk/keeper` has the parts of a keeper:

- [`scanGoals`](/sdk/api/keeper/functions/scanGoals) finds the goals a keeper serves: the open goals of the given integrators, from the contract's `goal_created` and `goal_closed` events, plus the open goals of an optional list of owners. It reads the goals 200 at a time, in one RPC call each.
- [`isDue`](/sdk/api/keeper/functions/isDue) tells from a goal's stored data whether it can be collected now.
- [`runPass`](/sdk/api/keeper/functions/runPass) runs one pass: it scans, then collects each due goal. The contract's expected refusals, such as `NotDue` or `Shortfall`, are skips. Any other error stops the pass and is reported in `failure`.
- [`feeCeilingSigner`](/sdk/api/keeper/functions/feeCeilingSigner) wraps the keeper's signer so it refuses a transaction whose fee is above a ceiling. A refused collect is a skip.

<<< @/snippets/keeper.ts#run-pass

## Channels

`runPass` also takes a list of SDK instances, one per channel. One account gets about one transaction into each ledger, because its transactions must go one sequence number at a time.

A collect needs no signature but its sender's, so a channel is simply another keeper account with its own key and XLM for fees. Each channel takes the next due goal when it is free, so more channels collect more goals in the same time. The pass first checks that every channel's account exists, and sends nothing if one is missing.

## The keeper template

The keeper template is a small Node program built on `@loktin/sdk/keeper`. It runs one keeper pass and exits. It comes with a container image and examples for running it on a schedule. It works on Stellar testnet only for now.

- [The template](https://github.com/Lokt-In/loktin-sdk/tree/main/templates/keeper)
- [Its README](https://github.com/Lokt-In/loktin-sdk/blob/main/templates/keeper/README.md), with the full steps
- [The sizing results](https://github.com/Lokt-In/loktin-sdk/blob/main/docs/keeper-sizing.md)
