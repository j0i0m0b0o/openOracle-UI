// Contract addresses on Base
const DATA_PROVIDER_ADDRESS = '0xB1a55abBc8537e96e59119EAeC105b5AA9A101E0'; // V3 with protocolFeeRecipient
const ORACLE_ADDRESS = '0xdcaa5082564F395819dC2F215716Fe901a1d0A23';
const BATCHER_ADDRESS = '0xFe5c89448E741D1542afFBf34b9Cf2a3789B82F9'; // Safe batcher
const WETH_ADDRESS = '0x4200000000000000000000000000000000000006';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const BASE_CHAIN_ID = '0x2105'; // 8453

// Constants
const PRICE_PRECISION = ethers.BigNumber.from('1000000000000000000'); // 1e18
const PERCENTAGE_PRECISION = ethers.BigNumber.from('10000000'); // 1e7
const MULTIPLIER_PRECISION = 100;
const MAX_CALLBACK_GAS = 2000000;
const MAX_CALLBACK_GAS_REPORT = 10000000; // 10M - don't allow reporting/disputing above this
const MAX_SETTLEMENT_TIME = 86400; // 1 day in seconds
const MAX_SETTLEMENT_BLOCKS = 43200; // ~1 day in blocks

// Data Provider ABI (getData function - single and range)
const DATA_PROVIDER_ABI = [
    {
        "inputs": [{"name": "reportId", "type": "uint256"}],
        "name": "getData",
        "outputs": [{
            "components": [
                {"name": "reportId", "type": "uint256"},
                {"name": "exactToken1Report", "type": "uint256"},
                {"name": "escalationHalt", "type": "uint256"},
                {"name": "fee", "type": "uint256"},
                {"name": "settlerReward", "type": "uint256"},
                {"name": "token1", "type": "address"},
                {"name": "settlementTime", "type": "uint48"},
                {"name": "token2", "type": "address"},
                {"name": "timeType", "type": "bool"},
                {"name": "feePercentage", "type": "uint24"},
                {"name": "protocolFee", "type": "uint24"},
                {"name": "multiplier", "type": "uint16"},
                {"name": "disputeDelay", "type": "uint24"},
                {"name": "currentAmount1", "type": "uint256"},
                {"name": "currentAmount2", "type": "uint256"},
                {"name": "price", "type": "uint256"},
                {"name": "currentReporter", "type": "address"},
                {"name": "reportTimestamp", "type": "uint48"},
                {"name": "settlementTimestamp", "type": "uint48"},
                {"name": "initialReporter", "type": "address"},
                {"name": "lastReportOppoTime", "type": "uint48"},
                {"name": "disputeOccurred", "type": "bool"},
                {"name": "isDistributed", "type": "bool"},
                {"name": "stateHash", "type": "bytes32"},
                {"name": "callbackContract", "type": "address"},
                {"name": "numReports", "type": "uint32"},
                {"name": "callbackGasLimit", "type": "uint32"},
                {"name": "callbackSelector", "type": "bytes4"},
                {"name": "trackDisputes", "type": "bool"},
                {"name": "keepFee", "type": "bool"},
                {"name": "protocolFeeRecipient", "type": "address"}
            ],
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "startId", "type": "uint256"}, {"name": "endId", "type": "uint256"}],
        "name": "getData",
        "outputs": [{
            "components": [
                {"name": "reportId", "type": "uint256"},
                {"name": "exactToken1Report", "type": "uint256"},
                {"name": "escalationHalt", "type": "uint256"},
                {"name": "fee", "type": "uint256"},
                {"name": "settlerReward", "type": "uint256"},
                {"name": "token1", "type": "address"},
                {"name": "settlementTime", "type": "uint48"},
                {"name": "token2", "type": "address"},
                {"name": "timeType", "type": "bool"},
                {"name": "feePercentage", "type": "uint24"},
                {"name": "protocolFee", "type": "uint24"},
                {"name": "multiplier", "type": "uint16"},
                {"name": "disputeDelay", "type": "uint24"},
                {"name": "currentAmount1", "type": "uint256"},
                {"name": "currentAmount2", "type": "uint256"},
                {"name": "price", "type": "uint256"},
                {"name": "currentReporter", "type": "address"},
                {"name": "reportTimestamp", "type": "uint48"},
                {"name": "settlementTimestamp", "type": "uint48"},
                {"name": "initialReporter", "type": "address"},
                {"name": "lastReportOppoTime", "type": "uint48"},
                {"name": "disputeOccurred", "type": "bool"},
                {"name": "isDistributed", "type": "bool"},
                {"name": "stateHash", "type": "bytes32"},
                {"name": "callbackContract", "type": "address"},
                {"name": "numReports", "type": "uint32"},
                {"name": "callbackGasLimit", "type": "uint32"},
                {"name": "callbackSelector", "type": "bytes4"},
                {"name": "trackDisputes", "type": "bool"},
                {"name": "keepFee", "type": "bool"},
                {"name": "protocolFeeRecipient", "type": "address"}
            ],
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

const ERC20_ABI = [
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Oracle ABI for events and state
const ORACLE_ABI = [
    "function nextReportId() view returns (uint256)",
    "function extraData(uint256 reportId) view returns (bytes32 stateHash, address callbackContract, uint32 numReports, uint32 callbackGasLimit, bytes4 callbackSelector, address protocolFeeRecipient, bool trackDisputes, bool keepFee)",
    "function disputeAndSwap(uint256 reportId, address tokenToSwap, uint256 newAmount1, uint256 newAmount2, uint256 amt2Expected, bytes32 stateHash) external",
    "event InitialReportSubmitted(uint256 indexed reportId, address reporter, uint256 amount1, uint256 amount2, address indexed token1Address, address indexed token2Address, uint256 swapFee, uint256 protocolFee, uint256 settlementTime, uint256 disputeDelay, uint256 escalationHalt, bool timeType, address callbackContract, bytes4 callbackSelector, bool trackDisputes, uint256 callbackGasLimit, bytes32 stateHash, uint256 blockTimestamp)",
    "event ReportDisputed(uint256 indexed reportId, address disputer, uint256 newAmount1, uint256 newAmount2, address indexed token1Address, address indexed token2Address, uint256 swapFee, uint256 protocolFee, uint256 settlementTime, uint256 disputeDelay, uint256 escalationHalt, bool timeType, address callbackContract, bytes4 callbackSelector, bool trackDisputes, uint256 callbackGasLimit, bytes32 stateHash, uint256 blockTimestamp)",
    "event ReportSettled(uint256 indexed reportId, uint256 price, uint256 settlementTimestamp, uint256 blockTimestamp)"
];

// oracleParams struct for safe batcher validation
const ORACLE_PARAMS_TYPE = [
    {"name": "exactToken1Report", "type": "uint256"},
    {"name": "escalationHalt", "type": "uint256"},
    {"name": "fee", "type": "uint256"},
    {"name": "settlerReward", "type": "uint256"},
    {"name": "token1", "type": "address"},
    {"name": "settlementTime", "type": "uint48"},
    {"name": "token2", "type": "address"},
    {"name": "timeType", "type": "bool"},
    {"name": "feePercentage", "type": "uint24"},
    {"name": "protocolFee", "type": "uint24"},
    {"name": "multiplier", "type": "uint16"},
    {"name": "disputeDelay", "type": "uint24"},
    {"name": "currentAmount1", "type": "uint256"},
    {"name": "currentAmount2", "type": "uint256"},
    {"name": "callbackGasLimit", "type": "uint32"},
    {"name": "protocolFeeRecipient", "type": "address"},
    {"name": "keepFee", "type": "bool"}
];

const BATCHER_ABI = [
    {
        "inputs": [
            {
                "components": [
                    {"name": "reportId", "type": "uint256"},
                    {"name": "amount1", "type": "uint256"},
                    {"name": "amount2", "type": "uint256"},
                    {"name": "stateHash", "type": "bytes32"}
                ],
                "name": "reports",
                "type": "tuple[]"
            },
            {"name": "batchAmount1", "type": "uint256"},
            {"name": "batchAmount2", "type": "uint256"}
        ],
        "name": "submitInitialReports",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {"name": "reportId", "type": "uint256"},
                    {"name": "amount1", "type": "uint256"},
                    {"name": "amount2", "type": "uint256"},
                    {"name": "stateHash", "type": "bytes32"}
                ],
                "name": "reports",
                "type": "tuple[]"
            },
            {
                "components": ORACLE_PARAMS_TYPE,
                "name": "p",
                "type": "tuple"
            },
            {"name": "batchAmount1", "type": "uint256"},
            {"name": "batchAmount2", "type": "uint256"},
            {"name": "timestamp", "type": "uint256"},
            {"name": "blockNumber", "type": "uint256"},
            {"name": "timestampBound", "type": "uint256"},
            {"name": "blockNumberBound", "type": "uint256"}
        ],
        "name": "submitInitialReportSafe",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {"name": "reportId", "type": "uint256"},
                    {"name": "tokenToSwap", "type": "address"},
                    {"name": "newAmount1", "type": "uint256"},
                    {"name": "newAmount2", "type": "uint256"},
                    {"name": "amt2Expected", "type": "uint256"},
                    {"name": "stateHash", "type": "bytes32"}
                ],
                "name": "disputes",
                "type": "tuple[]"
            },
            {"name": "batchAmount1", "type": "uint256"},
            {"name": "batchAmount2", "type": "uint256"}
        ],
        "name": "disputeReports",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {"name": "reportId", "type": "uint256"},
                    {"name": "tokenToSwap", "type": "address"},
                    {"name": "newAmount1", "type": "uint256"},
                    {"name": "newAmount2", "type": "uint256"},
                    {"name": "amt2Expected", "type": "uint256"},
                    {"name": "stateHash", "type": "bytes32"}
                ],
                "name": "disputes",
                "type": "tuple[]"
            },
            {
                "components": ORACLE_PARAMS_TYPE,
                "name": "p",
                "type": "tuple"
            },
            {"name": "batchAmount1", "type": "uint256"},
            {"name": "batchAmount2", "type": "uint256"},
            {"name": "timestamp", "type": "uint256"},
            {"name": "blockNumber", "type": "uint256"},
            {"name": "timestampBound", "type": "uint256"},
            {"name": "blockNumberBound", "type": "uint256"}
        ],
        "name": "disputeReportSafe",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// RPC endpoints for racing
const RPC_ENDPOINTS = [
    'https://mainnet.base.org',
    'https://base.drpc.org',
    'https://base-rpc.publicnode.com',
    'https://base.meowrpc.com',
    'https://base.gateway.tenderly.co'
];

// Global state
let provider = null;
let providers = [];
let currentGasPrice = null;
let ethPrice = null;
let signer = null;
let userAddress = null;
let currentReport = null; // Store current report for actions
let currentReportId = null; // Track which report we're listening to
let oracleContract = null; // Oracle contract instance for events
let eventListeners = []; // Track active event listeners
let countdownInterval = null; // Countdown timer for settlement
let settlementTargetTime = null; // Target timestamp for countdown
let liveUsdValues = null; // Store ETH amounts for live USD updates
let currentDisputeInfo = null; // Store dispute info for dispute pane
let currentDisputeSwapInfo = null; // Store calculated swap requirements for dispute submission

// Initialize providers and start price feeds
async function init() {
    try {
        // Create providers for all endpoints
        providers = RPC_ENDPOINTS.map(url => new ethers.providers.JsonRpcProvider(url));
        provider = providers[0]; // Default for gas price etc

        // Start gas price updates
        updateGasPrice();
        setInterval(updateGasPrice, 10000);

        // Start ETH price feed via Coinbase
        connectCoinbaseWs();

        console.log('Initialized', providers.length, 'RPC providers');

        // Create oracle contract for event listening
        oracleContract = new ethers.Contract(ORACLE_ADDRESS, ORACLE_ABI, provider);
        console.log('Oracle contract ready for events');

        // Setup wallet event listeners
        setupWalletListeners();

        // Try to auto-reconnect if wallet was previously connected
        await connectWallet();
    } catch (e) {
        console.error('Init error:', e);
    }
}

