# FAQ

## What's the platform fee?

Plans charge a 2% fee at creation, deducted from your initial deposit. The other primitives are fee-free.

Target Savings has a 1% **forfeit** on early withdrawal. This is a discipline mechanism, not a recurring fee. You only pay it if you break the lock before the goal's end date.

## Is my money safe?

- **Non custodial**: you sign every state-changing tx. We never hold your keys.
- **On-chain enforcement**: savings rules are in the contract, not the app. Even if our frontend went down, your funds are recoverable directly from the contracts.

<!-- ## What happens if Loktin shuts down?

Your funds are still on Stellar. You can:

- Call `withdraw()` / `unlock()` / `end_cycle()` directly via stellar CLI or any Soroban tool

The contracts are ownerless from a withdrawal standpoint. Every method that can move user funds is gated by `user.require_auth()`. The admin keypair can do certain ops (pay bills, set APY tiers), but cannot withdraw your money to its own wallet. -->

<!-- ## Why is Locked In so strict (no early withdrawal)?

Because the value of a hard commitment is its hardness. If we let you break the lock with a fee, half the users would. By making it impossible, you don't have to fight yourself in a moment of weakness.

If you're not sure you can commit, use Target Savings instead. It has the 1% forfeit option as a softer alternative. -->

## What's "Blend"?

[Blend](https://www.blend.capital) is Stellar's lending protocol. Loktin routes idle USDC across all primitives into Blend pools to earn supply APY while it sits committed.

## Why the 28th of the month for Spend & Save?

It's the latest day that exists in every month. This means the rule works year-round without edge cases. The cooldown also forces real intentionality. You can't withdraw the same day you save.

## What chains does Loktin support?

Stellar only, for now.
