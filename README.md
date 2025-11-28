# openOracle Report Viewer

A web-based interface for viewing and interacting with openOracle reports on Base.

## Overview

openOracle is a decentralized oracle system on Base that allows users to submit and dispute price reports for token pairs. This viewer provides:

- **Single Report View**: Search and view detailed information for any report ID
- **Overview Dashboard**: Browse the last 200 reports, or a range, with status and profitability indicators
- **Wrap/Unwrap ETH**: Convenient ETH <-> WETH conversion utility

## Features

- Live ETH price feed via Coinbase WebSocket
- Live gas price updates
- Real-time countdown timer for pending settlements
- Automatic profit/loss calculations for dispute opportunities
- MetaMask wallet integration for submitting reports
- Multi-RPC racing for fastest response times

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
cd swapperTesting
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
4. Red boxes = dispute possible (show immediate profit opportunity)
5. Click any box to view full details

### Wrap ETH
1. Click the "Wrap ETH" tab
2. Connect your wallet
3. Enter amount and click Wrap or Unwrap

## Contract Addresses (Base Mainnet)

| Contract | Address |
|----------|---------|
| Oracle | `0xdcaa5082564F395819dC2F215716Fe901a1d0A23` |
| Data Provider | `0xa7FD2D2d35dF86437B26dCb41111F59787bD4192` |
| Batcher | `0x8FAF4b5E99fF6804BD259b2C44629A537a74a3ba` |
| WETH | `0x4200000000000000000000000000000000000006` |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

## License

MIT
