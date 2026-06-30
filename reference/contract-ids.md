# Contract IDs

All Loktin contracts on **Stellar testnet** as of the current deploy.

> Deployed against Circle-issued testnet USDC
> (`CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA`) with the typed-event
> contracts. Admin/keeper: `GBJV27ANP6AC4OSZTB4IMUAWAFS5EGF72AGF5PH3QDHOF27WD6VL5XMX`.
> If you redeploy, update these rows, `environments.toml`, and regenerate the
> `packages/*` bindings. The USDC SAC row is stable (Circle owns it).

| Contract            | ID                                                         | Explorer                                                                                                                    |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Plans (plans)**   | `CAWJPGWXAYJ6Y6TIS4C6SIOHZOHPRQCJIVXDUVZBVII6RPWMKIUTRKEE` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CAWJPGWXAYJ6Y6TIS4C6SIOHZOHPRQCJIVXDUVZBVII6RPWMKIUTRKEE) |
| **Target Savings**  | `CBLZMVSR5NHSUN5A3J5Z433ZVR3VW7EDLX6T2PDVAVKVYDBIXFDRUKBB` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CBLZMVSR5NHSUN5A3J5Z433ZVR3VW7EDLX6T2PDVAVKVYDBIXFDRUKBB) |
| **Locked In**       | `CBZNRI5PGBV4AQG6PLKCF6XEKLECKHDAXYELLOQDG26OG2UML74GVVEU` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CBZNRI5PGBV4AQG6PLKCF6XEKLECKHDAXYELLOQDG26OG2UML74GVVEU) |
| **Spend & Save**    | `CBFAC2IESOKQX57U2ERRSEIJJL5EIOFKPSVVLZAYPP2YFBSSA57O7UXD` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CBFAC2IESOKQX57U2ERRSEIJJL5EIOFKPSVVLZAYPP2YFBSSA57O7UXD) |
| **Mock Blend pool** | `CBYJA4C3T64FICRPDL2UBXWGJDAIAZVO27NN3K5RRTQCK3ASAPME4ZYG` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CBYJA4C3T64FICRPDL2UBXWGJDAIAZVO27NN3K5RRTQCK3ASAPME4ZYG) |
| **USDC (Circle)**   | `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA` | [stellar.expert](https://stellar.expert/explorer/testnet/contract/CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA) |

**Network:** `Test SDF Network ; September 2015`
**RPC:** `https://soroban-testnet.stellar.org`
**Horizon:** `https://horizon-testnet.stellar.org`

## USDC token details

- **Issuer:** `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` (Circle, testnet)
- **Asset code:** `USDC`
- **Decimals:** 7 (canonical Stellar USDC convention; `10_000_000` stroops = 1 USDC)
- **SAC:** `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA`

To get test USDC: add a `USDC` trustline to the Circle issuer above, then request
funds from the [Circle testnet faucet](https://faucet.circle.com) (select Stellar
testnet). No minting by the Loktin team is required.

## Mock Blend pool (testnet only)

A simplified stand-in for a Blend lending pool, deployed so we can demo real yield
on testnet without depending on Blend's mainnet pools. **Not for mainnet.**

- **Interface:** `supply(from, amount)`, `withdraw(from, amount)`, `get_position(supplier)`,
  `get_principal(supplier)`, plus admin `set_apy(bps)` / `fund_reserve(amount)` / `reserve_balance()`.
- **Yield:** fixed **10% APY**, linear (no compounding), accrued by wall-clock time and
  settled on each interaction. Yield is paid from an admin-funded USDC reserve.
- **Wiring status:** **live.** `locked_in` and `target_savings` are pointed at this pool
  (via `set_pool`) and call it through their `deposit_to_blend` / `withdraw_from_blend` /
  `blend_position` functions. Locked In pays principal + yield at unlock; Target Savings
  accrues per-goal interest (`get_goal_yield`). The real-Blend adapter will later replace
  the pool calls inside those bodies, so the user-facing API won't change.

## Calling contracts directly

You can interact with any of these contracts without the Loktin frontend.

### Via stellar CLI

```bash
# Read-only: get your goal
stellar contract invoke \
  --id CBLZMVSR5NHSUN5A3J5Z433ZVR3VW7EDLX6T2PDVAVKVYDBIXFDRUKBB \
  --network testnet \
  --source-account YOUR_ACCOUNT \
  -- get_user_goals --user YOUR_ADDRESS

# State-changing: lock 100 USDC for 6 months
stellar contract invoke \
  --id CBZNRI5PGBV4AQG6PLKCF6XEKLECKHDAXYELLOQDG26OG2UML74GVVEU \
  --network testnet \
  --source-account YOUR_ACCOUNT \
  --send=yes \
  -- lock --user YOUR_ADDRESS --amount 1000000000 --duration_months 6
```

### Via TypeScript bindings

The repo's `packages/` folder has auto-generated TypeScript bindings for each contract:

- `packages/plans`
- `packages/target_savings`
- `packages/locked_in`
- `packages/spend_save`

```typescript
import * as Plans from "plans";

const client = new Plans.Client({
  ...Plans.networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org",
  publicKey: address,
  signTransaction, // from your wallet
  signAuthEntry, // from your wallet
});

const tx = await client.create_cycle({
  user: address,
  duration_months: 3,
  amount: BigInt(500 * 10_000_000),
});
const result = await tx.signAndSend();
```
