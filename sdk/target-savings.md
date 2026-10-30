---
description: "Create savings goals, manage the allowance, and withdraw with the Loktin SDK."
---

# Target Savings

A goal saves toward a target by a deadline. Scheduled deposits are collected by the contract, and the user can also deposit by hand.

## Create a goal

[`createGoal`](/sdk/api/target-savings/classes/TargetSavings#creategoal) creates a goal for `publicKey` and gives you its id. Ids are not sequential.

<<< @/snippets/target-savings.ts#create-goal

### Withdrawal rules

Each goal has one rule, chosen when it is created:

- **Penalty:** the user may withdraw early and pays a penalty of up to 1,000 basis points (10%). The penalty goes to the integrator.
- **Lock:** there is no withdrawal until the target is reached or the deadline passes.

Once the target is reached, or from the deadline second onwards, a withdrawal carries no penalty. Fees still apply.

## Amounts

Amounts are `bigint` base units. USDC has 7 decimals. [`toBaseUnits`](/sdk/api/index/functions/toBaseUnits) and [`fromBaseUnits`](/sdk/api/index/functions/fromBaseUnits) convert to and from decimal strings.

## The allowance

An owner has one token allowance for Target Savings, shared by all their goals. Each approval replaces it whole.

`createGoal` takes an `allowance` option:

- **`'auto'`** is the default. The SDK approves what the scheduled deposits of all the owner's open goals need, the new one included.
- **`'none'`** approves nothing and leaves the current allowance as it is.
- **`{ amount, expiryLedger }`** approves exactly that, and replaces the allowance of all the owner's goals.

Create an owner's goals one at a time, so each approval sees the goals before it.

The allowance covers the deposits due before it expires. It expires one day after the latest deadline of those goals, unless the network's longest allowed time is shorter. In that case the result has a `renewBy` date, 7 days before the allowance expires.

Call [`renewAllowance`](/sdk/api/target-savings/classes/TargetSavings#renewallowance) before that date, or later scheduled deposits fail for lack of allowance. It covers all the owner's open goals, as `'auto'` does.

## Manual deposits

[`deposit`](/sdk/api/target-savings/classes/TargetSavings#deposit) moves an amount from `publicKey` into their goal.

<<< @/snippets/target-savings.ts#deposit

## Check before signing

[`creationBreakdown`](/sdk/api/target-savings/functions/creationBreakdown) shows what an early withdrawal of the whole target would pay out, before the user signs. It makes no network call.

<<< @/snippets/target-savings.ts#breakdown

[`allowanceStatus`](/sdk/api/target-savings/classes/TargetSavings#allowancestatus) says whether the next scheduled deposit would be short on allowance. The other goals' collections use the same allowance. It does not check the owner's balance.

<<< @/snippets/target-savings.ts#status

## Find goals

There is no paging by number. Use the id that `createGoal` gives you. To find goals, do one of these:

- Call [`userGoals`](/sdk/api/target-savings/classes/TargetSavings#usergoals) for each of your own users, at most 20 goals each.
- Read the contract's `goal_created` and `goal_closed` events into your own store.

<<< @/snippets/target-savings.ts#find-goals

## Withdraw

[`withdraw`](/sdk/api/target-savings/classes/TargetSavings#withdraw) withdraws the whole goal and closes it. [`previewWithdraw`](/sdk/api/target-savings/classes/TargetSavings#previewwithdraw) shows how a withdrawal would split right now.

<<< @/snippets/target-savings.ts#withdraw

The user receives `toUser`. The penalty and the integrator fee accrue to the integrator, and the Loktin fee to Loktin's fee recipient. See [Security and trust](/sdk/security#claiming-fees).

Under a lock rule, a withdrawal before the target or deadline is refused while the goal holds any principal. A goal with nothing deposited can be closed at any time, under any rule.

## Errors

Every error the SDK throws is a [`LoktinError`](/sdk/api/index/classes/LoktinError) with a stable `code`:

| Code                     | Meaning                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `INVALID_INPUT`          | An input was refused before any network call.                                                                                                  |
| `CONTRACT_ERROR`         | Target Savings or Spend & Save refused the call with one of its documented codes.                                                              |
| `TOKEN_ERROR`            | The token contract refused the call, for example for a low balance or a missing trustline.                                                     |
| `UNKNOWN_CONTRACT_ERROR` | A contract error the SDK cannot name.                                                                                                          |
| `SIGNER_REFUSED`         | The wallet refused to sign, or failed while signing.                                                                                           |
| `NETWORK`                | The RPC could not be reached, or answered with an error, after the SDK's retries: 3 for a read, and 3 for each step of a write before signing. |
| `PENDING`                | The transaction was sent and its outcome is not known yet. Look it up by hash; do not resend.                                                  |
| `TRANSACTION_FAILED`     | The transaction was sent and failed.                                                                                                           |

Each error is reported against the contract that raised it. The contract codes are listed in [docs/errors.md](https://github.com/Lokt-In/loktin-sdk/blob/main/docs/errors.md).

<<< @/snippets/target-savings.ts#errors
