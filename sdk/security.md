---
description: "Roles, pause, upgrades, fees and audit status of the Loktin SDK's contracts."
---

# Security and trust

This page says who can do what on the Loktin contracts, and what no one can do.

No one but the user moves the user's money. Deposits, payments and withdrawals need the user's signature, and scheduled deposits are collected only within the allowance the user approved.

## Roles on testnet

On testnet each role is held by a separate key that the project owner controls. The addresses are on the [Testnet contracts](/sdk/testnet#role-addresses) page.

## What each role can do

| Role      | Can                                                                                 |
| --------- | ----------------------------------------------------------------------------------- |
| Admin     | Grant and revoke roles, and nothing else.                                           |
| Fee-admin | Set the Loktin fee rate for future goals, within the cap, and the address Loktin fees are paid to. It holds no other power. |
| Pauser    | Pause and unpause.                                                                  |
| Upgrader  | Replace the contract code.                                                          |

No role can move, redirect or freeze user funds.

Anyone may collect a due goal, and only the due amount moves, into the owner's own goal. See the [keeper guide](/sdk/keeper).

## Pause

Pausing blocks creating goals, enrolling, deposits, scheduled collections, skims and pay-and-save.

It never blocks withdrawals or reads. Withdrawals still follow each goal's or enrolment's rules.

## Upgrades

The upgrader role can replace the contract code. The upgrader is the one remaining trusted power over the contracts.

Each upgrade needs:

- a decision note;
- a storage-compatibility test against the previous version;
- a new version in the contract metadata.

Before any mainnet deployment, upgrades will also need a multisig and a public waiting period.

## Fees and penalties

Each is capped in the contracts:

| Charge                                   | Cap                                  | Received by             |
| ---------------------------------------- | ------------------------------------ | ----------------------- |
| Loktin fee                               | 0% today, and never more than 1%     | Loktin's fee recipient  |
| Integrator fee                           | At most 1%                           | The integrator          |
| Early-withdrawal penalty on a Target Savings goal | At most 10%                 | The integrator          |

Each goal and enrolment keeps the fee rates in force when it was created. A new Loktin rate applies only to goals and enrolments created afterwards.

## Claiming fees

A withdrawal pays the user their share. The penalty and fees accrue to the integrator and Loktin's fee recipient, who each claim them, so no one else can block a user's withdrawal.

The integrator claims with `claimFees`, and `accruedFees` shows what is owed. See [`claimFees`](/sdk/api/target-savings/classes/TargetSavings#claimfees) and [`accruedFees`](/sdk/api/target-savings/classes/TargetSavings#accruedfees). Fees accrue separately in each contract.

Claiming needs the integrator's own key: create a separate SDK instance with the integrator's address as `publicKey` and its wallet as the signer. The integrator's account also needs a trustline for the token at the time of the claim, or the payment fails and the fees stay where they are. Unclaimed fees never expire.

<<< @/snippets/security.ts#claim-fees

## Rounding

Every fee and penalty calculation rounds any fraction down, in the user's favour.

## There is no yield

There is no yield. Savings are held as they are deposited. The contracts' yield slot is switched off, and the constructor refuses any yield source.

## Libraries and audit status

The contracts use OpenZeppelin stellar-contracts 0.8.0, which has been audited. The Loktin contracts themselves have not been audited.

## Testnet only

The contracts have no mainnet deployment, and the SDK refuses the public network.
