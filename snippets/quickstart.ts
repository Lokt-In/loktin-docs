import type { LoktinSigner } from '@loktin/sdk';

declare const userAddress: string;
declare const wallet: LoktinSigner;

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
