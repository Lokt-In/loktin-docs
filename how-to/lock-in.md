# Lock In USDC

A walkthrough for creating a fixed-term lock.

## 1. Head over to "Locked In"

Dashboard → sidebar → **Locked In**.

## 2. Click "+ New Lock"

Fill in:

- USDC Amount to Lock
- Lock Duration: pick a tier from the APY table

A summary appears showing:

- Principal locked
- Duration
- APY (from the selected tier)
- Projected yield
- Expected amount at unlock

## 3. Click "Lock USDC"

You'll be prompted to approve the Locked Vault contract first (one-time per amount). Sign the approve transaction in your wallet.

After approval confirms, the lock transaction fires automatically. If successful, the contract debits you and pulld your USDC into the vault and returns a lock ID with the details of locked amount.

That's it.

If you head back to your dashboard, you can see:

- A **countdown** to the unlock date
- A **progress bar** of the lock period
- The **projected yield**

Note that there is no early withdrawal for this savings option.

## 5. Unlock at maturity

Once the end date reaches, the **Withdraw** button activates. Click on it, sign the transaction in your wallet, and your principal + accrued yield is sent to your wallet in under 5 minutes.