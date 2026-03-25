# FounderOS — AI Orchestrator on Shardeum

**FounderOS** is an AI-powered agentic system for founders that evaluates incoming sales leads and talent candidates, logs every AI decision immutably on the **Shardeum** blockchain, and auto-drafts outreach emails.

---

## How It Works

1. A founder pastes a lead inquiry or candidate resume into the web UI (`frontend/index.html`).
2. The app calls the **Gemini 2.5 Flash** API to classify the submission as **HOT / WARM / COLD** and generate a confidence score, deep analysis, and a draft email.
3. The result is written on-chain to the `DecisionLogger` smart contract deployed on the Shardeum Mezame testnet, creating a tamper-proof audit trail.
4. A pre-filled Gmail compose link is generated so the founder can send the outreach in one click.
5. The **Operational Analytics** panel tracks totals and estimated time saved across all sessions.

---

## Project Structure

```
├── contracts/
│   ├── DecisionLogger.sol   # Core contract — stores AI decisions on-chain
│   ├── ShardeumToken.sol    # Minimal ERC-20 token with mint/burn (example)
│   └── SimpleStorage.sol   # Basic key-value store (example / tutorial)
├── frontend/
│   └── index.html           # Single-page FounderOS app (no build step)
├── scripts/
│   ├── deploy.js            # Deploys DecisionLogger to Shardeum
│   └── interact.js          # CLI interactions with SimpleStorage & ShardeumToken
├── test/
│   └── SimpleStorage.test.js # Hardhat/Chai tests for SimpleStorage & ShardeumToken
├── hardhat.config.js
└── .env.example
```

---

## Smart Contracts

### DecisionLogger
The heart of the app. Every AI evaluation is written on-chain via `logDecision(category, reasoning, confidence, leadData)`. Each entry records the category (HOT/WARM/COLD), AI reasoning, confidence score (0–100), and a JSON snippet of lead metadata. Read entries back with `getDecision(id)` or get the count with `totalDecisions()`.

The contract is already deployed at **`0x114A6B37107878c9428999224B1aB37C1CB4e65E`** on the Shardeum Mezame testnet. If you redeploy, update `CONTRACT_ADDRESS` in `frontend/index.html`.

### ShardeumToken
A from-scratch ERC-20 implementation (no OpenZeppelin dependency) with owner-only `mint` and public `burn`. Deploy it with a name, symbol, and initial supply.

### SimpleStorage
A minimal owner-controlled uint256 store. Useful as a first contract to verify your environment is working. Includes ownership transfer and event emission.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or v20
- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/) browser extension
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini) — already baked into `index.html`; replace it with your own key for production use

---

## Step 1 — Add Shardeum Testnet to MetaMask

**Option A — Add automatically (easiest):**
Go to [https://docs.shardeum.org/docs/overview/endpoints](https://docs.shardeum.org/docs/overview/endpoints) and click **"Add to Wallet"** next to the testnet.

**Option B — Add manually:**
1. MetaMask → network dropdown → **"Add a custom network"**
2. Fill in these values and click **Save**:

| Field | Value |
|---|---|
| Network Name | `Shardeum EVM Testnet` |
| New RPC URL | `https://api-mezame.shardeum.org` |
| Chain ID | `8119` |
| Currency Symbol | `SHM` |
| Block Explorer URL | `https://explorer-mezame.shardeum.org` |

---

## Step 2 — Get Testnet SHM

1. Join the Shardeum Discord: [https://discord.com/invite/shardeum](https://discord.com/invite/shardeum)
2. Verify your account via the Shardeum emoji logo in the server.
3. Go to `#evm-faucet` and run:

```
/faucet [address: YOUR_METAMASK_WALLET_ADDRESS]
```

---

## Step 3 — Install & Configure

```bash
# Install dependencies
npm install

# Copy the environment file
cp .env.example .env
```

Open `.env` and set your deployer wallet's private key:

```
PRIVATE_KEY=your_private_key_here
```

> **How to export from MetaMask:** Account Details → **"Show private key"** → enter password → copy.
> **Never commit your `.env` file or share your private key.**

---

## Step 4 — Compile, Test & Deploy

```bash
# Compile all contracts
npm run compile

# Run the test suite
npm test

# Deploy DecisionLogger to Shardeum testnet
npm run deploy
```

The deploy script prints the new contract address and its explorer URL. If you deploy a fresh instance, paste the address into `frontend/index.html` at:

```js
const CONTRACT_ADDRESS = "0x...your_new_address...";
```

To deploy to mainnet instead:

```bash
npm run deploy:mainnet
```

---

## Step 5 — Run the Frontend

Open `frontend/index.html` directly in a browser — no build step or server required.

1. Click **Connect Wallet** and approve the MetaMask prompt.
2. Select a mode — **Sales Lead** or **Talent Scout**.
3. Fill in the contact name, email, and paste the inquiry or resume text.
4. Click **Execute Agentic Loop**.
   - Gemini analyses the content and returns a category + draft email.
   - The decision is broadcast to the `DecisionLogger` contract on Shardeum.
   - The **Send** button opens a pre-filled Gmail compose window.
5. All verified decisions appear in the **Shardeum Audit Ledger** panel and the analytics tiles update in real time.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run compile` | Compile Solidity contracts |
| `npm test` | Run Hardhat/Chai test suite |
| `npm run deploy` | Deploy to Shardeum testnet |
| `npm run deploy:mainnet` | Deploy to Shardeum mainnet |
| `npm run interact` | Run the CLI interaction script (testnet) |
| `npm run console` | Open Hardhat console on testnet |

---

## Useful Links

| Resource | Link |
|---|---|
| Shardeum Docs | https://docs.shardeum.org |
| Testnet Explorer | https://explorer-mezame.shardeum.org |
| Faucet (Discord) | https://discord.com/channels/933959587462254612/1423751569454661632 |
| Shardeum Discord | https://discord.com/invite/shardeum |
| Google AI Studio | https://aistudio.google.com |
| Hardhat Docs | https://hardhat.org/docs |