// Set up event listeners for a specific report
function setupEventListeners(reportId) {
    // Clean up any existing listeners first
    cleanupEventListeners();

    if (!oracleContract || !reportId) return;

    currentReportId = reportId;
    console.log(`Setting up event listeners for report #${reportId}`);

    // Filter for this specific reportId
    const reportIdBN = ethers.BigNumber.from(reportId);

    // InitialReportSubmitted
    const initialFilter = oracleContract.filters.InitialReportSubmitted(reportIdBN);
    const initialHandler = (rid, reporter, amount1, amount2, ...rest) => {
        console.log(`Event: InitialReportSubmitted for report #${rid.toString()}`);
        if (rid.eq(reportIdBN)) {
            refreshCurrentReport();
        }
    };
    oracleContract.on(initialFilter, initialHandler);
    eventListeners.push({ filter: initialFilter, handler: initialHandler });

    // ReportDisputed
    const disputeFilter = oracleContract.filters.ReportDisputed(reportIdBN);
    const disputeHandler = (rid, disputer, newAmount1, newAmount2, ...rest) => {
        console.log(`Event: ReportDisputed for report #${rid.toString()}`);
        if (rid.eq(reportIdBN)) {
            refreshCurrentReport();
        }
    };
    oracleContract.on(disputeFilter, disputeHandler);
    eventListeners.push({ filter: disputeFilter, handler: disputeHandler });

    // ReportSettled
    const settleFilter = oracleContract.filters.ReportSettled(reportIdBN);
    const settleHandler = (rid, price, settlementTimestamp, blockTimestamp) => {
        console.log(`Event: ReportSettled for report #${rid.toString()}`);
        if (rid.eq(reportIdBN)) {
            refreshCurrentReport();
        }
    };
    oracleContract.on(settleFilter, settleHandler);
    eventListeners.push({ filter: settleFilter, handler: settleHandler });

    console.log(`Listening for events on report #${reportId}`);

    // Update UI indicator
    document.getElementById('eventStatus').style.display = 'inline';
    document.getElementById('listeningReportId').textContent = reportId;
}

// Clean up event listeners
function cleanupEventListeners() {
    if (eventListeners.length > 0 && oracleContract) {
        for (const { filter, handler } of eventListeners) {
            oracleContract.off(filter, handler);
        }
        console.log('Event listeners cleaned up');
    }
    eventListeners = [];
    currentReportId = null;

    // Hide UI indicator
    const eventStatus = document.getElementById('eventStatus');
    if (eventStatus) eventStatus.style.display = 'none';

    // Note: Don't stop countdown here - it will be managed by renderReport
    // Clear live USD values
    liveUsdValues = null;
}

// Start countdown timer for settlement
function startCountdown(reportTimestamp, settlementTime) {
    stopCountdown(); // Clear any existing timer

    // Handle BigNumber timestamps and settlement time
    const ts = typeof reportTimestamp === 'number' ? reportTimestamp : reportTimestamp.toNumber();
    const st = typeof settlementTime === 'number' ? settlementTime : settlementTime.toNumber();
    settlementTargetTime = ts + st;
    console.log(`Countdown started: target=${settlementTargetTime}, now=${Math.floor(Date.now()/1000)}, remaining=${settlementTargetTime - Math.floor(Date.now()/1000)}s`);

    const updateCountdown = () => {
        const el = document.getElementById('settlementCountdown');
        if (!el) {
            console.log('Countdown element not found, stopping');
            stopCountdown();
            return;
        }

        const now = Math.floor(Date.now() / 1000);
        const remaining = settlementTargetTime - now;
        console.log(`Countdown tick: remaining=${remaining}s`);

        if (remaining <= 0) {
            el.textContent = 'Ready';
            el.className = 'countdown-timer ready';
            stopCountdown();
        } else {
            // Format as mm:ss or just seconds
            if (remaining >= 60) {
                const mins = Math.floor(remaining / 60);
                const secs = remaining % 60;
                el.textContent = `${mins}m ${secs}s`;
            } else {
                el.textContent = `${remaining}s`;
            }
            el.className = 'countdown-timer';
        }
    };

    // Update immediately, then every second
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    console.log('Countdown interval set:', countdownInterval);
}

// Stop countdown timer
function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    settlementTargetTime = null;
}

// Update live USD values when ETH price changes
function updateLiveUsdValues() {
    if (!liveUsdValues || !ethPrice) return;

    const { swapFeeEth, protocolFeeEth, wethFloat, reportedPrice, settlerReward, callbackGasLimit } = liveUsdValues;

    // Recalculate token distance based on current ETH price
    const priceDiff = Math.abs(ethPrice - reportedPrice);
    const tokenDistanceUSD = priceDiff * wethFloat;

    const swapFeeUSD = swapFeeEth * ethPrice;
    const protocolFeeUSD = protocolFeeEth * ethPrice;

    // Include dispute gas cost
    const disputeGasCost = calculateDisputeGasCost();
    const disputeGasCostUsd = disputeGasCost ? parseFloat(ethers.utils.formatUnits(disputeGasCost, 18)) * ethPrice : 0;

    // Include settle cost if disputer wins (they become reporter and may need to self-settle)
    let settleCostUsd = 0;
    if (settlerReward && callbackGasLimit !== undefined) {
        const settleGasCost = calculateSettleGasCost(callbackGasLimit);
        if (settleGasCost) {
            const netSettlerReward = settlerReward.sub(settleGasCost);
            if (netSettlerReward.lt(0)) {
                settleCostUsd = parseFloat(ethers.utils.formatUnits(netSettlerReward.abs(), 18)) * ethPrice;
            }
        }
    }

    const netPnLUSD = tokenDistanceUSD - swapFeeUSD - protocolFeeUSD - disputeGasCostUsd - settleCostUsd;

    const distanceEl = document.getElementById('liveTokenDistance');
    const swapFeeEl = document.getElementById('liveSwapFee');
    const protocolFeeEl = document.getElementById('liveProtocolFee');
    const netPnlEl = document.getElementById('liveNetPnl');

    if (distanceEl) {
        distanceEl.textContent = formatUSD(tokenDistanceUSD);
        distanceEl.className = `info-value ${tokenDistanceUSD >= 0 ? 'positive' : 'negative'}`;
    }
    if (swapFeeEl) {
        swapFeeEl.textContent = `-${formatUSD(swapFeeUSD)}`;
    }
    if (protocolFeeEl) {
        protocolFeeEl.textContent = `-${formatUSD(protocolFeeUSD)}`;
    }
    if (netPnlEl) {
        netPnlEl.textContent = formatUSD(netPnLUSD);
        netPnlEl.className = `info-value ${netPnLUSD >= 0 ? 'positive' : 'negative'}`;
    }
}

// Refresh the current report data and UI
async function refreshCurrentReport() {
    if (!currentReportId) return;

    console.log(`Refreshing report #${currentReportId}...`);

    try {
        const raceResult = await raceGetData(currentReportId);
        const data = raceResult.result;

        if (!data || data.length === 0) return;

        const report = data[0];

        // Only re-render if data actually changed
        if (currentReport &&
            report.currentAmount1.eq(currentReport.currentAmount1) &&
            report.currentAmount2.eq(currentReport.currentAmount2) &&
            report.currentReporter === currentReport.currentReporter &&
            report.isDistributed === currentReport.isDistributed &&
            report.stateHash === currentReport.stateHash) {
            console.log(`Refresh at block ${raceResult.blockNum}: no changes`);
            return;
        }

        // Get token info
        const token1Info = await getTokenInfo(report.token1);
        const token2Info = await getTokenInfo(report.token2);

        // Update global state
        currentReport = { ...report, token1Info, token2Info };

        // Re-render
        renderReport(report, token1Info, token2Info);

        console.log(`Report refreshed from block ${raceResult.blockNum}`);
    } catch (e) {
        console.error('Error refreshing report:', e);
    }
}

// Race multiple providers to get fastest response
// onFresherData callback is called if a later response has a higher block number
async function raceGetData(reportId, onFresherData = null) {
    const dataProviderAbi = DATA_PROVIDER_ABI;
    let highestBlock = 0;
    let firstResolved = false;
    let resolveFirst;

    const firstPromise = new Promise((resolve, reject) => {
        resolveFirst = resolve;
        // Timeout after 10 seconds if no RPC responds
        setTimeout(() => reject(new Error('All RPCs timed out')), 10000);
    });

    providers.forEach((p, i) => {
        const contract = new ethers.Contract(DATA_PROVIDER_ADDRESS, dataProviderAbi, p);
        const startTime = performance.now();

        // Fetch both data and block number together
        Promise.all([
            contract['getData(uint256)'](reportId),
            p.getBlockNumber()
        ])
            .then(([result, blockNum]) => {
                const elapsed = (performance.now() - startTime).toFixed(0);
                const rpcName = RPC_ENDPOINTS[i].split('//')[1].split('/')[0];
                console.log(`RPC ${i} (${rpcName}) responded in ${elapsed}ms at block ${blockNum}`);

                const response = { result, rpc: RPC_ENDPOINTS[i], elapsed, blockNum };

                if (!firstResolved) {
                    // First response - resolve immediately and set baseline
                    firstResolved = true;
                    highestBlock = blockNum;
                    resolveFirst(response);
                } else if (blockNum > highestBlock && onFresherData) {
                    // Later response with higher block - call callback
                    console.log(`Fresher data from ${rpcName}: block ${blockNum} > ${highestBlock}`);
                    highestBlock = blockNum;
                    onFresherData(response);
                }
            })
            .catch(err => {
                console.warn(`RPC ${i} failed:`, err.message);
            });
    });

    return firstPromise;
}

let gasProviderIndex = 0;

async function updateGasPrice() {
    try {
        // Rotate through providers to avoid rate limiting
        const p = providers[gasProviderIndex % providers.length];
        gasProviderIndex++;

        const feeData = await p.getFeeData();
        currentGasPrice = feeData.gasPrice;
        document.getElementById('gasPrice').textContent =
            parseFloat(ethers.utils.formatUnits(currentGasPrice, 'gwei')).toFixed(4);

        // Update breakeven volatility if report pane is open (gas affects net reward)
        updateBreakevenVolatility();
    } catch (e) {
        console.error('Gas price error:', e);
    }
}

function connectCoinbaseWs() {
    try {
        const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: 'subscribe',
                product_ids: ['ETH-USD'],
                channels: ['ticker']
            }));
            console.log('Coinbase WS connected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'ticker' && data.best_bid && data.best_ask) {
                    const bid = parseFloat(data.best_bid);
                    const ask = parseFloat(data.best_ask);
                    ethPrice = (bid + ask) / 2;
                    document.getElementById('ethPrice').textContent = ethPrice.toFixed(2);
                    // Update live USD values
                    updateLiveUsdValues();
                }
            } catch (e) {}
        };

        ws.onclose = () => {
            console.log('Coinbase WS closed, reconnecting...');
            setTimeout(connectCoinbaseWs, 3000);
        };

        ws.onerror = (e) => {
            console.error('Coinbase WS error:', e);
        };
    } catch (e) {
        console.error('WS error:', e);
        setTimeout(connectCoinbaseWs, 5000);
    }
}

