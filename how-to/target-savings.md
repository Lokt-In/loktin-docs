# Set Up Target Savings

A walkthrough for creating a savings goal vault with automatic periodic deposits.

## 1. Open Target Savings

Dashboard → sidebar → **Target Savings**.

## 2. Click "+ New Goal"

Fill the form:

- **Goal Name** :e.g. "Trip to Stellar Meridian"
- **Target Amount (USDC)**: what you're saving toward
- **End Date** — when the goal closes
- **Deposit Frequency**: Weekly, Biweekly, or Monthly
- **Amount per period**: USDC pulled each cycle

The form shows a live projection: how many periods, total projected deposits, and whether you'll hit the target. If projected total is short, the UI shows the shortfall.

## 3. Click "Create Goal →"

You'll be prompted to **approve** the Target Savings contract first. This is a separate step:

1. The `<UsdcAllowance>` component reads your current allowance
2. If insufficient, shows an "Approve N USDC →" button
3. Click it, sign the approve transaction in your wallet
4. After confirmation, the goal creation transaction executes automatically

The approval grants the contract permission to debit the amount specified per period from your wallet, within the goal's lifetime, until you reach your target amount. you only sign this once.

The only thing you need to do after creating a goal is keep your wallet funded. We perform periodic checks to see when your goal's next deposit is due. Then automatically deposit the specified amount into your savings vault.

## 5. Manual top-ups

Alternatively, you can deposit into your saving's target at any time. Click **+ Top Up** on any active goal card. Enter the USDC amount, sign the transaction. 

This is useful when:

- A windfall lets you accelerate the goal
- You missed a period and want to make it up
- You want to test the flow without waiting a week

Automated deposits from your wallet stop as soon as your goal reaches it's target.

## 6. Withdraw

**At or after the end date:**

1. Click **Withdraw** on the goal card
2. Sign the transaction in your wallet
3. You will receive the amount in your wallet within 5 minutes

**Before the end date:**

1. Click **Early Withdraw (-1%)**
2. Confirm the prompt; that you understand 1% will be forfeited
3. Sign the transaction in your wallet.
4. You will receive the amount in your wallet within 5 minutes

## Missed periods

If your wallet doesn't have enough USDC when we try to debit, the contract logs a missed period. The end date does **not** shift, you just have less saved than projected.

You can recover by manually depositing extra (via Top Up).
