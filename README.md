# openOracle Report Viewer

A web-based interface for viewing and interacting with openOracle reports on Base, Ethereum, and OP Mainnet.

## Overview

openOracle is a decentralized oracle system that allows users to submit and dispute price reports for token pairs. This viewer provides:

- **Single Report View**: Search and view detailed information for any report ID
- **Overview Dashboard**: Browse the last 200 reports, or a range, with status and profitability indicators
- **My Reports**: Track reports you've submitted or disputed
- **Wrap/Unwrap ETH**: Convenient ETH <-> WETH conversion utility
- **Multi-Network Support**: Switch between Base, Ethereum, and OP Mainnet

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

### Base Mainnet

| Contract | Address |
|----------|---------|
| Oracle | [`0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752`](https://basescan.org/address/0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752) |
| Data Provider | [`0x4ccfb84f7EB35ee23c2e91f12e9CE4Ea2927d23C`](https://basescan.org/address/0x4ccfb84f7EB35ee23c2e91f12e9CE4Ea2927d23C) |
| Batcher | [`0x95420A44715AA90e4CAa76b8A04604B750Da67ed`](https://basescan.org/address/0x95420A44715AA90e4CAa76b8A04604B750Da67ed) |
| WETH | [`0x4200000000000000000000000000000000000006`](https://basescan.org/address/0x4200000000000000000000000000000000000006) |
| USDC | [`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913) |

### Ethereum Mainnet

| Contract | Address |
|----------|---------|
| Oracle | [`0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752`](https://etherscan.io/address/0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752) |
| Data Provider | [`0xebc117d55A9303C72E662d80b6b63B2514a68fd3`](https://etherscan.io/address/0xebc117d55A9303C72E662d80b6b63B2514a68fd3) |
| Batcher | [`0xCcFcBAbE2b43cDAE75493fb6EE66AECDdA859Eff`](https://etherscan.io/address/0xCcFcBAbE2b43cDAE75493fb6EE66AECDdA859Eff) |
| WETH | [`0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) |
| USDC | [`0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`](https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48) |

### OP Mainnet

| Contract | Address |
|----------|---------|
| Oracle | [`0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752`](https://optimistic.etherscan.io/address/0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752) |
| Data Provider | [`0xA5A6d54Cd934559D99A6aB53545AF47AeD9AD168`](https://optimistic.etherscan.io/address/0xA5A6d54Cd934559D99A6aB53545AF47AeD9AD168) |
| Batcher | [`0x4795F239ECdbc59bcD44fCB7EBEB333AA7b98687`](https://optimistic.etherscan.io/address/0x4795F239ECdbc59bcD44fCB7EBEB333AA7b98687) |
| WETH | [`0x4200000000000000000000000000000000000006`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |
| USDC | [`0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85`](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85) |

## License

MIT