// Connect wallet (silent - for auto-reconnect)
async function connectWallet() {
    if (!window.ethereum) {
        return false;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (!accounts || accounts.length === 0) {
            return false;
        }

        userAddress = accounts[0];
        await ensureBaseChain();

        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = web3Provider.getSigner();

        updateWalletUI();
        console.log('Wallet connected:', userAddress);
        return true;
    } catch (e) {
        console.error('Wallet connection error:', e);
        return false;
    }
}

// Connect wallet (manual - prompts user)
async function connectWalletManual() {
    if (!window.ethereum) {
        showError('MetaMask not found. Please install MetaMask.');
        return false;
    }

    try {
        // Force permission request to allow wallet selection
        try {
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });
        } catch (err) {
            // Fallback to regular request
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        userAddress = accounts[0];
        window.userAddress = userAddress; // For modal access

        // Check if user has accepted risk disclaimer for this wallet
        const hasAccepted = localStorage.getItem(`oracleRiskAccepted_${userAddress.toLowerCase()}`);
        if (!hasAccepted) {
            // Show risk modal and wait for user decision
            document.getElementById('riskModal').style.display = 'flex';
            document.getElementById('riskCheckbox').checked = false;
            document.getElementById('acceptRiskBtn').disabled = true;
            document.getElementById('acceptRiskBtn').style.opacity = '0.5';
            return false; // Connection not complete yet
        }

        // User already accepted, finish connection
        return await finishWalletConnection();
    } catch (e) {
        console.error('Wallet connection error:', e);
        showError('Failed to connect wallet: ' + e.message);
        return false;
    }
}

// Finish wallet connection after risk acceptance
async function finishWalletConnection() {
    try {
        await ensureBaseChain();

        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = web3Provider.getSigner();

        updateWalletUI();
        console.log('Wallet connected:', userAddress);
        return true;
    } catch (e) {
        console.error('Wallet connection error:', e);
        showError('Failed to connect wallet: ' + e.message);
        return false;
    }
}

// Make finishWalletConnection available to modal
window.finishWalletConnection = finishWalletConnection;

// Ensure we're on Base chain
async function ensureBaseChain() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== BASE_CHAIN_ID) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BASE_CHAIN_ID }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: BASE_CHAIN_ID,
                        chainName: 'Base',
                        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                        rpcUrls: ['https://mainnet.base.org'],
                        blockExplorerUrls: ['https://basescan.org']
                    }]
                });
            } else {
                throw switchError;
            }
        }
    }
}

// Disconnect wallet
async function disconnectWallet() {
    userAddress = null;
    window.userAddress = null;
    signer = null;
    updateWalletUI();
    console.log('Wallet disconnected');
}

// Make disconnectWallet available to modal
window.disconnectWallet = disconnectWallet;

// Update wallet UI
function updateWalletUI() {
    const connectBtn = document.getElementById('connectBtn');
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.getElementById('walletAddress');

    if (userAddress) {
        connectBtn.style.display = 'none';
        walletInfo.style.display = 'flex';
        // Truncate address: 0x1234...5678
        const truncated = userAddress.slice(0, 6) + '...' + userAddress.slice(-4);
        walletAddress.textContent = truncated;
    } else {
        connectBtn.style.display = '';
        walletInfo.style.display = 'none';
        walletAddress.textContent = '';
    }
}

// Setup wallet event listeners
function setupWalletListeners() {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', async (accounts) => {
        console.log('accountsChanged:', accounts);
        if (accounts.length === 0) {
            await disconnectWallet();
        } else {
            userAddress = accounts[0];
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = web3Provider.getSigner();
            updateWalletUI();
        }
    });

    window.ethereum.on('chainChanged', (chainId) => {
        console.log('chainChanged:', chainId);
        if (chainId !== BASE_CHAIN_ID) {
            showError('Please switch to Base network');
        }
    });
}

function toggleReportPane() {
    const pane = document.getElementById('reportPane');
    if (pane.style.display === 'none' || !pane.style.display) {
        pane.style.display = 'block';
        // Show breakeven immediately if token1 is WETH (no input needed)
        updateBreakevenVolatility();
    } else {
        pane.style.display = 'none';
    }
}

function autoFillAmount2() {
    if (!currentReport || !ethPrice) {
        showError('Cannot auto-fill: missing report data or ETH price');
        return;
    }

    const report = currentReport;
    const token1Info = report.token1Info;
    const token2Info = report.token2Info;

    const amount1Float = parseFloat(ethers.utils.formatUnits(report.exactToken1Report, token1Info.decimals));

    let amount2;

    // Calculate based on token pair and current ETH price
    const isToken1Weth = token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    const isToken2Weth = token2Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    const isToken1Usdc = token1Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase();
    const isToken2Usdc = token2Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase();

    if (isToken1Weth && isToken2Usdc) {
        // WETH -> USDC: amount2 = amount1 * ethPrice
        amount2 = amount1Float * ethPrice;
    } else if (isToken1Usdc && isToken2Weth) {
        // USDC -> WETH: amount2 = amount1 / ethPrice
        amount2 = amount1Float / ethPrice;
    } else {
        showError('Auto-fill only works for WETH/USDC pairs');
        return;
    }

    // Format with appropriate precision
    const precision = token2Info.decimals === 6 ? 2 : 6;
    document.getElementById('amount2Input').value = amount2.toFixed(precision);
    updateBreakevenVolatility();
}

function updateBreakevenVolatility() {
    if (!currentReport) return;

    const breakevenRow = document.getElementById('breakevenRow');
    const breakevenValueEl = document.getElementById('breakevenValue');

    const report = currentReport;
    const token1Info = report.token1Info;
    const token2Info = report.token2Info;

    // Check if one leg is WETH
    const isToken1Weth = token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    const isToken2Weth = token2Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();

    if (!isToken1Weth && !isToken2Weth) {
        // Neither leg is WETH, can't easily calculate
        breakevenRow.style.display = 'none';
        return;
    }

    // Calculate net reward (same logic as in renderReport)
    const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
    const submitGasCost = calculateInitialReportGasCost();
    const netSettlerReward = settleGasCost ? report.settlerReward.sub(settleGasCost) : null;
    let netReporterReward;
    if (netSettlerReward && netSettlerReward.lt(0)) {
        netReporterReward = report.fee.add(netSettlerReward);
    } else {
        netReporterReward = report.fee;
    }
    // Subtract submission gas cost
    if (submitGasCost) {
        netReporterReward = netReporterReward.sub(submitGasCost);
    }

    // Reward is in ETH, WETH amount is in ETH - same units, simple ratio
    const rewardEth = parseFloat(ethers.utils.formatUnits(netReporterReward, 18));

    // Get the WETH leg amount
    let wethAmount;
    if (isToken1Weth) {
        wethAmount = parseFloat(ethers.utils.formatUnits(report.exactToken1Report, 18));
    } else {
        // Token2 is WETH - need user input for amount2
        const amount2Input = document.getElementById('amount2Input');
        const amount2Value = parseFloat(amount2Input.value);
        if (!amount2Value || amount2Value <= 0) {
            breakevenRow.style.display = 'none';
            return;
        }
        wethAmount = amount2Value;
    }

    // Breakeven volatility = fee / wethAmount × 100 (both in ETH, token-agnostic)
    const breakevenPercent = (rewardEth / wethAmount) * 100;

    breakevenValueEl.textContent = `±${breakevenPercent.toFixed(4)}%`;
    breakevenValueEl.className = `pane-value ${breakevenPercent > 0.1 ? 'positive' : breakevenPercent > 0.01 ? '' : 'negative'}`;
    breakevenRow.style.display = 'flex';
}

function toggleDisputePane() {
    const pane = document.getElementById('disputePane');
    if (pane.style.display === 'none' || !pane.style.display) {
        pane.style.display = 'block';
    } else {
        pane.style.display = 'none';
    }
}

function autoFillDisputeAmount2() {
    if (!currentReport || !currentDisputeInfo || !ethPrice) {
        showError('Cannot auto-fill: missing data');
        return;
    }

    const token1Info = currentReport.token1Info;
    const token2Info = currentReport.token2Info;
    const newAmount1Float = parseFloat(ethers.utils.formatUnits(currentDisputeInfo.newAmount1, token1Info.decimals));

    let amount2;
    const isToken1Weth = token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    const isToken2Usdc = token2Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase();
    const isToken1Usdc = token1Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase();
    const isToken2Weth = token2Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();

    if (isToken1Weth && isToken2Usdc) {
        amount2 = newAmount1Float * ethPrice;
    } else if (isToken1Usdc && isToken2Weth) {
        amount2 = newAmount1Float / ethPrice;
    } else {
        showError('Auto-fill only works for WETH/USDC pairs');
        return;
    }

    const precision = token2Info.decimals === 6 ? 2 : 6;
    document.getElementById('disputeAmount2Input').value = amount2.toFixed(precision);
    updateDisputeRequirements();
}

