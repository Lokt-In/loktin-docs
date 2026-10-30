import type { TargetSavings } from '@loktin/sdk/target-savings';

declare const targetSavings: TargetSavings;

// #region create-goal
import { toBaseUnits } from '@loktin/sdk';

const goal = await targetSavings.createGoal({
  target: toBaseUnits('500'),
  deadline: new Date('2027-06-30T00:00:00Z'),
  cadenceSeconds: 7 * 24 * 60 * 60,
  depositSize: toBaseUnits('20'),
  rule: { kind: 'penalty', bps: 500 },
});
console.log('New goal id:', goal.result);
if (goal.allowance?.renewBy !== undefined) {
  console.log('Renew the allowance by', goal.allowance.renewBy);
}

// Later, before `renewBy`:
await targetSavings.renewAllowance(goal.result);
// #endregion create-goal

// #region deposit
await targetSavings.deposit(goal.result, toBaseUnits('5'));
// #endregion deposit

// #region breakdown
import { fromBaseUnits } from '@loktin/sdk';
import { creationBreakdown } from '@loktin/sdk/target-savings';

const breakdown = creationBreakdown({
  target: toBaseUnits('500'),
  rule: { kind: 'penalty', bps: 500 },
  loktinFeeBps: await targetSavings.loktinFeeBps(),
  integratorFeeBps: targetSavings.integratorFeeBps,
});
console.log('An early withdrawal pays', fromBaseUnits(breakdown.toUser), 'USDC');
// #endregion breakdown

// #region status
const status = await targetSavings.allowanceStatus(goal.result);
if (status.short) {
  await targetSavings.renewAllowance(goal.result);
}
// #endregion status

// #region find-goals
const goals = await targetSavings.userGoals();
for (const open of goals) {
  console.log(open.id, fromBaseUnits(open.principal), 'USDC');
}
// #endregion find-goals

// #region withdraw
const split = await targetSavings.previewWithdraw(goal.result);
console.log('The user receives', fromBaseUnits(split.toUser), 'USDC');

const withdrawal = await targetSavings.withdraw(goal.result);
console.log('Paid', fromBaseUnits(withdrawal.result.toUser), 'USDC');
// #endregion withdraw

// #region errors
import { ContractError, LoktinError, PendingError } from '@loktin/sdk';

try {
  await targetSavings.deposit(goal.result, toBaseUnits('5'));
} catch (error) {
  if (error instanceof ContractError) {
    console.log(error.errorName, error.description);
  } else if (error instanceof PendingError) {
    // The outcome is not known yet. Look it up by hash; do not send again.
    console.log(error.hash, error.validUntil);
  } else if (error instanceof LoktinError) {
    console.log(error.code, error.message);
  } else {
    throw error;
  }
}
// #endregion errors
