import type { LoktinSigner } from '@loktin/sdk';

declare const userAddress: string;
declare const wallet: LoktinSigner;
declare const integratorAddress: string;
declare const shopAddress: string;

// #region create
import { createLoktin } from '@loktin/sdk';

const loktin = createLoktin({
  network: 'testnet',
  publicKey: userAddress,
  signer: {
    signTransaction: (xdr, opts) => wallet.signTransaction(xdr, opts),
  },
});
// #endregion create

// #region modules
import { SpendSave } from '@loktin/sdk/spend-save';
import { TargetSavings } from '@loktin/sdk/target-savings';

const options = { integrator: integratorAddress, integratorFeeBps: 50 };
const targetSavings = new TargetSavings(loktin, options);
const spendSave = new SpendSave(loktin, options);
// #endregion modules

// #region first-goal
import { toBaseUnits } from '@loktin/sdk';

const goal = await targetSavings.createGoal({
  target: toBaseUnits('500'),
  deadline: new Date('2027-06-30T00:00:00Z'),
  cadenceSeconds: 7 * 24 * 60 * 60,
  depositSize: toBaseUnits('20'),
  rule: { kind: 'penalty', bps: 500 },
});
console.log('New goal id:', goal.result);
// #endregion first-goal

// #region first-spend
import { fromBaseUnits } from '@loktin/sdk';

await spendSave.enroll({
  skim: { percentBps: 500, roundUpUnit: toBaseUnits('1') },
  monthlyCap: toBaseUnits('100'),
  destination: { kind: 'goal', goalId: goal.result },
  withdrawalDay: 15,
});

const paid = await spendSave.payAndSave(shopAddress, toBaseUnits('12.50'));
const saved = paid.result.toBalance + paid.result.toGoal;
console.log('Saved', fromBaseUnits(saved), 'USDC');
// #endregion first-spend