function updateDisputeRequirements() {
    if (!currentReport || !currentDisputeInfo) return;

    const amount2Input = document.getElementById('disputeAmount2Input');
    const amount2Value = parseFloat(amount2Input.value);

    if (!amount2Value || amount2Value <= 0) {
        document.getElementById('disputeRequirements').style.display = 'none';
        return;
    }

    const report = currentReport;
    const token1Info = report.token1Info;
    const token2Info = report.token2Info;
    const disputeInfo = currentDisputeInfo;

    const newAmount1 = disputeInfo.newAmount1;
    const newAmount2 = ethers.utils.parseUnits(amount2Value.toString(), token2Info.decimals);
    const currentAmount1 = report.currentAmount1;
    const currentAmount2 = report.currentAmount2;

    // Calculate fees
    const feePercentage = ethers.BigNumber.from(report.feePercentage);
    const protocolFee = ethers.BigNumber.from(report.protocolFee);
    const PERCENTAGE_PRECISION = ethers.BigNumber.from('10000000');

    const fee1 = currentAmount1.mul(feePercentage.add(protocolFee)).div(PERCENTAGE_PRECISION);
    const fee2 = currentAmount2.mul(feePercentage.add(protocolFee)).div(PERCENTAGE_PRECISION);

    // Token1 Swap:
    // - Transfer in token1: currentAmount1 + newAmount1 + fees
    // - Transfer in token2: max(0, newAmount2 - currentAmount2) - only if new > current
    // - Receive token2: max(0, currentAmount2 - newAmount2) - only if current > new
    const token1SwapInToken1 = currentAmount1.add(newAmount1).add(fee1);
    const token1SwapInToken2 = newAmount2.gt(currentAmount2) ? newAmount2.sub(currentAmount2) : ethers.BigNumber.from(0);
    const token1SwapReceiveToken2 = currentAmount2.gt(newAmount2) ? currentAmount2.sub(newAmount2) : ethers.BigNumber.from(0);

    // Token2 Swap:
    // - Transfer in token2: currentAmount2 + newAmount2 + fees
    // - Transfer in token1: newAmount1 - currentAmount1
    // - Receive: nothing
    const token2SwapInToken1 = newAmount1.sub(currentAmount1);
    const token2SwapInToken2 = newAmount2.add(currentAmount2).add(fee2);

    // Calculate immediate PnL assuming the entered amount2 is correct
    // Your implied price: newAmount2 / newAmount1
    // Current reporter's price: currentAmount2 / currentAmount1
    // Token distance in token2 terms: |your_valuation - their_valuation| for the same token1 amount
    const newAmount1Float = parseFloat(ethers.utils.formatUnits(newAmount1, token1Info.decimals));
    const newAmount2Float = amount2Value;
    const currentAmount1Float = parseFloat(ethers.utils.formatUnits(currentAmount1, token1Info.decimals));
    const currentAmount2Float = parseFloat(ethers.utils.formatUnits(currentAmount2, token2Info.decimals));

    // Current reporter's implied valuation of newAmount1 in token2
    const currentReporterPrice = currentAmount1Float > 0 ? currentAmount2Float / currentAmount1Float : 0;
    const theirValuationOfNewAmount1 = currentReporterPrice * newAmount1Float;

    // Token distance = difference between your valuation and theirs (in token2 terms)
    const tokenDistanceToken2 = Math.abs(newAmount2Float - theirValuationOfNewAmount1);

    // Fee cost in token2 terms
    const fee2Float = parseFloat(ethers.utils.formatUnits(fee2, token2Info.decimals));

    // Dispute gas cost in token2 terms
    const disputeGasCost = calculateDisputeGasCost();
    let disputeGasCostToken2 = 0;
    const isToken2Usdc = token2Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase();
    const isToken2Weth = token2Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    if (disputeGasCost && ethPrice) {
        const disputeGasCostEth = parseFloat(ethers.utils.formatUnits(disputeGasCost, 18));
        if (isToken2Usdc) {
            disputeGasCostToken2 = disputeGasCostEth * ethPrice;
        } else if (isToken2Weth) {
            disputeGasCostToken2 = disputeGasCostEth;
        }
    }

    // If disputer wins, they become reporter and may need to self-settle
    // Account for settle cost if settler reward doesn't cover it
    let settleCostToken2 = 0;
    const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
    if (settleGasCost) {
        const netSettlerReward = report.settlerReward.sub(settleGasCost);
        if (netSettlerReward.lt(0)) {
            // Disputer will have to self-settle, eating the loss
            const settleLossEth = parseFloat(ethers.utils.formatUnits(netSettlerReward.abs(), 18));
            if (isToken2Usdc && ethPrice) {
                settleCostToken2 = settleLossEth * ethPrice;
            } else if (isToken2Weth) {
                settleCostToken2 = settleLossEth;
            }
        }
    }

    // Immediate PnL = token distance - fees - dispute gas - settle cost (all in token2)
    const immediatePnL = tokenDistanceToken2 - fee2Float - disputeGasCostToken2 - settleCostToken2;

    // Display PnL
    const pnlEl = document.getElementById('disputePnL');
    pnlEl.textContent = `${immediatePnL >= 0 ? '+' : ''}${immediatePnL.toFixed(token2Info.decimals === 6 ? 2 : 6)} ${token2Info.symbol}`;
    pnlEl.className = `pane-value ${immediatePnL >= 0 ? 'positive' : 'negative'}`;

    // Calculate and display breakeven volatility
    // Breakeven = immediatePnL / (amount2 * multiplier/100) * 100
    // Multiplier factors in because breakeven is relative to the escalated position
    const breakevenEl = document.getElementById('disputeBreakeven');
    const multiplierFloat = report.multiplier / MULTIPLIER_PRECISION;
    const breakevenPercent = amount2Value > 0 ? (immediatePnL / (amount2Value * multiplierFloat)) * 100 : 0;
    breakevenEl.textContent = `±${Math.abs(breakevenPercent).toFixed(4)}%`;
    breakevenEl.className = `pane-value ${breakevenPercent > 0.1 ? 'positive' : breakevenPercent > 0.01 ? '' : 'negative'}`;

    // Calculate USD values to recommend the cheaper option (if we have ETH price for known pairs)
    let token1SwapUsd = null;
    let token2SwapUsd = null;

    const isToken1Weth = token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase();
    // isToken2Weth already declared above

    // Calculate total cost for each swap type
    const token1SwapInToken1Float = parseFloat(ethers.utils.formatUnits(token1SwapInToken1, token1Info.decimals));
    const token1SwapInToken2Float = parseFloat(ethers.utils.formatUnits(token1SwapInToken2, token2Info.decimals));
    const token1SwapReceiveToken2Float = parseFloat(ethers.utils.formatUnits(token1SwapReceiveToken2, token2Info.decimals));
    const token2SwapInToken1Float = parseFloat(ethers.utils.formatUnits(token2SwapInToken1, token1Info.decimals));
    const token2SwapInToken2Float = parseFloat(ethers.utils.formatUnits(token2SwapInToken2, token2Info.decimals));

    if (ethPrice && (isToken1Weth || isToken2Weth)) {
        if (isToken1Weth) {
            // Token1 is WETH, Token2 is likely USDC
            token1SwapUsd = token1SwapInToken1Float * ethPrice + token1SwapInToken2Float - token1SwapReceiveToken2Float;
            token2SwapUsd = token2SwapInToken1Float * ethPrice + token2SwapInToken2Float;
        } else {
            // Token2 is WETH, Token1 is likely USDC
            token1SwapUsd = token1SwapInToken1Float + token1SwapInToken2Float * ethPrice - token1SwapReceiveToken2Float * ethPrice;
            token2SwapUsd = token2SwapInToken1Float + token2SwapInToken2Float * ethPrice;
        }
    }

    // Determine recommendation
    const recommendedSwapEl = document.getElementById('recommendedSwap');
    const transferInEl = document.getElementById('disputeTransferIn');

    // Build transfer in string for Token1 Swap
    let token1SwapTransferStr = formatTokenAmount(token1SwapInToken1, token1Info.decimals, token1Info.symbol);
    if (token1SwapInToken2.gt(0)) {
        token1SwapTransferStr += ` + ${formatTokenAmount(token1SwapInToken2, token2Info.decimals, token2Info.symbol)}`;
    }
    if (token1SwapReceiveToken2.gt(0)) {
        token1SwapTransferStr += ` (receive ${formatTokenAmount(token1SwapReceiveToken2, token2Info.decimals, token2Info.symbol)})`;
    }

    // Build transfer in string for Token2 Swap
    const token2SwapTransferStr = `${formatTokenAmount(token2SwapInToken1, token1Info.decimals, token1Info.symbol)} + ${formatTokenAmount(token2SwapInToken2, token2Info.decimals, token2Info.symbol)}`;

    // If we can calculate USD, use that; otherwise just show both options
    let recommendToken1 = true;
    if (token1SwapUsd !== null && token2SwapUsd !== null) {
        recommendToken1 = token1SwapUsd <= token2SwapUsd;
        if (recommendToken1) {
            recommendedSwapEl.textContent = token1Info.symbol;
            transferInEl.innerHTML = token1SwapTransferStr;
        } else {
            recommendedSwapEl.textContent = token2Info.symbol;
            transferInEl.innerHTML = token2SwapTransferStr;
        }
    } else {
        // Unknown pair - just show token1 swap option
        recommendedSwapEl.textContent = token1Info.symbol;
        transferInEl.innerHTML = token1SwapTransferStr;
    }

    // Store swap info for submission
    currentDisputeSwapInfo = {
        newAmount1,
        newAmount2,
        tokenToSwap: recommendToken1 ? report.token1 : report.token2,
        batchAmount1: recommendToken1 ? token1SwapInToken1 : token2SwapInToken1,
        batchAmount2: recommendToken1 ? token1SwapInToken2 : token2SwapInToken2,
        amt2Expected: report.currentAmount2
    };

    document.getElementById('disputeRequirements').style.display = 'block';
}

function isSettlementTimeValid(report) {
    if (report.timeType) {
        return report.settlementTime <= MAX_SETTLEMENT_TIME;
    } else {
        return report.settlementTime <= MAX_SETTLEMENT_BLOCKS;
    }
}

// Build oracleParams struct for safe batcher validation
function buildOracleParams(report) {
    return {
        exactToken1Report: report.exactToken1Report,
        escalationHalt: report.escalationHalt,
        fee: report.fee,
        settlerReward: report.settlerReward,
        token1: report.token1,
        settlementTime: report.settlementTime,
        token2: report.token2,
        timeType: report.timeType,
        feePercentage: report.feePercentage,
        protocolFee: report.protocolFee,
        multiplier: report.multiplier,
        disputeDelay: report.disputeDelay,
        currentAmount1: report.currentAmount1,
        currentAmount2: report.currentAmount2,
        callbackGasLimit: report.callbackGasLimit,
        protocolFeeRecipient: report.protocolFeeRecipient,
        keepFee: report.keepFee
    };
}

// Get fresh block info for safe batcher time bounds
async function getFreshBlockInfo() {
    const block = await providers[0].getBlock('latest');
    return {
        timestamp: block.timestamp,
        blockNumber: block.number,
        timestampBound: 60,  // +60 seconds
        blockNumberBound: 30  // +30 blocks
    };
}

async function submitDispute() {
    if (!currentReport || !currentDisputeInfo || !currentDisputeSwapInfo) {
        showError('No report loaded or missing dispute info');
        return;
    }

    if (currentReport.callbackGasLimit > MAX_CALLBACK_GAS_REPORT) {
        showError(`Cannot dispute: callbackGasLimit exceeds 10M limit`);
        return;
    }

    if (!isSettlementTimeValid(currentReport)) {
        const limit = currentReport.timeType ? `${MAX_SETTLEMENT_TIME} seconds` : `${MAX_SETTLEMENT_BLOCKS} blocks`;
        showError(`Cannot dispute: settlementTime exceeds ${limit}`);
        return;
    }

    if (!signer) {
        const connected = await connectWalletManual();
        if (!connected) return;
    }

    const amount2Input = document.getElementById('disputeAmount2Input');
    const amount2Value = amount2Input.value;

    if (!amount2Value || parseFloat(amount2Value) <= 0) {
        showError('Please enter a valid Token 2 amount');
        return;
    }

    try {
        const report = currentReport;
        const token1Info = report.token1Info;
        const token2Info = report.token2Info;
        const swapInfo = currentDisputeSwapInfo;

        console.log('=== Submit Dispute Debug ===');
        console.log('reportId:', report.reportId.toString());
        console.log('tokenToSwap:', swapInfo.tokenToSwap);
        console.log('newAmount1:', swapInfo.newAmount1.toString());
        console.log('newAmount2:', swapInfo.newAmount2.toString());
        console.log('amt2Expected:', swapInfo.amt2Expected.toString());
        console.log('batchAmount1:', swapInfo.batchAmount1.toString());
        console.log('batchAmount2:', swapInfo.batchAmount2.toString());
        console.log('stateHash:', report.stateHash);

        // Check token balances
        const token1Contract = new ethers.Contract(report.token1, ERC20_ABI, signer);
        const token2Contract = new ethers.Contract(report.token2, ERC20_ABI, signer);

        const [balance1, balance2] = await Promise.all([
            token1Contract.balanceOf(userAddress),
            token2Contract.balanceOf(userAddress)
        ]);

        console.log('User balance token1:', ethers.utils.formatUnits(balance1, token1Info.decimals), token1Info.symbol);
        console.log('User balance token2:', ethers.utils.formatUnits(balance2, token2Info.decimals), token2Info.symbol);

        if (balance1.lt(swapInfo.batchAmount1)) {
            showError(`Insufficient ${token1Info.symbol} balance. Need ${ethers.utils.formatUnits(swapInfo.batchAmount1, token1Info.decimals)}, have ${ethers.utils.formatUnits(balance1, token1Info.decimals)}`);
            return;
        }

        if (balance2.lt(swapInfo.batchAmount2)) {
            showError(`Insufficient ${token2Info.symbol} balance. Need ${ethers.utils.formatUnits(swapInfo.batchAmount2, token2Info.decimals)}, have ${ethers.utils.formatUnits(balance2, token2Info.decimals)}`);
            return;
        }

        // Check allowances and approve in parallel if needed
        const [allowance1, allowance2] = await Promise.all([
            token1Contract.allowance(userAddress, BATCHER_ADDRESS),
            token2Contract.allowance(userAddress, BATCHER_ADDRESS)
        ]);

        const approvalPromises = [];
        if (allowance1.lt(swapInfo.batchAmount1)) {
            console.log('Approving token1...');
            approvalPromises.push(
                token1Contract.approve(BATCHER_ADDRESS, ethers.constants.MaxUint256)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token1 approved'))
            );
        }
        if (allowance2.lt(swapInfo.batchAmount2)) {
            console.log('Approving token2...');
            approvalPromises.push(
                token2Contract.approve(BATCHER_ADDRESS, ethers.constants.MaxUint256)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token2 approved'))
            );
        }

        if (approvalPromises.length > 0) {
            await Promise.all(approvalPromises);
        }

        // Build oracleParams and get fresh block info for safe batcher
        console.log('Building oracleParams and getting fresh block info...');
        const oracleParams = buildOracleParams(report);
        const blockInfo = await getFreshBlockInfo();

        console.log('oracleParams:', oracleParams);
        console.log('blockInfo:', blockInfo);

        // Submit via safe batcher
        const batcher = new ethers.Contract(BATCHER_ADDRESS, BATCHER_ABI, signer);

        const disputeData = [{
            reportId: report.reportId,
            tokenToSwap: swapInfo.tokenToSwap,
            newAmount1: swapInfo.newAmount1,
            newAmount2: swapInfo.newAmount2,
            amt2Expected: swapInfo.amt2Expected,
            stateHash: report.stateHash
        }];

        console.log('Calling batcher.disputeReportSafe...');

        const tx = await batcher.disputeReportSafe(
            disputeData,
            oracleParams,
            swapInfo.batchAmount1,
            swapInfo.batchAmount2,
            blockInfo.timestamp,
            blockInfo.blockNumber,
            blockInfo.timestampBound,
            blockInfo.blockNumberBound
        );
        console.log('TX sent:', tx.hash);

        const receipt = await tx.wait();
        console.log('TX confirmed:', receipt);

        // Hide pane - event listener will refresh the UI
        const pane = document.getElementById('disputePane');
        if (pane) pane.style.display = 'none';
        console.log('Dispute submitted successfully!');

    } catch (e) {
        console.error('Dispute error:', e);
        let errorMsg = e.message;
        if (e.error && e.error.message) {
            errorMsg = e.error.message;
        }
        if (e.reason) {
            errorMsg = e.reason;
        }
        showError('Failed to dispute: ' + errorMsg);
    }
}

