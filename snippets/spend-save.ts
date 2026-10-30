import type { SpendSave } from '@loktin/sdk/spend-save';
import type { CreatedGoal } from '@loktin/sdk/target-savings';

declare const spendSave: SpendSave;
declare const goal: CreatedGoal;
declare const shopAddress: string;

// #region enroll
import { toBaseUnits } from '@loktin/sdk';

await spendSave.enroll({
  skim: { percentBps: 500, roundUpUnit: toBaseUnits('1') },
  monthlyCap: toBaseUnits('100'),
  destination: { kind: 'goal', goalId: goal.result },
  withdrawalDay: 15,
});
// #endregion enroll

// #region pay
import { fromBaseUnits } from '@loktin/sdk';

const paid = await spendSave.payAndSave(shopAddress, toBaseUnits('12.50'));
const saved = paid.result.toBalance + paid.result.toGoal;
console.log('Saved', fromBaseUnits(saved), 'USDC');
// #endregion pay

// #region window
import { windowInTimeZone } from '@loktin/sdk';

const next = windowInTimeZone(await spendSave.nextWindow());
console.log(`You can withdraw from ${next.start} until ${next.end}.`);
// #endregion window

// #region settings
await spendSave.updateSettings({
  skim: { percentBps: 300 },
  monthlyCap: toBaseUnits('50'),
  destination: { kind: 'balance' },
  withdrawalDay: 20,
});
// #endregion settings

// #region withdraw
const split = await spendSave.previewWithdraw(toBaseUnits('25'));
console.log('The user receives', fromBaseUnits(split.toUser), 'USDC');

const withdrawal = await spendSave.withdraw(toBaseUnits('25'));
console.log('Paid', fromBaseUnits(withdrawal.result.toUser), 'USDC');
// #endregion withdraw
