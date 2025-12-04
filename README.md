# openOracle Report Viewer

A web-based interface for viewing and interacting with openOracle reports on Base and Ethereum mainnet.

## Overview

openOracle is a decentralized oracle system that allows users to submit and dispute price reports for token pairs. This viewer provides:

- **Single Report View**: Search and view detailed information for any report ID
- **Overview Dashboard**: Browse the last 200 reports, or a range, with status and profitability indicators
- **My Reports**: Track reports you've submitted or disputed
- **Wrap/Unwrap ETH**: Convenient ETH <-> WETH conversion utility
- **Multi-Network Support**: Switch between Base and Ethereum mainnet

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

**External Libraries (loaded via CDN):**
- ethers.js v5.7.2
- IBM Plex Mono & Syne fonts (Google Fonts)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. No npm/yarn installation required - all dependencies are loaded via CDN.

## Running

Start the local development server:

```bash
python3 server2.py
```

Then open your browser to:
```
http://127.0.0.1:8080/index2.html
```

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
| Oracle | `0xdcaa5082564F395819dC2F215716Fe901a1d0A23` |
| Data Provider | `0x4d3F62062d714384178Eb41198BDaBC63F6DeaBD` |
| Batcher | `0x7D3BA4745894f438e9e2815A3121f808de574746` |
| WETH | `0x4200000000000000000000000000000000000006` |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

### Ethereum Mainnet

| Contract | Address |
|----------|---------|
| Oracle | `0xdcaa5082564F395819dC2F215716Fe901a1d0A23` |
| Data Provider | `0x5E79b04d8b7A99320e5DE2E9095D3deAc43679bc` |
| Batcher | `0x4e720AF297e740f2761278e99DbC5fD0999B4952` |
| WETH | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| USDC | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |

## License

MIT