async function submitInitialReport() {
    if (!currentReport) {
        showError('No report loaded');
        return;
    }

    // Block if callbackGasLimit is too high
    if (currentReport.callbackGasLimit > MAX_CALLBACK_GAS_REPORT) {
        showError(`Cannot report: callbackGasLimit (${currentReport.callbackGasLimit.toLocaleString()}) exceeds 10M limit`);
        return;
    }

    // Block if settlementTime is too high
    if (!isSettlementTimeValid(currentReport)) {
        const limit = currentReport.timeType ? `${MAX_SETTLEMENT_TIME} seconds` : `${MAX_SETTLEMENT_BLOCKS} blocks`;
        showError(`Cannot report: settlementTime exceeds ${limit}`);
        return;
    }

    // Connect wallet if not connected
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    const amount2Input = document.getElementById('amount2Input');
    const amount2Value = amount2Input.value;

    if (!amount2Value || parseFloat(amount2Value) <= 0) {
        showError('Please enter a valid Token 2 amount');
        return;
    }

    try {
        const report = currentReport;
        const token1Info = await getTokenInfo(report.token1);
        const token2Info = await getTokenInfo(report.token2);

        const amount1 = report.exactToken1Report;
        const amount2 = ethers.utils.parseUnits(amount2Value, token2Info.decimals);
        // stateHash from contract is already bytes32, use as-is
        const stateHash = report.stateHash;

        console.log('=== Submit Initial Report Debug ===');
        console.log('reportId:', report.reportId.toString());
        console.log('amount1 (exactToken1Report):', amount1.toString());
        console.log('amount2 (user input):', amount2.toString());
        console.log('stateHash:', stateHash);
        console.log('token1:', report.token1, '(' + token1Info.symbol + ')');
        console.log('token2:', report.token2, '(' + token2Info.symbol + ')');
        console.log('userAddress:', userAddress);

        // Check token balances
        const token1Contract = new ethers.Contract(report.token1, ERC20_ABI, signer);
        const token2Contract = new ethers.Contract(report.token2, ERC20_ABI, signer);

        const balance1 = await token1Contract.balanceOf(userAddress);
        const balance2 = await token2Contract.balanceOf(userAddress);

        console.log('User balance token1:', ethers.utils.formatUnits(balance1, token1Info.decimals), token1Info.symbol);
        console.log('User balance token2:', ethers.utils.formatUnits(balance2, token2Info.decimals), token2Info.symbol);

        if (balance1.lt(amount1)) {
            showError(`Insufficient ${token1Info.symbol} balance. Need ${ethers.utils.formatUnits(amount1, token1Info.decimals)}, have ${ethers.utils.formatUnits(balance1, token1Info.decimals)}`);
            return;
        }

        if (balance2.lt(amount2)) {
            showError(`Insufficient ${token2Info.symbol} balance. Need ${ethers.utils.formatUnits(amount2, token2Info.decimals)}, have ${ethers.utils.formatUnits(balance2, token2Info.decimals)}`);
            return;
        }

        // Check both allowances in parallel
        const [allowance1, allowance2] = await Promise.all([
            token1Contract.allowance(userAddress, BATCHER_ADDRESS),
            token2Contract.allowance(userAddress, BATCHER_ADDRESS)
        ]);
        console.log('Token1 allowance:', ethers.utils.formatUnits(allowance1, token1Info.decimals));
        console.log('Token2 allowance:', ethers.utils.formatUnits(allowance2, token2Info.decimals));

        // Fire approval transactions in parallel if needed
        const approvalPromises = [];
        if (allowance1.lt(amount1)) {
            console.log('Approving token1...');
            approvalPromises.push(
                token1Contract.approve(BATCHER_ADDRESS, ethers.constants.MaxUint256)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token1 approved'))
            );
        }
        if (allowance2.lt(amount2)) {
            console.log('Approving token2...');
            approvalPromises.push(
                token2Contract.approve(BATCHER_ADDRESS, ethers.constants.MaxUint256)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token2 approved'))
            );
        }

        // Wait for all approvals to complete
        if (approvalPromises.length > 0) {
            await Promise.all(approvalPromises);
        }

        // Build oracleParams and get fresh block info for safe batcher
        console.log('Building oracleParams and getting fresh block info...');
        const oracleParams = buildOracleParams(report);
        const blockInfo = await getFreshBlockInfo();

        console.log('oracleParams:', oracleParams);
        console.log('blockInfo:', blockInfo);

        // Submit via safe batcher
        const batcher = new ethers.Contract(BATCHER_ADDRESS, BATCHER_ABI, signer);

        const reportData = [{
            reportId: report.reportId,
            amount1: amount1,
            amount2: amount2,
            stateHash: stateHash
        }];

        console.log('Calling batcher.submitInitialReportSafe...');
        console.log('reportData:', JSON.stringify(reportData, (k, v) => typeof v === 'object' && v._isBigNumber ? v.toString() : v, 2));

        // Try to estimate gas first to get better error message
        try {
            const gasEstimate = await batcher.estimateGas.submitInitialReportSafe(
                reportData,
                oracleParams,
                amount1,
                amount2,
                blockInfo.timestamp,
                blockInfo.blockNumber,
                blockInfo.timestampBound,
                blockInfo.blockNumberBound
            );
            console.log('Gas estimate:', gasEstimate.toString());
        } catch (gasError) {
            console.error('Gas estimation failed:', gasError);
            // Try to decode revert reason
            if (gasError.error && gasError.error.data) {
                console.error('Revert data:', gasError.error.data);
            }
            throw gasError;
        }

        const tx = await batcher.submitInitialReportSafe(
            reportData,
            oracleParams,
            amount1,
            amount2,
            blockInfo.timestamp,
            blockInfo.blockNumber,
            blockInfo.timestampBound,
            blockInfo.blockNumberBound
        );
        console.log('TX sent:', tx.hash);

        const receipt = await tx.wait();
        console.log('TX confirmed:', receipt);

        // Hide pane - event listener will refresh the UI
        const pane = document.getElementById('reportPane');
        if (pane) pane.style.display = 'none';
        console.log('Initial report submitted successfully!');
    } catch (e) {
        console.error('Submit error:', e);
        // Try to extract more meaningful error
        let errorMsg = e.message;
        if (e.error && e.error.message) {
            errorMsg = e.error.message;
        }
        if (e.reason) {
            errorMsg = e.reason;
        }
        showError('Failed to submit: ' + errorMsg);
    }
}

async function searchReport() {
    const reportIdInput = document.getElementById('reportId');
    const reportId = parseInt(reportIdInput.value);

    if (isNaN(reportId) || reportId < 1) {
        showError('Please enter a valid report ID');
        return;
    }

    hideError();
    hideWarning();
    showLoading();

    try {
        const startTime = performance.now();

        // Callback for when fresher data arrives from a slower but more up-to-date RPC
        const onFresherData = async (fresherResult) => {
            const data = fresherResult.result;
            if (!data || data.length === 0) return;

            const report = data[0];

            // Only re-render if data actually changed (compare key fields)
            if (currentReport &&
                report.currentAmount1.eq(currentReport.currentAmount1) &&
                report.currentAmount2.eq(currentReport.currentAmount2) &&
                report.currentReporter === currentReport.currentReporter &&
                report.isDistributed === currentReport.isDistributed &&
                report.stateHash === currentReport.stateHash) {
                console.log(`Block ${fresherResult.blockNum} has same data, skipping re-render`);
                return;
            }

            const token1Info = await getTokenInfo(report.token1);
            const token2Info = await getTokenInfo(report.token2);

            // Update global state
            currentReport = { ...report, token1Info, token2Info };

            // Re-render with fresher data
            console.log(`Re-rendering with fresher data from block ${fresherResult.blockNum}`);
            renderReport(report, token1Info, token2Info);
        };

        const raceResult = await raceGetData(reportId, onFresherData);
        const totalElapsed = (performance.now() - startTime).toFixed(0);
        console.log(`Winner: ${raceResult.rpc.split('//')[1].split('/')[0]} in ${raceResult.elapsed}ms at block ${raceResult.blockNum} (total: ${totalElapsed}ms)`);

        const data = raceResult.result;

        if (!data || data.length === 0) {
            showError('Report not found');
            hideLoading();
            return;
        }

        const report = data[0];

        // Validate parameters
        if (report.callbackGasLimit > MAX_CALLBACK_GAS) {
            showWarning(`Warning: callbackGasLimit (${report.callbackGasLimit}) exceeds 2,000,000. This report may have issues.`);
        }

        if (report.settlementTime > MAX_SETTLEMENT_TIME) {
            showWarning(`Warning: settlementTime (${report.settlementTime}s) exceeds 1 day. This report may have issues.`);
        }

        // Get token info
        const token1Info = await getTokenInfo(report.token1);
        const token2Info = await getTokenInfo(report.token2);

        // Store for actions (spread to make mutable copy)
        currentReport = { ...report, token1Info, token2Info };

        // Render the report
        renderReport(report, token1Info, token2Info);

        // Set up event listeners for this report
        setupEventListeners(reportId);

        hideLoading();
    } catch (e) {
        console.error('Search error:', e);
        showError('Error fetching report: ' + e.message);
        hideLoading();
    }
}

// Cache for known tokens
const TOKEN_CACHE = {
    [WETH_ADDRESS.toLowerCase()]: { decimals: 18, symbol: 'WETH' },
    [USDC_ADDRESS.toLowerCase()]: { decimals: 6, symbol: 'USDC' },
};

