# openOracle Report Viewer

A web-based interface for viewing and interacting with openOracle reports on OP Mainnet.

## Overview

openOracle is a decentralized oracle system that allows users to submit and dispute price reports for token pairs. This viewer provides:

- **OP Grant Rewards**: Earn OP tokens by starting games and submitting price reports
- **Single Report View**: Search and view detailed information for any report ID
- **Overview Dashboard**: Browse the last 200 reports, or a range, with status and profitability indicators
- **My Reports**: Track reports you've submitted or disputed
- **Wrap/Unwrap ETH**: Convenient ETH <-> WETH conversion utility

## Features

- Live ETH price feed via Coinbase WebSocket
- Live gas price updates (updates immediately on network switch)
- Real-time countdown timer for pending settlements
- Automatic profit/loss calculations for dispute opportunities
- Breakeven volatility calculations with settlement time context
- Smart swap recommendation based on your price input
- MetaMask wallet integration for submitting reports, disputes, and settlements
- Multi-RPC racing for fastest response times
- Safe transaction patterns with stateHash and block bound validation

## Dependencies

**Browser Requirements:**
- Modern browser (Chrome, Firefox, Safari, Edge)
- MetaMask extension installed

**Server Requirements:**
- Python 3.6+

## Running Modes

There are three ways to run the viewer, depending on your security preferences:

### Mode 1: CDN (Default)

Loads ethers.js from jsdelivr CDN and fonts from Google Fonts. Easiest setup.

```bash
python3 server2.py
# Open: http://127.0.0.1:8080/index2.html
```

**External calls:** jsdelivr.net (ethers.js), fonts.googleapis.com, fonts.gstatic.com

---

### Mode 2: Local (No External Calls)

Uses bundled `ethers-5.7.2.min.js` and system fonts. Zero external network requests.

```bash
python3 server2.py
# Open: http://127.0.0.1:8080/index-local.html
```

**External calls:** None (fully local)

The `ethers-5.7.2.min.js` file is included in the repo. Verify it matches the official release:
```bash
shasum -a 256 ethers-5.7.2.min.js
# Expected: a66293a6a2bb4dee061a68612be0be3c5c0ab7e4068ab8d98a4a357baf664c73
```

---

### Mode 3: NPM Install (Paranoia Mode)

Install and verify the ethers.js dependency yourself via npm.

```bash
# Install ethers from npm and copy to local
npm run setup

# Start server
python3 server2.py
# Open: http://127.0.0.1:8080/index-local.html
```

This lets you:
- Verify the ethers package source yourself
- Use `npm audit` to check for vulnerabilities
- Pin to exact versions you trust

**External calls:** None after setup (npm only during install)

## Usage

### Single Report View
1. Enter a report ID in the search box
2. View report parameters, current status, and estimated PnL
3. For pending reports, a live countdown shows time until settlement
4. Click "Report" (for open reports) or "Dispute" (for active reports) to interact

### Overview Dashboard
1. Click the "Overview" tab
2. Click "Recent" to load the last 200 reports
3. Green boxes = awaiting initial report (show reporter reward)
4. Red boxes = disputable (show immediate profit opportunity)
5. Yellow boxes = settleable (ready to be settled for reward)
6. Click any box to view full details

### Wrap ETH
1. Click the "Wrap ETH" tab
2. Connect your wallet
3. Enter amount and click Wrap or Unwrap

## Contract Addresses

### OP Mainnet

| Contract | Address |
|----------|---------|
| Oracle | [`0xf3CCE3274c32f1F344Ba48336D5EFF34dc6E145f`](https://optimistic.etherscan.io/address/0xf3CCE3274c32f1F344Ba48336D5EFF34dc6E145f) |
| Data Provider | [`0x4f9041CCAea126119A1fe62F40A24e7556f1357b`](https://optimistic.etherscan.io/address/0x4f9041CCAea126119A1fe62F40A24e7556f1357b) |
| Batcher | [`0x6D5dCF8570572e106eF1602ef2152BC363dAeC8b`](https://optimistic.etherscan.io/address/0x6D5dCF8570572e106eF1602ef2152BC363dAeC8b) |
| Bounty | [`0xF07c087414c2285f25eAde0FA6e2Dde0bE8Ce98c`](https://optimistic.etherscan.io/address/0xF07c087414c2285f25eAde0FA6e2Dde0bE8Ce98c) |
| WETH | [`0x4200000000000000000000000000000000000006`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |
| USDC | [`0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85`](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85) |
| OP | [`0x4200000000000000000000000000000000000042`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042) |

## License

MIT
