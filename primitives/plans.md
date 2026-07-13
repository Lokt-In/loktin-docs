# Plans

On LoktIn, plans are time-locked billing schedules. Lock USDC into a plan, attach bills with due dates, and the Loktin Keeper service auto-pays each bill on the day it's due.

## Why use Plans

You know you'll need $100 for groceries, $50 for internet, and $10 for electricity every month for the next 3 months. Instead of leaving that money in your spending wallet (where it'll get spent on other expenses), you commit it to a Plan. The contract holds it. We automatically pay / release it when it is due.

## How it works

### 1. Create a plan

You choose:

- **Duration**: 1 to 12 months
- **Deposit amount**: total USDC to lock (a platform fee is deducted upfront)

The contract pulls your USDC, locks it for the duration, and gives you a plan ID. The remaining % becomes your "available for bills" balance.

### 2. Add bills to the plan

Each bill has:

- **Name** : e.g. "Rent"
- **Amount**: USDC per occurrence
- **Due date**: must be day 1–28 of a month
- **Recurring?**: if yes, the bill auto-rebills each month within the plan's window
- **Category**: Housing, Utilities, Transportation, Food, Healthcare, Insurance, Entertainment, Education, Debt, Other
- **Recurrence calendar**: for recurring bills, an explicit list of months it should fire

Bills can be added in batches. Add 5 bills in one transaction. The contract validates that the sum of all bill amounts (across the plan window) doesn't exceed your available balance.

### 3. Automated payments

You don't need to be online. You don't need to sign anything per-payment.

### 4. Manage your bills

Inside the dashboard for each plan, you can:

- Skip the next occurrence of a recurring bill (e.g. "Don't pay Netflix this month")
- Delete a bill permanently. This removes all future occurrences and frees up the allocation
- Manually pay a bill that's currently due (if you want to pay early or avoid waiting on us)

There's a monthly adjustment limit: you can only add or cancel bills once per plan per month. This stops you from yanking bills out the moment you change your mind.

## What happens at the end of a plan?

When the plan duration elapses:

- Any remaining balance (un-allocated, or surplus from skipped/cancelled bills) becomes withdrawable.
- You can also end a plan yourself from the dashboard, but only after the duration has elapsed.

## Security guarantees

- Double-payment prevention: bills track their last paid date; can't be paid twice in a window
- Over-allocation guard: adding bills that would exceed the plan's available balance reverts

## Walkthrough

[Step-by-step: Create your first plan →](/how-to/create-plan)