async function getTokenInfo(tokenAddress) {
    const addr = tokenAddress.toLowerCase();

    // Check cache first
    if (TOKEN_CACHE[addr]) {
        return { address: tokenAddress, ...TOKEN_CACHE[addr] };
    }

    // Race RPCs for unknown tokens
    try {
        const racePromises = providers.map(p => {
            const contract = new ethers.Contract(tokenAddress, ERC20_ABI, p);
            return Promise.all([contract.decimals(), contract.symbol()])
                .then(([decimals, symbol]) => ({ decimals, symbol }));
        });

        const result = await Promise.any(racePromises);
        // Cache it
        TOKEN_CACHE[addr] = result;
        return { address: tokenAddress, ...result };
    } catch (e) {
        // Default for unknown tokens
        return { address: tokenAddress, decimals: 18, symbol: 'UNKNOWN' };
    }
}

function formatTokenAmount(amount, decimals, symbol) {
    const formatted = parseFloat(ethers.utils.formatUnits(amount, decimals));
    if (formatted < 0.0001 && formatted > 0) {
        return `${formatted.toExponential(4)} ${symbol}`;
    }
    return `${formatted.toLocaleString(undefined, {maximumFractionDigits: 6})} ${symbol}`;
}

function formatUSD(amount) {
    return `$${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function getTokenUSDValue(amount, tokenInfo) {
    if (!ethPrice) return null;

    const amountFloat = parseFloat(ethers.utils.formatUnits(amount, tokenInfo.decimals));

    // Check if WETH
    if (tokenInfo.address.toLowerCase() === WETH_ADDRESS.toLowerCase()) {
        return amountFloat * ethPrice;
    }

    // Check if USDC (assume 1:1 with USD)
    if (tokenInfo.address.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
        return amountFloat;
    }

    return null;
}

function calculateSettleGasCost(callbackGasLimit) {
    if (!currentGasPrice) return null;

    // Base settle gas + callback gas + overhead
    const baseGas = 125000;
    const overhead = callbackGasLimit > 0 ? 30000 : 0;
    const totalGas = baseGas + callbackGasLimit + overhead;

    const gasCostWei = currentGasPrice.mul(totalGas);
    return gasCostWei;
}

function calculateInitialReportGasCost() {
    if (!currentGasPrice) return null;
    const gasUsed = 315000;
    return currentGasPrice.mul(gasUsed);
}

function calculateDisputeGasCost() {
    if (!currentGasPrice) return null;
    const gasUsed = 240000;
    return currentGasPrice.mul(gasUsed);
}

function renderReport(report, token1Info, token2Info) {
    const resultBox = document.getElementById('resultBox');

    // Determine report state
    const hasInitialReport = report.currentReporter !== ethers.constants.AddressZero;
    const isSettled = report.isDistributed;

    // Calculate net reward for display
    // Account for: submission gas, settle gas (if settler reward doesn't cover it)
    const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
    const submitGasCost = calculateInitialReportGasCost();
    const netSettlerReward = settleGasCost ? report.settlerReward.sub(settleGasCost) : null;
    let netReporterReward;
    if (netSettlerReward && netSettlerReward.lt(0)) {
        // Reporter will have to settle themselves, subtract the loss
        netReporterReward = report.fee.add(netSettlerReward);
    } else {
        netReporterReward = report.fee;
    }
    // Subtract submission gas cost
    if (submitGasCost) {
        netReporterReward = netReporterReward.sub(submitGasCost);
    }

    let statusBadge = '';
    if (isSettled) {
        statusBadge = '<span class="settled-badge">Settled</span>';
    } else if (hasInitialReport) {
        // Calculate initial time for display
        const now = Math.floor(Date.now() / 1000);
        const reportTs = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
        const settlementTimeSecs = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
        const settleTs = reportTs + settlementTimeSecs;
        const remaining = settleTs - now;
        const initialTimeStr = remaining > 0 ? (remaining >= 60 ? `${Math.floor(remaining / 60)}m ${remaining % 60}s` : `${remaining}s`) : 'Ready';
        const canDispute = report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report);
        const disputeBtn = canDispute ? `<button class="dispute-btn" onclick="toggleDisputePane()">Dispute</button>` : '';
        statusBadge = `<span class="pending-badge">Pending Settlement</span><span id="settlementCountdown" class="countdown-timer ${remaining <= 0 ? 'ready' : ''}">${initialTimeStr}</span>${disputeBtn}`;
    } else {
        const rewardEth = parseFloat(ethers.utils.formatUnits(netReporterReward, 18));
        const rewardUsd = ethPrice ? (rewardEth * ethPrice).toPrecision(2) : '??';
        const liqFloat = parseFloat(ethers.utils.formatUnits(report.exactToken1Report, token1Info.decimals));
        const liqStr = liqFloat.toPrecision(2) + ' ' + token1Info.symbol;

        // Don't show Report button if callbackGasLimit is too high
        const canReport = report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report);
        let reportBtnReason = '';
        if (report.callbackGasLimit > MAX_CALLBACK_GAS_REPORT) reportBtnReason = 'Gas limit too high';
        else if (!isSettlementTimeValid(report)) reportBtnReason = 'Settlement time too high';
        const reportBtn = canReport ? `<button class="report-btn" onclick="toggleReportPane()">Report</button>` : `<span style="font-size: 11px; color: #ef4444;">${reportBtnReason}</span>`;

        statusBadge = `<span style="display: inline-flex; align-items: center; gap: 8px; vertical-align: middle;"><span class="no-report-badge">Awaiting Initial Report</span>${reportBtn}<span style="font-size: 13px; color: #10b981;">Reward: ~$${rewardUsd}</span><span style="font-size: 13px; color: #888;">Liquidity: ~${liqStr}</span></span>`;
    }

    // Report pane HTML (shown above header when opened) - only if gas limit and settlement time are acceptable
    let reportPaneHtml = '';
    if (!hasInitialReport && report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report)) {
        const settlementTimeSecs = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
        const settlementMins = (settlementTimeSecs / 60).toFixed(1);

        reportPaneHtml = `
        <div id="reportPane" class="report-pane" style="display: none;">
            <div class="pane-header">Submit Initial Report</div>
            <div class="pane-row">
                <div class="pane-label">${token1Info.symbol} Amount (fixed)</div>
                <div class="pane-value">${formatTokenAmount(report.exactToken1Report, token1Info.decimals, token1Info.symbol)}</div>
            </div>
            <div class="pane-row">
                <div class="pane-label">${token2Info.symbol} Amount (${formatTokenAmount(report.exactToken1Report, token1Info.decimals, token1Info.symbol)} worth of ${token2Info.symbol})</div>
                <div class="pane-input-group">
                    <input type="text" id="amount2Input" class="pane-input" placeholder="Enter ${token2Info.symbol} amount" oninput="updateBreakevenVolatility()">
                    <button class="auto-btn" onclick="autoFillAmount2()">Auto</button>
                </div>
            </div>
            <div id="breakevenRow" class="pane-row" style="display: none;">
                <div class="pane-label">
                    Breakeven Volatility
                    <span class="tooltip" data-tip="Maximum price movement (in either direction, at any time) over the ${settlementMins} min settlement period where you remain profitable. If price moves more than this %, a disputer could profitably correct your report and you'd lose money.">(?)</span>
                </div>
                <div class="pane-value" id="breakevenValue">--</div>
            </div>
            <div class="pane-actions">
                <button class="submit-btn" onclick="submitInitialReport()">Submit Report</button>
                <button class="cancel-btn" onclick="toggleReportPane()">Cancel</button>
            </div>
        </div>`;
    }

    // Dispute pane HTML (for pending settlement reports)
    let disputePaneHtml = '';
    if (hasInitialReport && !isSettled && report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report)) {
        // Calculate dispute info for display
        const tempDisputeInfo = calculateDisputeInfo(report, token1Info, token2Info);

        // Settlement time string for tooltip
        const settlementTimeVal = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
        const settlementStr = report.timeType
            ? (settlementTimeVal >= 60 ? `${(settlementTimeVal / 60).toFixed(1)} min` : `${settlementTimeVal} sec`)
            : `${settlementTimeVal} block`;

        disputePaneHtml = `
        <div id="disputePane" class="report-pane dispute-pane" style="display: none;">
            <div class="pane-header" style="color: var(--accent-red);">Submit Dispute</div>
            <div class="pane-row">
                <div class="pane-label">New ${token1Info.symbol} Amount (fixed - escalated)</div>
                <div class="pane-value">${formatTokenAmount(tempDisputeInfo.newAmount1, token1Info.decimals, token1Info.symbol)}</div>
            </div>
            <div class="pane-row">
                <div class="pane-label">New ${token2Info.symbol} Amount (${formatTokenAmount(tempDisputeInfo.newAmount1, token1Info.decimals, token1Info.symbol)} worth of ${token2Info.symbol})</div>
                <div class="pane-input-group">
                    <input type="text" id="disputeAmount2Input" class="pane-input" placeholder="Enter ${token2Info.symbol} amount" oninput="updateDisputeRequirements()">
                    <button class="auto-btn" onclick="autoFillDisputeAmount2()">Auto</button>
                </div>
            </div>
            <div id="disputeRequirements" class="dispute-requirements" style="display: none;">
                <div class="pane-row">
                    <div class="pane-label">Est. Immediate PnL (assuming correct ${token2Info.symbol} amount above)</div>
                    <div class="pane-value" id="disputePnL">--</div>
                </div>
                <div class="pane-row">
                    <div class="pane-label">
                        Breakeven Volatility
                        <span class="tooltip" data-tip="Maximum price movement (in either direction, at any time) over the ${settlementStr} settlement period where you remain profitable. If price moves more than this %, anyone could profitably dispute you and you'd lose money.">(?)</span>
                    </div>
                    <div class="pane-value" id="disputeBreakeven">--</div>
                </div>
                <div class="pane-row">
                    <div class="pane-label">
                        Recommended Swap (token in current report with less value)
                        <span class="tooltip" data-tip="Choosing the token with less value in the current report lets you earn the absolute difference in token values.">(?)</span>
                    </div>
                    <div class="pane-value" id="recommendedSwap">--</div>
                </div>
                <div class="pane-row">
                    <div class="pane-label">You Transfer In</div>
                    <div class="pane-value" id="disputeTransferIn">--</div>
                </div>
            </div>
            <div class="pane-actions">
                <button class="submit-btn" style="background: var(--accent-red);" onclick="submitDispute()">Submit Dispute</button>
                <button class="cancel-btn" onclick="toggleDisputePane()">Cancel</button>
            </div>
        </div>`;
    }

    const swapFeePercent = (report.feePercentage / 100000).toFixed(3);
    const protocolFeePercent = (report.protocolFee / 100000).toFixed(3);
    const totalFeePercent = ((report.feePercentage + report.protocolFee) / 100000).toFixed(3);

    let html = `${reportPaneHtml}${disputePaneHtml}<div class="result-card">
        <h2 style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">Report #${report.reportId} ${statusBadge}</h2>

        <div class="section-title">Token Pair</div>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Token 1: ${token1Info.symbol}</div>
                <div class="info-value" style="font-size: 12px;">${report.token1}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Token 2: ${token2Info.symbol}</div>
                <div class="info-value" style="font-size: 12px;">${report.token2}</div>
            </div>
        </div>

        <div class="section-title">Report Parameters</div>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Settlement Time</div>
                <div class="info-value">${report.settlementTime} ${report.timeType ? 'seconds' : 'blocks'} ${report.timeType ? `(${(report.settlementTime / 60).toFixed(1)} min)` : ''}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Dispute Delay</div>
                <div class="info-value">${report.disputeDelay} ${report.timeType ? 'seconds' : 'blocks'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Swap Fee</div>
                <div class="info-value">${swapFeePercent}%</div>
            </div>
            <div class="info-item">
                <div class="info-label">Burn Fee</div>
                <div class="info-value">${protocolFeePercent}%</div>
            </div>
            <div class="info-item">
                <div class="info-label">Multiplier</div>
                <div class="info-value">${(report.multiplier / 100).toFixed(2)}x</div>
            </div>
            <div class="info-item">
                <div class="info-label">Callback Gas Limit</div>
                <div class="info-value">${report.callbackGasLimit.toLocaleString()}</div>
            </div>
        </div>`;

    if (hasInitialReport) {
        // Current Report Status - calculate human readable price from amounts
        const amount1Float = parseFloat(ethers.utils.formatUnits(report.currentAmount1, token1Info.decimals));
        const amount2Float = parseFloat(ethers.utils.formatUnits(report.currentAmount2, token2Info.decimals));

        // Price as token2 per token1 (e.g., USDC per WETH = ETH price in USD)
        const priceToken2PerToken1 = amount1Float > 0 ? (amount2Float / amount1Float) : 0;
        const priceFormatted = priceToken2PerToken1.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

        html += `
        <div class="section-title">Current Report Status</div>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Current ${token1Info.symbol} Amount</div>
                <div class="info-value">${formatTokenAmount(report.currentAmount1, token1Info.decimals, token1Info.symbol)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Current ${token2Info.symbol} Amount</div>
                <div class="info-value">${formatTokenAmount(report.currentAmount2, token2Info.decimals, token2Info.symbol)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Price (1 ${token1Info.symbol} =)</div>
                <div class="info-value highlight">${priceFormatted} ${token2Info.symbol}</div>
            </div>
        </div>`;

        // Dispute Section (if not settled)
        if (!isSettled) {
            const disputeInfo = calculateDisputeInfo(report, token1Info, token2Info);

            // Store dispute info globally for the dispute pane
            currentDisputeInfo = disputeInfo;

            // USD PnL if WETH/USDC pair
            if (disputeInfo.usdPnLAvailable) {
                // Store values for live updates (need raw values to recalculate when price changes)
                liveUsdValues = {
                    swapFeeEth: disputeInfo.swapFeeEth,
                    protocolFeeEth: disputeInfo.protocolFeeEth,
                    wethFloat: disputeInfo.wethFloat,
                    reportedPrice: disputeInfo.reportedPrice,
                    settlerReward: report.settlerReward,
                    callbackGasLimit: report.callbackGasLimit
                };

                html += `
        <div class="section-title">Estimated Immediate PnL (WETH/USDC)</div>
        <div class="info-grid">
            <div class="info-item full-width">
                <div class="info-label">Token Distance Value (at current ETH price)</div>
                <div id="liveTokenDistance" class="info-value ${disputeInfo.tokenDistanceUSD >= 0 ? 'positive' : 'negative'}">
                    ${formatUSD(disputeInfo.tokenDistanceUSD)}
                </div>
            </div>
            <div class="info-item">
                <div class="info-label">Swap Fee Cost</div>
                <div id="liveSwapFee" class="info-value negative">-${formatUSD(disputeInfo.swapFeeUSD)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Protocol Fee Cost</div>
                <div id="liveProtocolFee" class="info-value negative">-${formatUSD(disputeInfo.protocolFeeUSD)}</div>
            </div>
            <div class="info-item full-width">
                <div class="info-label">Net Immediate PnL (excluding price risk)</div>
                <div id="liveNetPnl" class="info-value ${disputeInfo.netPnLUSD >= 0 ? 'positive' : 'negative'}">
                    ${formatUSD(disputeInfo.netPnLUSD)}
                </div>
            </div>
        </div>`;
            } else {
                liveUsdValues = null;
            }
        }
    }

    html += `</div>`;
    resultBox.innerHTML = html;

    // Start countdown timer for pending settlement reports
    const reportTs = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
    if (hasInitialReport && !isSettled && reportTs > 0) {
        startCountdown(reportTs, report.settlementTime);
    } else {
        stopCountdown();
    }
}

function calculateDisputeInfo(report, token1Info, token2Info) {
    const currentAmount1 = report.currentAmount1;
    const currentAmount2 = report.currentAmount2;
    const escalationHalt = report.escalationHalt;
    const multiplier = report.multiplier;
    const feePercentage = ethers.BigNumber.from(report.feePercentage);
    const protocolFee = ethers.BigNumber.from(report.protocolFee);

    // Calculate newAmount1 based on escalation rules
    let newAmount1;
    let escalationHalted = false;

    if (escalationHalt.gt(currentAmount1)) {
        // Normal escalation
        newAmount1 = currentAmount1.mul(multiplier).div(MULTIPLIER_PRECISION);
        // Cap at escalationHalt
        if (newAmount1.gt(escalationHalt)) {
            newAmount1 = escalationHalt;
        }
    } else {
        // Escalation halted - only +1
        newAmount1 = currentAmount1.add(1);
        escalationHalted = true;
    }

    // Calculate fees (on oldAmount)
    const swapFee1 = currentAmount1.mul(feePercentage).div(PERCENTAGE_PRECISION);
    const protocolFee1 = currentAmount1.mul(protocolFee).div(PERCENTAGE_PRECISION);
    const totalFees1 = swapFee1.add(protocolFee1);

    const swapFee2 = currentAmount2.mul(feePercentage).div(PERCENTAGE_PRECISION);
    const protocolFee2 = currentAmount2.mul(protocolFee).div(PERCENTAGE_PRECISION);
    const totalFees2 = swapFee2.add(protocolFee2);

    // Token1 swap: transfer in currentAmount1 + newAmount1 + fees
    const token1SwapIn = currentAmount1.add(newAmount1).add(totalFees1);

    // Token2 swap: transfer in newAmount2 + currentAmount2 + fees (token2), newAmount1 - currentAmount1 (token1)
    // We don't know newAmount2 (user chooses), so we show the formula
    const token2SwapInToken1 = newAmount1.sub(currentAmount1);
    // For token2, it's: newAmount2 + currentAmount2 + fees
    // We'll estimate assuming same ratio: newAmount2 = newAmount1 * currentAmount2 / currentAmount1
    let estimatedNewAmount2 = ethers.BigNumber.from(0);
    if (!currentAmount1.isZero()) {
        estimatedNewAmount2 = newAmount1.mul(currentAmount2).div(currentAmount1);
    }
    const token2SwapInToken2 = estimatedNewAmount2.add(currentAmount2).add(totalFees2);

    // Calculate USD PnL if WETH/USDC
    let usdPnLAvailable = false;
    let tokenDistanceUSD = 0;
    let tokenDistanceEth = 0;
    let swapFeeUSD = 0;
    let swapFeeEth = 0;
    let protocolFeeUSD = 0;
    let protocolFeeEth = 0;
    let netPnLUSD = 0;
    let reportedPrice = 0;
    let wethAmountForLive = 0;

    const isWethUsdc = (
        (token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase() &&
         token2Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase()) ||
        (token1Info.address.toLowerCase() === USDC_ADDRESS.toLowerCase() &&
         token2Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase())
    );

    if (isWethUsdc && ethPrice) {
        usdPnLAvailable = true;

        // Determine which is WETH and which is USDC
        let wethAmount, usdcAmount, wethFee, usdcFee, wethProtocolFee, usdcProtocolFee;

        if (token1Info.address.toLowerCase() === WETH_ADDRESS.toLowerCase()) {
            wethAmount = currentAmount1;
            usdcAmount = currentAmount2;
            wethFee = swapFee1;
            wethProtocolFee = protocolFee1;
            usdcFee = swapFee2;
            usdcProtocolFee = protocolFee2;
        } else {
            wethAmount = currentAmount2;
            usdcAmount = currentAmount1;
            wethFee = swapFee2;
            wethProtocolFee = protocolFee2;
            usdcFee = swapFee1;
            usdcProtocolFee = protocolFee1;
        }

        // Get amounts as floats
        const wethFloat = parseFloat(ethers.utils.formatUnits(wethAmount, 18));
        const usdcFloat = parseFloat(ethers.utils.formatUnits(usdcAmount, 6));

        // Calculate fees
        const wethFeeFloat = parseFloat(ethers.utils.formatUnits(wethFee, 18));
        const wethProtocolFeeFloat = parseFloat(ethers.utils.formatUnits(wethProtocolFee, 18));

        // Store ETH values for live updates
        swapFeeEth = wethFeeFloat;
        protocolFeeEth = wethProtocolFeeFloat;

        // Token distance = |current ETH price - reported price| * WETH amount
        // Reported price is usdcAmount / wethAmount
        reportedPrice = wethFloat > 0 ? usdcFloat / wethFloat : 0;
        const priceDiff = Math.abs(ethPrice - reportedPrice);
        tokenDistanceEth = (priceDiff * wethFloat) / ethPrice; // Convert USD distance to ETH
        wethAmountForLive = wethFloat; // Store for live updates

        // Calculate USD values
        swapFeeUSD = swapFeeEth * ethPrice;
        protocolFeeUSD = protocolFeeEth * ethPrice;
        tokenDistanceUSD = priceDiff * wethFloat; // This is already in USD

        // Include dispute gas cost
        const disputeGasCost = calculateDisputeGasCost();
        const disputeGasCostUsd = disputeGasCost ? parseFloat(ethers.utils.formatUnits(disputeGasCost, 18)) * ethPrice : 0;

        // Include settle cost if disputer wins (they become reporter and may need to self-settle)
        let settleCostUsd = 0;
        if (report) {
            const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
            if (settleGasCost && report.settlerReward) {
                const netSettlerReward = report.settlerReward.sub(settleGasCost);
                if (netSettlerReward.lt(0)) {
                    settleCostUsd = parseFloat(ethers.utils.formatUnits(netSettlerReward.abs(), 18)) * ethPrice;
                }
            }
        }

        netPnLUSD = tokenDistanceUSD - swapFeeUSD - protocolFeeUSD - disputeGasCostUsd - settleCostUsd;
    }

    return {
        newAmount1,
        escalationHalted,
        token1SwapIn,
        token2SwapInToken1,
        token2SwapInToken2,
        usdPnLAvailable,
        tokenDistanceUSD,
        tokenDistanceEth,
        swapFeeUSD,
        swapFeeEth,
        protocolFeeUSD,
        protocolFeeEth,
        netPnLUSD,
        wethFloat: wethAmountForLive,
        reportedPrice
    };
}

function showError(msg) {
    const box = document.getElementById('errorBox');
    box.textContent = msg;
    box.style.display = 'block';
}

function hideError() {
    document.getElementById('errorBox').style.display = 'none';
}

function showWarning(msg) {
    const box = document.getElementById('warningBox');
    box.textContent = msg;
    box.style.display = 'block';
}

function hideWarning() {
    document.getElementById('warningBox').style.display = 'none';
}

function showLoading() {
    document.getElementById('loadingBox').style.display = 'block';
    document.getElementById('resultBox').innerHTML = '';
}

function hideLoading() {
    document.getElementById('loadingBox').style.display = 'none';
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    init();

    document.getElementById('reportId').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchReport();
        }
    });
});

// Tab switching
function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tabIndex = tab === 'single' ? 1 : tab === 'overview' ? 2 : 3;
    document.querySelector(`.tab:nth-child(${tabIndex})`).classList.add('active');

    // Update tab content
    document.getElementById('singleTab').classList.toggle('active', tab === 'single');
    document.getElementById('overviewTab').classList.toggle('active', tab === 'overview');
    document.getElementById('wrapTab').classList.toggle('active', tab === 'wrap');

    // Auto-load overview if switching to it and grid is empty
    if (tab === 'overview' && document.getElementById('reportsGrid').innerHTML === '') {
        loadOverview(true); // autoDetect = true for initial load
    }

    // Refresh balances when switching to wrap tab
    if (tab === 'wrap') {
        refreshWrapBalances();
    }
}

// Race getData for range
async function raceGetDataRange(startId, endId) {
    const racePromises = providers.map((p, i) => {
        const contract = new ethers.Contract(DATA_PROVIDER_ADDRESS, DATA_PROVIDER_ABI, p);
        const startTime = performance.now();

        return contract['getData(uint256,uint256)'](startId, endId)
            .then(result => {
                const elapsed = (performance.now() - startTime).toFixed(0);
                console.log(`RPC ${i} (range) responded in ${elapsed}ms`);
                return { result, elapsed };
            })
            .catch(err => {
                console.warn(`RPC ${i} (range) failed:`, err.message);
                throw err;
            });
    });

    return Promise.any(racePromises);
}

// Load overview - autoDetect=true fetches last 200, autoDetect=false uses manual inputs
async function loadOverview(autoDetect = false) {
    document.getElementById('overviewLoading').style.display = 'block';
    document.getElementById('reportsGrid').innerHTML = '';
    document.getElementById('overviewStats').textContent = '';

    let startId, endId;

    if (autoDetect) {
        try {
            // Get the latest reportId from oracle - race providers for speed
            console.log('Fetching nextReportId...');
            const nextIdPromises = providers.map(p => {
                const contract = new ethers.Contract(ORACLE_ADDRESS, ORACLE_ABI, p);
                return contract.nextReportId();
            });
            const nextId = await Promise.any(nextIdPromises);
            endId = nextId.toNumber();
            startId = Math.max(1, endId - 200);

            document.getElementById('overviewStartId').value = startId;
            document.getElementById('overviewEndId').value = endId;

            console.log(`Auto-loading last 200 reports: ${startId} to ${endId}`);
        } catch (e) {
            console.error('Failed to get nextReportId:', e);
            // Fallback to manual values
            startId = parseInt(document.getElementById('overviewStartId').value) || 1;
            endId = parseInt(document.getElementById('overviewEndId').value) || 100;
        }
    } else {
        // Use manual values
        startId = parseInt(document.getElementById('overviewStartId').value) || 1;
        endId = parseInt(document.getElementById('overviewEndId').value) || 100;
        console.log(`Loading manual range: ${startId} to ${endId}`);
    }

    if (endId <= startId) {
        document.getElementById('overviewLoading').style.display = 'none';
        return;
    }

    try {
        // Break into chunks of 200
        const CHUNK_SIZE = 200;
        const chunks = [];
        for (let i = startId; i < endId; i += CHUNK_SIZE) {
            chunks.push({ start: i, end: Math.min(i + CHUNK_SIZE, endId) });
        }

        console.log(`Loading reports ${startId} to ${endId} in ${chunks.length} chunk(s)...`);

        // Fetch all chunks in parallel
        const chunkPromises = chunks.map(chunk =>
            raceGetDataRange(chunk.start, chunk.end)
                .then(r => r.result)
                .catch(err => {
                    console.error(`Chunk ${chunk.start}-${chunk.end} failed:`, err);
                    return [];
                })
        );

        const chunkResults = await Promise.all(chunkPromises);
        const reports = chunkResults.flat();

        let awaiting = 0;
        let disputed = 0;
        let skipped = 0;

        const grid = document.getElementById('reportsGrid');
        let html = '';

        for (const report of reports) {
            // Skip settled
            if (report.isDistributed) continue;

            // Skip high callback gas
            if (report.callbackGasLimit > MAX_CALLBACK_GAS) {
                skipped++;
                continue;
            }

            const hasInitialReport = report.currentReporter !== ethers.constants.AddressZero;

            // Settlement time display
            const settlementStr = report.timeType ?
                `${report.settlementTime}s` :
                `${report.settlementTime} blks`;

            // Determine status and calculate appropriate value
            let statusClass, statusText, valueLabel, valueUsd, valueClass;

            if (!hasInitialReport) {
                // Awaiting initial report - show reporter reward
                statusClass = 'awaiting';
                statusText = 'Needs Initial Report';
                valueLabel = 'Reward';
                awaiting++;

                const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
                const submitGasCost = calculateInitialReportGasCost();
                const netSettlerReward = settleGasCost ? report.settlerReward.sub(settleGasCost) : ethers.BigNumber.from(0);
                let netReward;
                if (netSettlerReward.lt(0)) {
                    netReward = report.fee.add(netSettlerReward);
                } else {
                    netReward = report.fee;
                }
                // Subtract submission gas cost
                if (submitGasCost) {
                    netReward = netReward.sub(submitGasCost);
                }
                const rewardEth = parseFloat(ethers.utils.formatUnits(netReward, 18));
                valueUsd = ethPrice ? (rewardEth * ethPrice) : 0;
                valueClass = valueUsd >= 0 ? 'profit' : 'loss';
            } else {
                // Has initial report - show dispute opportunity
                statusClass = 'disputed';
                statusText = 'DISPUTE POSSIBLE';
                valueLabel = 'Immediate Profit';
                disputed++;

                // Calculate immediate profit: |token distance| - swap fees - burn fees
                // Token distance = difference between reported price and current ETH price
                const token1Addr = report.token1.toLowerCase();
                const token2Addr = report.token2.toLowerCase();
                const isToken1Weth = token1Addr === WETH_ADDRESS.toLowerCase();
                const isToken2Usdc = token2Addr === USDC_ADDRESS.toLowerCase();
                const isToken1Usdc = token1Addr === USDC_ADDRESS.toLowerCase();
                const isToken2Weth = token2Addr === WETH_ADDRESS.toLowerCase();

                if (ethPrice && ((isToken1Weth && isToken2Usdc) || (isToken1Usdc && isToken2Weth))) {
                    let wethAmount, usdcAmount, wethDecimals = 18, usdcDecimals = 6;
                    if (isToken1Weth) {
                        wethAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount1, wethDecimals));
                        usdcAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount2, usdcDecimals));
                    } else {
                        wethAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount2, wethDecimals));
                        usdcAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount1, usdcDecimals));
                    }

                    // Reported price vs current price
                    const reportedPrice = wethAmount > 0 ? usdcAmount / wethAmount : 0;
                    const priceDiff = Math.abs(ethPrice - reportedPrice);
                    const tokenDistanceUsd = priceDiff * wethAmount;

                    // Calculate fees in USD (fees are on the WETH amount)
                    const feePercent = report.feePercentage / 10000000; // 1e7 precision
                    const burnPercent = report.protocolFee / 10000000;
                    const swapFeeUsd = wethAmount * feePercent * ethPrice;
                    const burnFeeUsd = wethAmount * burnPercent * ethPrice;

                    // Dispute gas cost in USD
                    const disputeGasCost = calculateDisputeGasCost();
                    const disputeGasCostUsd = disputeGasCost ? parseFloat(ethers.utils.formatUnits(disputeGasCost, 18)) * ethPrice : 0;

                    // Settle cost if disputer wins (they become reporter and may need to self-settle)
                    let settleCostUsd = 0;
                    const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
                    if (settleGasCost && report.settlerReward) {
                        const netSettlerReward = report.settlerReward.sub(settleGasCost);
                        if (netSettlerReward.lt(0)) {
                            settleCostUsd = parseFloat(ethers.utils.formatUnits(netSettlerReward.abs(), 18)) * ethPrice;
                        }
                    }

                    valueUsd = tokenDistanceUsd - swapFeeUsd - burnFeeUsd - disputeGasCostUsd - settleCostUsd;
                } else {
                    valueUsd = 0; // Unknown pair
                }
                valueClass = valueUsd >= 0 ? 'profit' : 'loss';
            }

            const valueStr = Math.abs(valueUsd) >= 0.01 ? `$${valueUsd.toFixed(2)}` : `$${valueUsd.toFixed(4)}`;

            html += `
            <div class="report-box ${statusClass}" onclick="viewReport(${report.reportId})">
                <div class="report-box-header">
                    <span class="report-box-id">#${report.reportId}</span>
                    <span class="report-box-status">${statusText}</span>
                </div>
                <div class="report-box-row">
                    <span class="report-box-label">${valueLabel}</span>
                    <span class="report-box-value ${valueClass}">${valueStr}</span>
                </div>
                <div class="report-box-row">
                    <span class="report-box-label">Settle</span>
                    <span class="report-box-value">${settlementStr}</span>
                </div>
            </div>`;
        }

        grid.innerHTML = html || '<div class="overview-loading">No unsettled reports in this range</div>';
        document.getElementById('overviewStats').textContent =
            `${awaiting} open, ${disputed} disputable, ${skipped} skipped (high gas)`;

    } catch (e) {
        console.error('Overview error:', e);
        document.getElementById('reportsGrid').innerHTML =
            `<div class="overview-loading">Error loading reports: ${e.message}</div>`;
    }

    document.getElementById('overviewLoading').style.display = 'none';
}

// Click on a report box to view it
function viewReport(reportId) {
    document.getElementById('reportId').value = reportId;
    switchTab('single');
    searchReport();
}

// WETH ABI for wrap/unwrap
const WETH_ABI = [
    "function deposit() payable",
    "function withdraw(uint256 amount)",
    "function balanceOf(address) view returns (uint256)"
];

// Refresh ETH and WETH balances
async function refreshWrapBalances() {
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) {
            document.getElementById('ethBalance').textContent = 'Connect wallet';
            document.getElementById('wethBalance').textContent = 'Connect wallet';
            return;
        }
    }

    try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const ethBal = await web3Provider.getBalance(userAddress);
        document.getElementById('ethBalance').textContent =
            parseFloat(ethers.utils.formatEther(ethBal)).toFixed(6) + ' ETH';

        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, web3Provider);
        const wethBal = await wethContract.balanceOf(userAddress);
        document.getElementById('wethBalance').textContent =
            parseFloat(ethers.utils.formatEther(wethBal)).toFixed(6) + ' WETH';
    } catch (e) {
        console.error('Balance refresh error:', e);
    }
}

// Wrap ETH to WETH
async function wrapEth() {
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    const amountStr = document.getElementById('wrapAmount').value;
    if (!amountStr || parseFloat(amountStr) <= 0) {
        showError('Please enter a valid ETH amount');
        return;
    }

    try {
        const amount = ethers.utils.parseEther(amountStr);
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

        console.log(`Wrapping ${amountStr} ETH...`);
        const tx = await wethContract.deposit({ value: amount });
        console.log('TX sent:', tx.hash);

        await tx.wait();
        console.log('Wrap complete');

        document.getElementById('wrapAmount').value = '';
        refreshWrapBalances();
    } catch (e) {
        console.error('Wrap error:', e);
        showError('Wrap failed: ' + e.message);
    }
}

// Unwrap WETH to ETH
async function unwrapWeth() {
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    const amountStr = document.getElementById('unwrapAmount').value;
    if (!amountStr || parseFloat(amountStr) <= 0) {
        showError('Please enter a valid WETH amount');
        return;
    }

    try {
        const amount = ethers.utils.parseEther(amountStr);
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

        console.log(`Unwrapping ${amountStr} WETH...`);
        const tx = await wethContract.withdraw(amount);
        console.log('TX sent:', tx.hash);

        await tx.wait();
        console.log('Unwrap complete');

        document.getElementById('unwrapAmount').value = '';
        refreshWrapBalances();
    } catch (e) {
        console.error('Unwrap error:', e);
        showError('Unwrap failed: ' + e.message);
    }
}
