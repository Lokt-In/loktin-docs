import type { IntegratorOptions, LoktinSigner } from '@loktin/sdk';

declare const integratorAddress: string;
declare const integratorWallet: LoktinSigner;
declare const options: IntegratorOptions;

// #region claim-fees
import { createLoktin, fromBaseUnits } from '@loktin/sdk';
import { SpendSave } from '@loktin/sdk/spend-save';
import { TargetSavings } from '@loktin/sdk/target-savings';

// The integrator's own SDK instance, with its address and its wallet.
const integratorLoktin = createLoktin({
  network: 'testnet',
  publicKey: integratorAddress,
  signer: {
    signTransaction: (xdr, opts) => integratorWallet.signTransaction(xdr, opts),
  },
});

// Fees accrue separately in each contract.
for (const savings of [
  new TargetSavings(integratorLoktin, options),
  new SpendSave(integratorLoktin, options),
]) {
  const owed = await savings.accruedFees();
  if (owed > 0n) {
    const claimed = await savings.claimFees();
    console.log('Claimed', fromBaseUnits(claimed.result), 'USDC');
  }
}
// #endregion claim-fees
