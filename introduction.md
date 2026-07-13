# Introduction

**Loktin** is a savings platform built on the Stellar network. It uses on-chain commitment devices to help you do what you already know you should: pay bills on time, hit savings goals, set aside a fixed reserve, and save a little off every spend.

Every option is enforced by a smart contract. Once funds are committed they behave only according to the platform's rules, not even your willpower in a bad moment. We ensure every committed USDC also generates a return.

## How it Works

- **Plan**: decide on your commitment. It could be a bill schedule, a savings goal, a fixed amount you'd like to lock, or a save-on-spend rule.
- **Lock In**: our contract takes custody of the USDC according to the selected plan's rules.
- **Earn**: idle USDC routes through [Blend](https://www.blend.capital) to generate yield while it waits. See [Earn via Blend](/coming-soon/blend-yield).

## Four primitives, one platform

Loktin offers four distinct savings options:

| Primitive          | What it does                                                         | Withdrawal rule                                                           |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Plans**          | Lock USDC + schedule bill payments over a set timeframe. Pays your scheduled bills automatically on due dates while earning yield on the untouched USDC. | Surplus + yield returned at end of plan duration                                   |
| **Target Savings** | Save towards a goal with periodic auto-deposits from your wallet.                        | Locked until end date; **1% forfeit if early**                            |
| **Locked In**      | Fixed-amount, fixed-term lock with tiered APY.                       | **No early withdrawal.** Unlocks at maturity.                             |
| **Spend & Save**   | Routes a configured % of every USDC spend from your wallet into a side vault.         | **Withdrawal of saved funds is only available on the 28th of each month** |

You don't have to use all four. Most users start with one and add others as their needs grow.

<!-- ## What makes Loktin different -->

## What's next

- Set up your wallet and connect: [Getting Started →](/getting-started)
- Browse the savings options: [Plans](/primitives/plans), [Target Savings](/primitives/target-savings), [Locked In](/primitives/locked-in), [Spend & Save](/primitives/spend-save)
