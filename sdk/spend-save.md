---
description: "Save a share of each spend, and withdraw once a month, with the Loktin SDK."
---

# Spend & Save

Each time the user spends, a share of the spend is saved, either to a Spend & Save balance or into a Target Savings goal. The balance can be withdrawn on one day each month.

## Enrol

[`enroll`](/sdk/api/spend-save/classes/SpendSave#enroll) sets how much of each spend is saved.

<<< @/snippets/spend-save.ts#enroll

The settings are:

- **Percentage:** `percentBps`, 100 to 5,000 basis points of the spend.
- **Round-up:** `roundUpUnit`, which rounds the spend up to a multiple of this unit, in base units. Set this, the percentage, or both.
- **Monthly cap:** `monthlyCap`, the most saved in one UTC month. It is optional. Once it is reached, skims shrink to fit it. The payment is never blocked by the cap.
- **Destination:** `{ kind: 'balance' }`, or `{ kind: 'goal', goalId }` for one of the user's open goals. A skim sent to a goal follows that goal's rules.
- **Withdrawal day:** `withdrawalDay`, a day of the month from 1 to 28, in UTC.

A user has one enrolment per integrator, and at most 5 in all.

## Pay and save

[`payAndSave`](/sdk/api/spend-save/classes/SpendSave#payandsave) pays a G, M or C address and saves the skim in the same transaction.

<<< @/snippets/spend-save.ts#pay

A skim never exceeds the spend. A skim never blocks a payment: if the wallet cannot cover the payment plus the skim, the skim shrinks to what remains, down to zero. The result's `shortfall` shows how much the wallet could not cover.

For a spend made by other means, [`saveForSpend`](/sdk/api/spend-save/classes/SpendSave#saveforspend) saves the skim on its own. [`previewSkim`](/sdk/api/spend-save/classes/SpendSave#previewskim) shows how a spend would be skimmed.

## The withdrawal window

The withdrawal window is the whole UTC day of the user's withdrawal day, every month. It can open up to 60 seconds early in real time.

[`nextWindow`](/sdk/api/spend-save/classes/SpendSave#nextwindow) gives the current window if one is open, otherwise the next one, in UTC. Its `end` is the first second after the window. [`windowInTimeZone`](/sdk/api/index/functions/windowInTimeZone) formats it in the device's time zone, or one you name.

<<< @/snippets/spend-save.ts#window

## Change settings

[`updateSettings`](/sdk/api/spend-save/classes/SpendSave#updatesettings) replaces the skim settings, cap and destination at once. They may change at any time. Fee rates never change.

<<< @/snippets/spend-save.ts#settings

A new withdrawal day takes effect from next month. Until then the current month keeps the old day. [`enrollment`](/sdk/api/spend-save/classes/SpendSave#enrollment) shows the day that applies now as `effectiveWithdrawalDay`. That value is for display only: at the edge of a month the chain decides.

## Withdraw

[`withdraw`](/sdk/api/spend-save/classes/SpendSave#withdraw) withdraws an amount from the balance. Within the window, the user may withdraw any amount from 1 base unit up to the balance. The chain refuses it outside the window. [`previewWithdraw`](/sdk/api/spend-save/classes/SpendSave#previewwithdraw) shows how a withdrawal would split, and does not check the window.

<<< @/snippets/spend-save.ts#withdraw

The user receives `toUser`. The integrator fee accrues to the integrator, and the Loktin fee to Loktin's fee recipient. Spend & Save has no penalty.

[`close`](/sdk/api/spend-save/classes/SpendSave#close) closes the enrolment once its balance is zero.
