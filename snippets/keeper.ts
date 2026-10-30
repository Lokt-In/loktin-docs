import type { LoktinSigner } from '@loktin/sdk';

declare const keeperAddress: string;
declare const keeperWallet: LoktinSigner;
declare const integratorAddress: string;

// #region run-pass
import { createLoktin, TESTNET } from '@loktin/sdk';
import { feeCeilingSigner, runPass } from '@loktin/sdk/keeper';

// The keeper's own SDK instance, with its address and its wallet.
const keeperLoktin = createLoktin({
  network: 'testnet',
  publicKey: keeperAddress,
  signer: {
    // Refuse any transaction whose fee is above 1 XLM.
    signTransaction: feeCeilingSigner(
      (xdr, opts) => keeperWallet.signTransaction(xdr, opts),
      10_000_000n,
      TESTNET.passphrase,
    ),
  },
});

const pass = await runPass(keeperLoktin, { integrators: [integratorAddress] });
for (const result of pass.results) {
  console.log(result.goalId, result.action);
}
if (pass.failure !== undefined) {
  console.log('The pass stopped:', pass.failure.code, pass.failure.message);
}
// #endregion run-pass
