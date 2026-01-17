// ============ NETWORK CONFIGURATIONS ============
const NETWORKS = {
    base: {
        name: 'Base',
        chainId: '0x2105',
        chainIdDecimal: 8453,
        contracts: {
            dataProvider: '0x4ccfb84f7EB35ee23c2e91f12e9CE4Ea2927d23C',
            oracle: '0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752',
            batcher: '0x95420A44715AA90e4CAa76b8A04604B750Da67ed',
            weth: '0x4200000000000000000000000000000000000006',
            usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        },
        rpcEndpoints: [
            'https://base.drpc.org',
            'https://base-rpc.publicnode.com',
            'https://base.gateway.tenderly.co',
            'https://mainnet.base.org'  // Last - heavily rate-limited
        ],
        blockExplorer: 'https://basescan.org',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockTime: 2 // seconds
    },
    ethereum: {
        name: 'Ethereum',
        chainId: '0x1',
        chainIdDecimal: 1,
        contracts: {
            dataProvider: '0xebc117d55A9303C72E662d80b6b63B2514a68fd3',
            oracle: '0x7caE6CCBd545Ad08f0Ea1105A978FEBBE2d1a752', // Same as Base
            batcher: '0xCcFcBAbE2b43cDAE75493fb6EE66AECDdA859Eff',
            weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        },
        rpcEndpoints: [
            'https://eth.drpc.org',
            'https://ethereum-rpc.publicnode.com',
            'https://rpc.ankr.com/eth',
            'https://1rpc.io/eth',
            'https://cloudflare-eth.com'
        ],
        blockExplorer: 'https://etherscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockTime: 12 // seconds
    },
    optimism: {
        name: 'OP Mainnet',
        chainId: '0xa',
        chainIdDecimal: 10,
        contracts: {
            dataProvider: '0x4f9041CCAea126119A1fe62F40A24e7556f1357b',
            oracle: '0xf3CCE3274c32f1F344Ba48336D5EFF34dc6E145f',
            batcher: '0x6D5dCF8570572e106eF1602ef2152BC363dAeC8b',
            bountyContract: '0xF07c087414c2285f25eAde0FA6e2Dde0bE8Ce98c',
            weth: '0x4200000000000000000000000000000000000006',
            usdc: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
            op: '0x4200000000000000000000000000000000000042'
        },
        rpcEndpoints: [
            'https://optimism-rpc.publicnode.com',
            'https://1rpc.io/op',
            'https://mainnet.optimism.io',
            'https://optimism.drpc.org'  // Last - aggressive rate limiting
        ],
        blockExplorer: 'https://optimistic.etherscan.io',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockTime: 2 // seconds
    }
};

// Current network (default to Optimism)
let currentNetworkId = 'optimism';

// Getters for current network values
function getNetwork() { return NETWORKS[currentNetworkId]; }
function getContracts() { return getNetwork().contracts; }
function getRpcEndpoints() { return getNetwork().rpcEndpoints; }
function getChainId() { return getNetwork().chainId; }

// Dynamic contract address getters
function get_DATA_PROVIDER_ADDRESS() { return getContracts().dataProvider; }
function get_ORACLE_ADDRESS() { return getContracts().oracle; }
function get_BATCHER_ADDRESS() { return getContracts().batcher; }
function get_WETH_ADDRESS() { return getContracts().weth; }
function get_USDC_ADDRESS() { return getContracts().usdc; }

// Legacy constants (for compatibility - point to current network)
// These are dynamically updated by updateNetworkConstants() when network changes
let DATA_PROVIDER_ADDRESS = NETWORKS.base.contracts.dataProvider;
let ORACLE_ADDRESS = NETWORKS.base.contracts.oracle;
let BATCHER_ADDRESS = NETWORKS.base.contracts.batcher;
let WETH_ADDRESS = NETWORKS.base.contracts.weth;
let USDC_ADDRESS = NETWORKS.base.contracts.usdc;
let CHAIN_ID = NETWORKS.base.chainId;

// Update legacy constants when network changes
function updateNetworkConstants() {
    const contracts = getContracts();
    DATA_PROVIDER_ADDRESS = contracts.dataProvider;
    ORACLE_ADDRESS = contracts.oracle;
    BATCHER_ADDRESS = contracts.batcher;
    WETH_ADDRESS = contracts.weth;
    USDC_ADDRESS = contracts.usdc;
    CHAIN_ID = getChainId();

    // Update whitelisted tokens set
    WHITELISTED_TOKENS.clear();
    WHITELISTED_TOKENS.add(contracts.weth.toLowerCase());
    WHITELISTED_TOKENS.add(contracts.usdc.toLowerCase());
}

// Whitelisted token addresses - pairs with both tokens whitelisted get a checkmark
const WHITELISTED_TOKENS = new Set([
    NETWORKS.base.contracts.weth.toLowerCase(),
    NETWORKS.base.contracts.usdc.toLowerCase()
]);

// Check if both tokens in a report are whitelisted
function isWhitelistedPair(token1Address, token2Address) {
    return WHITELISTED_TOKENS.has(token1Address.toLowerCase()) &&
           WHITELISTED_TOKENS.has(token2Address.toLowerCase());
}

// Blue checkmark SVG for whitelisted pairs
const WHITELIST_CHECK = '<span class="tooltip-icon" data-tip="Whitelisted tokens"><svg style="width: 22px; height: 22px; vertical-align: middle;" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><path d="M8 12l3 3 5-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

// Red X SVG for non-whitelisted pairs
const WHITELIST_X = '<span class="tooltip-icon" data-tip="Token(s) not whitelisted"><svg style="width: 22px; height: 22px; vertical-align: middle;" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444"/><path d="M15 9l-6 6M9 9l6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

// Get whitelist icon based on token pair
function getWhitelistIcon(token1Address, token2Address) {
    return isWhitelistedPair(token1Address, token2Address) ? WHITELIST_CHECK : WHITELIST_X;
}

// Global tracking of buttons in loading state (persists across re-renders)
let loadingButtons = {};

// Button loading state helper
function setButtonLoading(button, loading, originalText = null, buttonId = null) {
    if (!button) return;

    // Generate ID from button if not provided
    const id = buttonId || button.dataset.loadingId || button.id || null;

    if (loading) {
        button.dataset.originalText = button.textContent;
        button.innerHTML = '<span class="btn-spinner"></span>Processing...';
        button.classList.add('btn-loading');
        button.disabled = true;
        if (id) loadingButtons[id] = originalText || button.dataset.originalText;
    } else {
        const text = originalText || button.dataset.originalText || 'Submit';
        button.textContent = text;
        button.classList.remove('btn-loading');
        button.disabled = false;
        if (id) delete loadingButtons[id];
    }
}

// Check if a button should be loading (call after render)
function isButtonLoading(buttonId) {
    return buttonId in loadingButtons;
}

// Apply loading state to a button if it should be loading
function applyLoadingState(button, buttonId) {
    if (loadingButtons[buttonId]) {
        button.innerHTML = '<span class="btn-spinner"></span>Processing...';
        button.classList.add('btn-loading');
        button.disabled = true;
    }
}

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
    },
    {
        "inputs": [{"name": "reportIds", "type": "uint256[]"}],
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
    "function settle(uint256 reportId) external",
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
    },
    {
        "inputs": [
            {
                "components": [
                    {"name": "reportId", "type": "uint256"},
                    {"name": "stateHash", "type": "bytes32"}
                ],
                "name": "settles",
                "type": "tuple[]"
            },
            {"name": "timestamp", "type": "uint256"},
            {"name": "blockNumber", "type": "uint256"},
            {"name": "timestampBound", "type": "uint256"},
            {"name": "blockNumberBound", "type": "uint256"}
        ],
        "name": "safeSettleReports",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Bounty contract ABI (getBounties + submitInitialReport)
const BOUNTY_ABI = [
    {
        "inputs": [{"name": "reportIds", "type": "uint256[]"}],
        "name": "getBounties",
        "outputs": [{
            "components": [
                {"name": "totalAmtDeposited", "type": "uint256"},
                {"name": "bountyStartAmt", "type": "uint256"},
                {"name": "bountyClaimed", "type": "uint256"},
                {"name": "start", "type": "uint256"},
                {"name": "forwardStartTime", "type": "uint256"},
                {"name": "roundLength", "type": "uint256"},
                {"name": "recallUnlockAt", "type": "uint256"},
                {"name": "creator", "type": "address"},
                {"name": "editor", "type": "address"},
                {"name": "bountyToken", "type": "address"},
                {"name": "bountyMultiplier", "type": "uint16"},
                {"name": "maxRounds", "type": "uint16"},
                {"name": "claimed", "type": "bool"},
                {"name": "recalled", "type": "bool"},
                {"name": "timeType", "type": "bool"},
                {"name": "recallOnClaim", "type": "bool"}
            ],
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"name": "reportId", "type": "uint256"},
            {
                "name": "p",
                "type": "tuple",
                "components": [
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
                ]
            },
            {"name": "amount1", "type": "uint256"},
            {"name": "amount2", "type": "uint256"},
            {"name": "stateHash", "type": "bytes32"},
            {"name": "timestamp", "type": "uint256"},
            {"name": "blockNumber", "type": "uint256"},
            {"name": "timestampBound", "type": "uint256"},
            {"name": "blockNumberBound", "type": "uint256"}
        ],
        "name": "submitInitialReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// RPC endpoints for racing
// RPC_ENDPOINTS now comes from getNetwork().rpcEndpoints

// Global state
let provider = null;
let providers = [];
let currentGasPrice = null;
let currentBlockNumber = null; // Cached block number for block-based bounty calculations
let blockNumberUpdatedAt = null; // Timestamp when block number was last fetched
let chainTimeOffset = 0; // Offset: chain time - local time (can be negative)

// Get estimated current block number (interpolates based on network block time)
function getEstimatedBlockNumber() {
    if (!currentBlockNumber || !blockNumberUpdatedAt) return currentBlockNumber;
    const secondsElapsed = (Date.now() - blockNumberUpdatedAt) / 1000;
    const blockTime = getNetwork().blockTime;
    const blocksElapsed = Math.floor(secondsElapsed / blockTime);
    return currentBlockNumber + blocksElapsed;
}

// Get estimated current block.timestamp (chain time, not local time)
function getEstimatedBlockTimestamp() {
    return Math.floor(Date.now() / 1000);
}

// Format settlement time: >= 1 hour in hours, >= 2 mins in mins, else seconds
function formatSettlementTime(seconds) {
    if (seconds >= 3600) {
        const hours = seconds / 3600;
        return hours === 1 ? '1 hour' : `${hours} hours`;
    } else if (seconds >= 120) {
        const mins = Math.round(seconds / 60);
        return mins === 1 ? '1 min' : `${mins} mins`;
    } else {
        return `${seconds}s`;
    }
}

// Debug: call contract to get actual block.timestamp (for comparison)
async function debugGetChainTimestamp() {
    try {
        // Simple contract call that returns block.timestamp
        const block = await Promise.any(providers.map(p => p.getBlock('latest')));
        const localTime = Math.floor(Date.now() / 1000);
        console.log(`DEBUG: block.timestamp=${block.timestamp}, localTime=${localTime}, diff=${block.timestamp - localTime}, ourEstimate=${getEstimatedBlockTimestamp()}`);
    } catch (e) {
        console.log('Debug timestamp fetch failed');
    }
}
let ethPrice = null;
let opPrice = null; // OP token price for bounty calculations
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
let myReportsTimerInterval = null; // Timer for My Reports countdowns
let pollingInterval = null; // Fallback polling for report updates (events only use first RPC)
let cachedBounties = {}; // Cache bounty data by reportId

// ============ BOUNTY FUNCTIONS ============

// Get bounty contract address for current network (null if not available)
function getBountyContractAddress() {
    const contracts = getContracts();
    return contracts.bountyContract || null;
}

// Get OP token address for current network (null if not Optimism)
function getOpTokenAddress() {
    const contracts = getContracts();
    return contracts.op || null;
}

// Fetch bounty data for an array of reportIds (batched to avoid rate limits)
async function fetchBountyData(reportIds) {
    const bountyAddr = getBountyContractAddress();
    if (!bountyAddr || reportIds.length === 0) return {};

    const BATCH_SIZE = 20;
    const BATCH_DELAY_MS = 500;
    const result = {};

    try {
        const bountyContract = new ethers.Contract(bountyAddr, BOUNTY_ABI, provider);

        // Split into batches with delay between each
        for (let i = 0; i < reportIds.length; i += BATCH_SIZE) {
            if (i > 0) await new Promise(r => setTimeout(r, BATCH_DELAY_MS));

            const batch = reportIds.slice(i, i + BATCH_SIZE);
            const bounties = await bountyContract.getBounties(batch);

            for (let j = 0; j < batch.length; j++) {
                if (bounties[j].maxRounds === 0) continue;
                result[batch[j]] = bounties[j];
            }
        }
        return result;
    } catch (e) {
        console.error('Failed to fetch bounty data:', e);
        return {};
    }
}

// Calculate current bounty amount (mirrors Solidity calcBounty)
// Pass currentTimestamp for timeType=true, currentBlockNumber for timeType=false
function calcCurrentBounty(bounty, currentTimestamp, currentBlockNumber = null) {
    if (bounty.claimed || bounty.recalled) return ethers.BigNumber.from(0);

    const start = ethers.BigNumber.from(bounty.start);
    // timeType: true = use timestamp, false = use block number
    const currentTime = bounty.timeType
        ? ethers.BigNumber.from(currentTimestamp)
        : ethers.BigNumber.from(currentBlockNumber || 0);

    // Bounty hasn't started yet
    if (currentTime.lt(start)) {
        return ethers.BigNumber.from(bounty.bountyStartAmt);
    }

    const roundLength = ethers.BigNumber.from(bounty.roundLength);
    let rounds = currentTime.sub(start).div(roundLength).toNumber();
    if (rounds > bounty.maxRounds) {
        rounds = bounty.maxRounds;
    }

    // Calculate: bounty = bountyStartAmt * (bountyMultiplier/10000)^rounds
    let bountyAmt = ethers.BigNumber.from(bounty.bountyStartAmt);
    for (let i = 0; i < rounds; i++) {
        bountyAmt = bountyAmt.mul(bounty.bountyMultiplier).div(10000);
    }

    // Cap at totalAmtDeposited
    if (bountyAmt.gt(bounty.totalAmtDeposited)) {
        bountyAmt = ethers.BigNumber.from(bounty.totalAmtDeposited);
    }

    return bountyAmt;
}

// Get bounty token symbol and decimals
// BOUNTY CONTRACT ONLY: address(0) = ETH for bounty payments (NOT the same as WETH)
function getBountyTokenInfo(bountyTokenAddr) {
    const opAddr = getOpTokenAddress();

    // Bounty contract uses address(0) for native ETH payments
    if (bountyTokenAddr === ethers.constants.AddressZero) {
        return { symbol: 'ETH', decimals: 18 };
    } else if (opAddr && bountyTokenAddr.toLowerCase() === opAddr.toLowerCase()) {
        return { symbol: 'OP', decimals: 18 };
    } else if (bountyTokenAddr.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
        return { symbol: 'USDC', decimals: 6 };
    } else {
        return { symbol: 'TOKEN', decimals: 18 }; // Unknown token - will be filtered out
    }
}

// Check if bounty is valid (ETH, OP, or USDC - not claimed/recalled)
function isValidBounty(bounty) {
    if (!bounty || bounty.claimed || bounty.recalled || bounty.maxRounds === 0) return false;
    const tokenInfo = getBountyTokenInfo(bounty.bountyToken);
    return tokenInfo.symbol === 'ETH' || tokenInfo.symbol === 'OP' || tokenInfo.symbol === 'USDC';
}

// Check if bounty is claimable (start time has passed)
// Returns { claimable: bool, timeUntilClaimable: number (seconds or blocks), timeType: bool }
function isBountyClaimable(bounty, currentTimestamp, currentBlockNumber) {
    if (!bounty) return { claimable: false, timeUntilClaimable: 0, timeType: true };

    const start = ethers.BigNumber.from(bounty.start);
    const currentTime = bounty.timeType
        ? ethers.BigNumber.from(currentTimestamp)
        : ethers.BigNumber.from(currentBlockNumber || 0);

    if (currentTime.gte(start)) {
        return { claimable: true, timeUntilClaimable: 0, timeType: bounty.timeType };
    } else {
        const diff = start.sub(currentTime).toNumber();
        return { claimable: false, timeUntilClaimable: diff, timeType: bounty.timeType };
    }
}

// Format seconds into human-readable countdown string
function formatCountdown(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    }
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Format bounty amount for display
function formatBountyAmount(amount, tokenInfo) {
    const formatted = parseFloat(ethers.utils.formatUnits(amount, tokenInfo.decimals));
    if (formatted >= 1) {
        return `${formatted.toFixed(3)} ${tokenInfo.symbol}`;
    } else {
        return `${formatted.toFixed(6)} ${tokenInfo.symbol}`;
    }
}

// Gas for submitting through bounty contract (~370k)
const BOUNTY_SUBMIT_GAS = 370000;

// Initialize providers for current network
function initProviders() {
    const rpcEndpoints = getRpcEndpoints();
    const chainId = getNetwork().chainIdDecimal;
    providers = rpcEndpoints.map(url => new ethers.providers.StaticJsonRpcProvider(url, chainId));
    provider = providers[0];

    // Create oracle contract for event listening
    oracleContract = new ethers.Contract(ORACLE_ADDRESS, ORACLE_ABI, provider);

    console.log(`Initialized ${providers.length} RPC providers for ${getNetwork().name}`);
}

// Switch to a different network
async function switchNetwork(networkId) {
    if (!NETWORKS[networkId]) {
        console.error('Unknown network:', networkId);
        return false;
    }

    if (networkId === currentNetworkId) {
        console.log('Already on', networkId);
        return true;
    }

    console.log(`Switching from ${currentNetworkId} to ${networkId}...`);

    // Clean up current state
    cleanupEventListeners();
    stopMyReportsTimer();
    stopBountyUpdateTimer();
    stopOpGrantUpdateTimer();
    cachedBounties = {};
    opGrantGames = [];

    // Switch network
    currentNetworkId = networkId;
    updateNetworkConstants();

    // Reinitialize providers
    initProviders();

    // Clear current report state
    currentReport = null;
    currentReportId = null;
    currentDisputeInfo = null;
    currentDisputeSwapInfo = null;

    // Clear UI
    document.getElementById('resultBox').innerHTML = '';
    document.getElementById('reportsGrid').innerHTML = '';
    document.getElementById('myReportsGrid').innerHTML = '';
    document.getElementById('reportId').value = '';

    // Update UI to show current network
    updateNetworkUI();

    // Immediately fetch gas price for new network
    updateGasPrice();

    // Reload current tab content for the new network
    if (document.getElementById('overviewTab').classList.contains('active')) {
        loadOverview(true);
    } else if (document.getElementById('myReportsTab').classList.contains('active')) {
        loadMyReports();
    }

    // Request wallet to switch network if connected
    if (window.ethereum && userAddress) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: getChainId() }]
            });
            // Recreate signer for new network
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = web3Provider.getSigner();
        } catch (switchError) {
            // Chain not added to wallet - try to add it
            if (switchError.code === 4902) {
                const network = getNetwork();
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: network.chainId,
                            chainName: network.name,
                            nativeCurrency: network.nativeCurrency,
                            rpcUrls: [network.rpcEndpoints[0]],
                            blockExplorerUrls: [network.blockExplorer]
                        }]
                    });
                    // Recreate signer for new network
                    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                    signer = web3Provider.getSigner();
                } catch (addError) {
                    console.error('Failed to add network:', addError);
                }
            } else {
                console.error('Failed to switch network:', switchError);
            }
        }
    }

    console.log(`Switched to ${getNetwork().name}`);
    return true;
}

// Update network indicator in UI
function updateNetworkUI() {
    // Update button active states
    document.querySelectorAll('.network-btn').forEach(btn => {
        const network = btn.getAttribute('data-network');
        if (network === currentNetworkId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update any network name displays
    const networkName = document.getElementById('networkName');
    if (networkName) {
        networkName.textContent = getNetwork().name;
    }

    // Show/hide OP Grant tab based on network
    updateOpGrantTabVisibility();

    // If currently on OP Grant tab but switched away from Optimism, go to Single Instance
    if (!isOpGrantAvailable() && document.getElementById('opgrantTab')?.classList.contains('active')) {
        switchTab('single');
    }
}

// Initialize providers and start price feeds
async function init() {
    try {
        // Update constants for current network (important when defaulting to non-Base)
        updateNetworkConstants();

        // Initialize providers for current network
        initProviders();

        // Start gas price updates
        updateGasPrice();
        setInterval(updateGasPrice, 10000);

        // Start ETH price feed via Coinbase
        connectCoinbaseWs();

        // Start OP price updates (for bounty calculations)
        startOpPriceUpdates();

        // Update network UI
        updateNetworkUI();

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
    // Event params: reportId, reporter, amount1, amount2, token1, token2, swapFee, protocolFee,
    //               settlementTime, disputeDelay, escalationHalt, timeType, callbackContract,
    //               callbackSelector, trackDisputes, callbackGasLimit, stateHash, blockTimestamp
    const initialFilter = oracleContract.filters.InitialReportSubmitted(reportIdBN);
    const initialHandler = (rid, reporter, amount1, amount2, ...rest) => {
        const eventStateHash = rest[12]; // stateHash is 13th param after the first 4
        console.log(`Event: InitialReportSubmitted for report #${rid.toString()} by ${reporter}`);
        if (rid.eq(reportIdBN)) {
            // Skip if this is our own action (same address + stateHash + recent)
            if (userAddress &&
                reporter.toLowerCase() === userAddress.toLowerCase() &&
                lastSubmittedStateHash &&
                eventStateHash === lastSubmittedStateHash &&
                Date.now() - lastUserRefreshTime < 5000) {
                console.log('Skipping event refresh - our own submission (stateHash verified)');
                return;
            }
            refreshCurrentReport();
        }
    };
    oracleContract.on(initialFilter, initialHandler);
    eventListeners.push({ filter: initialFilter, handler: initialHandler });

    // ReportDisputed
    // Event params: same structure as InitialReportSubmitted
    const disputeFilter = oracleContract.filters.ReportDisputed(reportIdBN);
    const disputeHandler = (rid, disputer, newAmount1, newAmount2, ...rest) => {
        const eventStateHash = rest[12]; // stateHash is 13th param after the first 4
        console.log(`Event: ReportDisputed for report #${rid.toString()} by ${disputer}`);
        if (rid.eq(reportIdBN)) {
            // Skip if this is our own action (same address + stateHash + recent)
            if (userAddress &&
                disputer.toLowerCase() === userAddress.toLowerCase() &&
                lastSubmittedStateHash &&
                eventStateHash === lastSubmittedStateHash &&
                Date.now() - lastUserRefreshTime < 5000) {
                console.log('Skipping event refresh - our own dispute (stateHash verified)');
                return;
            }
            refreshCurrentReport();
        }
    };
    oracleContract.on(disputeFilter, disputeHandler);
    eventListeners.push({ filter: disputeFilter, handler: disputeHandler });

    // ReportSettled - no address to check, but settlements don't change state much
    // and double-refresh on settle is less problematic
    const settleFilter = oracleContract.filters.ReportSettled(reportIdBN);
    const settleHandler = (rid, price, settlementTimestamp, blockTimestamp) => {
        console.log(`Event: ReportSettled for report #${rid.toString()}`);
        if (rid.eq(reportIdBN)) {
            // For settle, just use the timestamp since anyone can settle
            // and we already refreshed after our own settle
            if (Date.now() - lastUserRefreshTime < 5000) {
                console.log('Skipping event refresh - recent settle action');
                return;
            }
            refreshCurrentReport();
        }
    };
    oracleContract.on(settleFilter, settleHandler);
    eventListeners.push({ filter: settleFilter, handler: settleHandler });

    console.log(`Listening for events on report #${reportId}`);

    // Also start periodic polling as fallback (event listener only uses first RPC)
    // This uses all RPCs via race mechanism
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = setInterval(() => {
        refreshCurrentReport();
    }, 5000); // Poll every 5 seconds
    console.log(`Polling fallback started for report #${reportId}`);

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

    // Stop polling fallback
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }

    // Hide UI indicator
    const eventStatus = document.getElementById('eventStatus');
    if (eventStatus) eventStatus.style.display = 'none';

    // Stop breakeven update timer
    stopBreakevenUpdateTimer();

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

        const now = getEstimatedBlockTimestamp();
        const remaining = settlementTargetTime - now;
        console.log(`Countdown tick: remaining=${remaining}s`);

        if (remaining <= 0) {
            // Refresh display to show Settle button (force re-render to update UI even if on-chain data unchanged)
            stopCountdown();
            refreshCurrentReport(true);
            return;
        } else {
            // Format as mm:ss or just seconds
            if (remaining >= 60) {
                const mins = Math.floor(remaining / 60);
                const secs = remaining % 60;
                el.textContent = `${mins}m ${secs}s`;
            } else {
                el.textContent = `${remaining}s`;
            }
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
let isRefreshing = false; // Guard against concurrent refreshes
let lastUserRefreshTime = 0; // Timestamp of last user-initiated refresh (to skip event-triggered duplicates)
let lastSubmittedStateHash = null; // StateHash from our last submission (to verify event matches)

async function refreshCurrentReport(forceRerender = false) {
    if (!currentReportId) return;
    if (isRefreshing) {
        console.log('Refresh already in progress, skipping');
        return;
    }

    isRefreshing = true;
    console.log(`Refreshing report #${currentReportId}...`);

    try {
        const raceResult = await raceGetData(currentReportId);
        const data = raceResult.result;

        if (!data || data.length === 0) return;

        const report = data[0];

        // Only re-render if data actually changed (unless forceRerender is true)
        if (!forceRerender && currentReport &&
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

        // Preserve bounty data from current report
        const bountyData = currentReport?.bountyData || null;

        // Update global state
        currentReport = { ...report, token1Info, token2Info, bountyData };

        // Re-render
        renderReport(report, token1Info, token2Info, bountyData);

        console.log(`Report refreshed from block ${raceResult.blockNum}`);
    } catch (e) {
        console.error('Error refreshing report:', e);
    } finally {
        isRefreshing = false;
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
                const rpcEndpoints = getRpcEndpoints();
                const rpcName = rpcEndpoints[i].split('//')[1].split('/')[0];
                console.log(`RPC ${i} (${rpcName}) responded in ${elapsed}ms at block ${blockNum}`);

                const response = { result, rpc: rpcEndpoints[i], elapsed, blockNum };

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
                const reason = err.message?.includes('quota') ? 'rate limited' : 'failed';
                console.log(`RPC ${i} ${reason}`);
            });
    });

    return firstPromise;
}

let gasProviderIndex = 0;

async function updateGasPrice() {
    try {
        // Race all providers for gas price
        const blockPromises = providers.map(p =>
            p.getBlock('latest').then(block => {
                if (!block) throw new Error('No block');
                return block;
            })
        );

        const block = await Promise.any(blockPromises);

        // Cache block number for block-based calculations
        currentBlockNumber = block.number;
        blockNumberUpdatedAt = Date.now();

        // Calculate chain time offset: how far ahead/behind is chain time vs local time
        const localTimeSec = Math.floor(Date.now() / 1000);
        const newOffset = block.timestamp - localTimeSec;
        console.log(`Chain sync: block.timestamp=${block.timestamp}, localTime=${localTimeSec}, offset=${newOffset}s`);
        chainTimeOffset = newOffset;

        if (block.baseFeePerGas) {
            // Use baseFee + small priority fee buffer
            const priorityFee = ethers.utils.parseUnits('0.001', 'gwei'); // minimal priority on L2
            currentGasPrice = block.baseFeePerGas.add(priorityFee);
        } else {
            // Fallback to getFeeData for chains without EIP-1559
            const feeData = await providers[0].getFeeData();
            currentGasPrice = feeData.gasPrice;
        }

        document.getElementById('gasPrice').textContent =
            parseFloat(ethers.utils.formatUnits(currentGasPrice, 'gwei')).toFixed(4);

        // Update breakeven volatility if report pane is open (gas affects net reward)
        updateBreakevenVolatility();
    } catch (e) {
        console.log('Gas price update failed');
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

        ws.onerror = () => {
            console.log('Coinbase WS error, will reconnect...');
        };
    } catch (e) {
        console.error('WS error:', e);
        setTimeout(connectCoinbaseWs, 5000);
    }
}

// OP price sources - use multiple for redundancy
let opPriceCoingecko = null;
let opPriceCryptocompare = null;

async function fetchOpPriceCoingecko() {
    try {
        const resp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=optimism&vs_currencies=usd');
        if (!resp.ok) {
            console.log('CoinGecko rate limited');
            return;
        }
        const data = await resp.json();
        if (data.optimism && data.optimism.usd) {
            opPriceCoingecko = data.optimism.usd;
            updateOpPrice();
            console.log('OP price (CoinGecko):', opPriceCoingecko);
        }
    } catch (e) {
        console.log('CoinGecko unavailable');
    }
}

async function fetchOpPriceCryptocompare() {
    try {
        const resp = await fetch('https://min-api.cryptocompare.com/data/price?fsym=OP&tsyms=USD');
        if (!resp.ok) {
            console.log('CryptoCompare rate limited');
            return;
        }
        const data = await resp.json();
        if (data.USD) {
            opPriceCryptocompare = data.USD;
            updateOpPrice();
            console.log('OP price (CryptoCompare):', opPriceCryptocompare);
        }
    } catch (e) {
        console.log('CryptoCompare unavailable');
    }
}

function updateOpPrice() {
    // Average available sources, or use whichever is available
    if (opPriceCoingecko && opPriceCryptocompare) {
        opPrice = (opPriceCoingecko + opPriceCryptocompare) / 2;
    } else {
        opPrice = opPriceCoingecko || opPriceCryptocompare;
    }
}

function startOpPriceUpdates() {
    // Initial fetch from both sources
    fetchOpPriceCoingecko();
    fetchOpPriceCryptocompare();
    // Stagger updates: CoinGecko at 0s, 30s, 60s... CryptoCompare at 15s, 45s, 75s...
    setInterval(fetchOpPriceCoingecko, 30000);
    setTimeout(() => setInterval(fetchOpPriceCryptocompare, 30000), 15000);
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
        await ensureCorrectChain();

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
        await ensureCorrectChain();

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

// Ensure we're on the correct chain for current network
async function ensureCorrectChain() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const targetChainId = getChainId();
    if (chainId !== targetChainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: targetChainId }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                const network = getNetwork();
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: targetChainId,
                        chainName: network.name,
                        nativeCurrency: network.nativeCurrency,
                        rpcUrls: [network.rpcEndpoints[0]],
                        blockExplorerUrls: [network.blockExplorer]
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
        if (chainId !== getChainId()) {
            showError(`Please switch to ${getNetwork().name} network`);
        }
    });
}

function toggleReportPane() {
    const pane = document.getElementById('reportPane');
    if (pane.style.display === 'none' || !pane.style.display) {
        pane.style.display = 'block';
        // Show breakeven immediately if token1 is WETH (no input needed)
        updateBreakevenVolatility();
        // Start live update timer if there's a bounty (bounty escalates over time)
        startBreakevenUpdateTimer();
    } else {
        pane.style.display = 'none';
        stopBreakevenUpdateTimer();
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

    // Elements don't exist until report pane is rendered
    if (!breakevenRow || !breakevenValueEl) return;

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
    let rewardEth = parseFloat(ethers.utils.formatUnits(netReporterReward, 18));

    // Add bounty value converted to ETH equivalent (only if claimable)
    const bountyData = currentReport.bountyData;
    if (isValidBounty(bountyData)) {
        const now = getEstimatedBlockTimestamp();
        const currentBlock = getEstimatedBlockNumber();
        const claimable = isBountyClaimable(bountyData, now, currentBlock);

        // Only include bounty if it's actually claimable
        if (claimable.claimable) {
            const bountyAmt = calcCurrentBounty(bountyData, now, currentBlock);
            const tokenInfo = getBountyTokenInfo(bountyData.bountyToken);
            const bountyFloat = parseFloat(ethers.utils.formatUnits(bountyAmt, tokenInfo.decimals));

            if (tokenInfo.symbol === 'ETH') {
                rewardEth += bountyFloat;
            } else if (tokenInfo.symbol === 'OP' && opPrice && ethPrice) {
                // Convert OP to ETH: (OP amount * OP price in USD) / ETH price in USD
                const bountyEth = (bountyFloat * opPrice) / ethPrice;
                rewardEth += bountyEth;
            }
        }
    }

    // If reward is negative, breakeven volatility doesn't apply
    const reportWarning = document.getElementById('reportUnprofitableWarning');
    if (rewardEth < 0) {
        breakevenValueEl.textContent = 'N/A';
        breakevenValueEl.className = 'pane-value negative';
        breakevenRow.style.display = 'flex';
        if (reportWarning) reportWarning.style.display = 'block';
        return;
    }
    if (reportWarning) reportWarning.style.display = 'none';

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

    // Breakeven volatility: R* = (b + f) / (1 + f)
    // where b = profit/position, f = fee rate
    // Symmetric for UP and DOWN: assumes adversary picks worst tokenToSwap
    // Loss(R) = Position × [(1+f)R - f], set equal to b × Position, solve for R
    const feeRate = report.feePercentage / 10000000; // swap fee rate
    const b = rewardEth / wethAmount;
    const breakeven = (b + feeRate) / (1 + feeRate) * 100;

    // Format settlement time for display
    let timeStr;
    if (report.timeType) {
        // Seconds - convert to minutes
        const mins = report.settlementTime / 60;
        timeStr = mins >= 1 ? `${mins.toFixed(0)} min` : `${report.settlementTime}s`;
    } else {
        // Blocks
        timeStr = `${report.settlementTime} blocks`;
    }

    breakevenValueEl.textContent = `±${breakeven.toFixed(2)}% for ${timeStr}`;
    breakevenValueEl.className = `pane-value ${breakeven > 0.1 ? 'positive' : breakeven > 0.01 ? '' : 'negative'}`;
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
    // Profit is based on the CURRENT amounts you're taking from the old reporter,
    // not the NEW amounts you're putting up
    const newAmount1Float = parseFloat(ethers.utils.formatUnits(newAmount1, token1Info.decimals));
    const newAmount2Float = amount2Value;
    const currentAmount1Float = parseFloat(ethers.utils.formatUnits(currentAmount1, token1Info.decimals));
    const currentAmount2Float = parseFloat(ethers.utils.formatUnits(currentAmount2, token2Info.decimals));

    // Your implied price vs their implied price
    const yourPrice = newAmount1Float > 0 ? newAmount2Float / newAmount1Float : 0;
    const theirPrice = currentAmount1Float > 0 ? currentAmount2Float / currentAmount1Float : 0;
    const priceDiff = Math.abs(yourPrice - theirPrice);

    // Token distance = price difference * currentAmount1 (what you're taking)
    const tokenDistanceToken2 = priceDiff * currentAmount1Float;

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
    // R* = (b + f) / (1 + f) - symmetric for both directions
    // Loss(R) = Position × [(1+f)R - f], set equal to b × Position
    const breakevenEl = document.getElementById('disputeBreakeven');
    const disputeWarning = document.getElementById('disputeUnprofitableWarning');
    if (immediatePnL < 0) {
        // Negative PnL means no breakeven - you're already losing
        breakevenEl.textContent = 'N/A';
        breakevenEl.className = 'pane-value negative';
        if (disputeWarning) disputeWarning.style.display = 'block';
    } else {
        if (disputeWarning) disputeWarning.style.display = 'none';
        const feeRate = report.feePercentage / 10000000; // swap fee rate
        const b = amount2Value > 0 ? immediatePnL / amount2Value : 0;
        const breakeven = (b + feeRate) / (1 + feeRate) * 100;
        // Format settlement time for display
        let timeStr;
        if (report.timeType) {
            const mins = report.settlementTime / 60;
            timeStr = mins >= 1 ? `${mins.toFixed(0)} min` : `${report.settlementTime}s`;
        } else {
            timeStr = `${report.settlementTime} blocks`;
        }
        breakevenEl.textContent = `±${breakeven.toFixed(2)}% for ${timeStr}`;
        breakevenEl.className = `pane-value ${breakeven > 0.1 ? 'positive' : breakeven > 0.01 ? '' : 'negative'}`;
    }

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

    // Recommend based on which token the user thinks is overvalued in the current report
    // If user's price (newAmount2/newAmount1) > report's price (currentAmount2/currentAmount1),
    // user thinks token1 is worth MORE than reported → token1 is undervalued → swap token2
    // If user's price < report's price, token1 is overvalued → swap token1
    let recommendToken1 = true;

    if (newAmount1Float > 0 && currentAmount1Float > 0) {
        const userPrice = amount2Value / newAmount1Float;  // user's implied token2 per token1
        const reportPrice = currentAmount2Float / currentAmount1Float;  // report's token2 per token1

        // If user thinks price is higher → token1 undervalued in report → swap token2
        // If user thinks price is lower → token1 overvalued in report → swap token1
        recommendToken1 = userPrice < reportPrice;
    }

    if (recommendToken1) {
        recommendedSwapEl.textContent = token1Info.symbol;
        transferInEl.innerHTML = token1SwapTransferStr;
    } else {
        recommendedSwapEl.textContent = token2Info.symbol;
        transferInEl.innerHTML = token2SwapTransferStr;
    }

    // Display position worth (newAmount1 + newAmount2)
    const positionWorthEl = document.getElementById('disputePositionWorth');
    positionWorthEl.textContent = `${formatTokenAmount(newAmount1, token1Info.decimals, token1Info.symbol)} + ${formatTokenAmount(newAmount2, token2Info.decimals, token2Info.symbol)}`;

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

// Get gas overrides with priority fee = 25% of base fee
async function getGasOverrides() {
    try {
        const feeData = await providers[0].getFeeData();
        if (feeData.lastBaseFeePerGas) {
            // EIP-1559: set priority to 25% of base, max fee to 125% of base
            const baseFee = feeData.lastBaseFeePerGas;
            const priorityFee = baseFee.div(4); // 25%
            const maxFee = baseFee.add(priorityFee); // base + 25%
            console.log(`Gas override: base=${ethers.utils.formatUnits(baseFee, 'gwei')} gwei, priority=${ethers.utils.formatUnits(priorityFee, 'gwei')} gwei`);
            return {
                maxPriorityFeePerGas: priorityFee,
                maxFeePerGas: maxFee
            };
        }
    } catch (e) {
        console.warn('Failed to get gas overrides, using defaults:', e);
    }
    return {}; // Fall back to wallet defaults
}

// Get fresh block info for safe batcher time bounds - use highest block from all RPCs
// forSettle=true uses relaxed bounds (5 min), forSettle=false uses strict bounds (1 min)
async function getFreshBlockInfo(forSettle = false) {
    const blockPromises = providers.map((p, i) =>
        p.getBlock('latest')
            .then(block => {
                console.log(`Block info from RPC ${i}: block ${block.number}, ts ${block.timestamp}`);
                return block;
            })
            .catch(e => {
                console.warn(`RPC ${i} block fetch failed:`, e.message);
                return null;
            })
    );
    const results = await Promise.all(blockPromises);
    const blocks = results.filter(b => b !== null);

    if (blocks.length === 0) {
        throw new Error('All RPCs failed to get block info');
    }

    // Use the highest block number (most up-to-date)
    const block = blocks.reduce((best, curr) =>
        curr.number > best.number ? curr : best
    );
    console.log(`Using highest block: ${block.number}, timestamp: ${block.timestamp}`);

    // Network-aware block bounds: L1 has 12s blocks, L2 has 2s blocks
    const isL1 = currentNetworkId === 'ethereum';

    if (forSettle) {
        // Relaxed bounds for settle (5 min / 25 blocks)
        return {
            timestamp: block.timestamp,
            blockNumber: block.number,
            timestampBound: 300,  // +5 minutes
            blockNumberBound: 25  // +25 blocks (~5 min on L1)
        };
    } else {
        // Strict bounds for report/dispute (1 min)
        return {
            timestamp: block.timestamp,
            blockNumber: block.number,
            timestampBound: 60,  // +60 seconds
            blockNumberBound: isL1 ? 5 : 30  // L1: 5 blocks (~1 min), L2: 30 blocks (~1 min)
        };
    }
}

async function submitDispute() {
    const submitBtn = document.querySelector('#disputePane .submit-btn');

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

    setButtonLoading(submitBtn, true);

    try {
        const report = currentReport;
        const token1Info = report.token1Info;
        const token2Info = report.token2Info;
        const swapInfo = currentDisputeSwapInfo;

        // Store stateHash so event handler can verify this is our dispute
        lastSubmittedStateHash = report.stateHash;

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
                token1Contract.approve(BATCHER_ADDRESS, swapInfo.batchAmount1)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token1 approved'))
            );
        }
        if (allowance2.lt(swapInfo.batchAmount2)) {
            console.log('Approving token2...');
            approvalPromises.push(
                token2Contract.approve(BATCHER_ADDRESS, swapInfo.batchAmount2)
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

        const gasOverrides = await getGasOverrides();
        const tx = await batcher.disputeReportSafe(
            disputeData,
            oracleParams,
            swapInfo.batchAmount1,
            swapInfo.batchAmount2,
            blockInfo.timestamp,
            blockInfo.blockNumber,
            blockInfo.timestampBound,
            blockInfo.blockNumberBound,
            gasOverrides
        );
        console.log('TX sent:', tx.hash);

        const receipt = await tx.wait();
        console.log('TX confirmed:', receipt);

        // Save to My Reports
        saveReportId(report.reportId);

        // Hide pane
        const pane = document.getElementById('disputePane');
        if (pane) pane.style.display = 'none';
        console.log('Dispute submitted successfully!');

        setButtonLoading(submitBtn, false, 'Submit Dispute');

        // Mark that we're doing a user-initiated refresh (to skip event-triggered duplicates)
        lastUserRefreshTime = Date.now();

        // Refresh the report display to show new state (skip fresher data to avoid double-refresh)
        await searchReport(true);

    } catch (e) {
        console.error('Dispute error:', e);
        setButtonLoading(submitBtn, false, 'Submit Dispute');
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
    const submitBtn = document.querySelector('#reportPane .submit-btn');

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

    setButtonLoading(submitBtn, true);

    try {
        const report = currentReport;
        const token1Info = await getTokenInfo(report.token1);
        const token2Info = await getTokenInfo(report.token2);

        const amount1 = report.exactToken1Report;
        const amount2 = ethers.utils.parseUnits(amount2Value, token2Info.decimals);
        // stateHash from contract is already bytes32, use as-is
        const stateHash = report.stateHash;

        // Store stateHash so event handler can verify this is our submission
        lastSubmittedStateHash = stateHash;

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

        // Check if there's a valid bounty - if so, submit through bounty contract
        // Also check if bounty is claimable (start time has passed)
        const bountyData = currentReport.bountyData;
        const hasValidBounty = isValidBounty(bountyData);

        // Get fresh block info to check bounty claimability
        const blockInfoForCheck = await getFreshBlockInfo();
        const bountyClaimable = hasValidBounty
            ? isBountyClaimable(bountyData, blockInfoForCheck.timestamp, blockInfoForCheck.blockNumber)
            : { claimable: false };

        // Only route through bounty contract if bounty exists AND is claimable
        const hasBounty = hasValidBounty && bountyClaimable.claimable;
        const targetContract = hasBounty ? getBountyContractAddress() : BATCHER_ADDRESS;

        console.log('Has valid bounty:', hasValidBounty);
        console.log('Bounty claimable:', bountyClaimable);
        console.log('Routing through bounty contract:', hasBounty);
        console.log('Target contract:', targetContract);

        // Check both allowances in parallel
        const [allowance1, allowance2] = await Promise.all([
            token1Contract.allowance(userAddress, targetContract),
            token2Contract.allowance(userAddress, targetContract)
        ]);
        console.log('Token1 allowance:', ethers.utils.formatUnits(allowance1, token1Info.decimals));
        console.log('Token2 allowance:', ethers.utils.formatUnits(allowance2, token2Info.decimals));

        // Fire approval transactions in parallel if needed
        const approvalPromises = [];
        if (allowance1.lt(amount1)) {
            console.log('Approving token1...');
            approvalPromises.push(
                token1Contract.approve(targetContract, amount1)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token1 approved'))
            );
        }
        if (allowance2.lt(amount2)) {
            console.log('Approving token2...');
            approvalPromises.push(
                token2Contract.approve(targetContract, amount2)
                    .then(tx => tx.wait())
                    .then(() => console.log('Token2 approved'))
            );
        }

        // Wait for all approvals to complete
        if (approvalPromises.length > 0) {
            await Promise.all(approvalPromises);
        }

        let tx;
        const gasOverrides = await getGasOverrides();

        if (hasBounty) {
            // Submit through bounty contract with oracleParams validation
            console.log('Building oracleParams and getting fresh block info for bounty submission...');
            const oracleParams = buildOracleParams(report);
            const blockInfo = await getFreshBlockInfo();

            console.log('oracleParams:', oracleParams);
            console.log('blockInfo:', blockInfo);

            const bountyContract = new ethers.Contract(targetContract, BOUNTY_ABI, signer);

            // Try to estimate gas first
            try {
                const gasEstimate = await bountyContract.estimateGas.submitInitialReport(
                    report.reportId,
                    oracleParams,
                    amount1,
                    amount2,
                    stateHash,
                    blockInfo.timestamp,
                    blockInfo.blockNumber,
                    blockInfo.timestampBound,
                    blockInfo.blockNumberBound
                );
                console.log('Gas estimate:', gasEstimate.toString());
            } catch (gasError) {
                console.error('Gas estimation failed:', gasError);
                if (gasError.error && gasError.error.data) {
                    console.error('Revert data:', gasError.error.data);
                }
                throw gasError;
            }

            tx = await bountyContract.submitInitialReport(
                report.reportId,
                oracleParams,
                amount1,
                amount2,
                stateHash,
                blockInfo.timestamp,
                blockInfo.blockNumber,
                blockInfo.timestampBound,
                blockInfo.blockNumberBound,
                gasOverrides
            );
        } else {
            // Submit via safe batcher
            console.log('Building oracleParams and getting fresh block info...');
            const oracleParams = buildOracleParams(report);
            const blockInfo = await getFreshBlockInfo();

            console.log('oracleParams:', oracleParams);
            console.log('blockInfo:', blockInfo);

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
                if (gasError.error && gasError.error.data) {
                    console.error('Revert data:', gasError.error.data);
                }
                throw gasError;
            }

            tx = await batcher.submitInitialReportSafe(
                reportData,
                oracleParams,
                amount1,
                amount2,
                blockInfo.timestamp,
                blockInfo.blockNumber,
                blockInfo.timestampBound,
                blockInfo.blockNumberBound,
                gasOverrides
            );
        }
        console.log('TX sent:', tx.hash);

        const receipt = await tx.wait();
        console.log('TX confirmed:', receipt);

        // Save to My Reports
        saveReportId(report.reportId);

        // Hide pane
        const pane = document.getElementById('reportPane');
        if (pane) pane.style.display = 'none';
        console.log('Initial report submitted successfully!');

        setButtonLoading(submitBtn, false, 'Submit Report');

        // Mark that we're doing a user-initiated refresh (to skip event-triggered duplicates)
        lastUserRefreshTime = Date.now();

        // Refresh the report display to show new state (skip fresher data to avoid double-refresh)
        await searchReport(true);
    } catch (e) {
        console.error('Submit error:', e);
        setButtonLoading(submitBtn, false, 'Submit Report');
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

async function settleReport(reportId, btn = null) {
    // Connect wallet if not connected
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    setButtonLoading(btn, true);

    try {
        console.log('=== Settle Report Debug ===');
        console.log('reportId:', reportId);

        // Get report data to get stateHash
        const dataProvider = new ethers.Contract(DATA_PROVIDER_ADDRESS, DATA_PROVIDER_ABI, providers[0]);
        const reportData = await dataProvider['getData(uint256)'](reportId);
        const report = reportData[0];
        console.log('stateHash:', report.stateHash);

        // Get fresh block info (relaxed bounds for settle)
        const blockInfo = await getFreshBlockInfo(true);
        console.log('blockInfo:', blockInfo);

        const batcher = new ethers.Contract(BATCHER_ADDRESS, BATCHER_ABI, signer);

        const settleData = [{
            reportId: reportId,
            stateHash: report.stateHash
        }];

        // Estimate gas first
        try {
            const gasEstimate = await batcher.estimateGas.safeSettleReports(
                settleData,
                blockInfo.timestamp,
                blockInfo.blockNumber,
                blockInfo.timestampBound,
                blockInfo.blockNumberBound
            );
            console.log('Gas estimate:', gasEstimate.toString());
        } catch (gasError) {
            console.error('Gas estimation failed:', gasError);
            if (gasError.reason) {
                setButtonLoading(btn, false, 'Settle');
                showError('Cannot settle: ' + gasError.reason);
                return;
            }
            throw gasError;
        }

        const gasOverrides = await getGasOverrides();
        const tx = await batcher.safeSettleReports(
            settleData,
            blockInfo.timestamp,
            blockInfo.blockNumber,
            blockInfo.timestampBound,
            blockInfo.blockNumberBound,
            gasOverrides
        );
        console.log('TX sent:', tx.hash);

        const receipt = await tx.wait();
        console.log('TX confirmed:', receipt);

        setButtonLoading(btn, false, 'Settle');

        // Mark that we're doing a user-initiated refresh (to skip event-triggered duplicates)
        lastUserRefreshTime = Date.now();

        // Refresh the report view (skip fresher data to avoid double-refresh)
        searchReport(true);
        console.log('Report settled successfully!');

    } catch (e) {
        console.error('Settle error:', e);
        setButtonLoading(btn, false, 'Settle');
        let errorMsg = e.message;
        if (e.error && e.error.message) {
            errorMsg = e.error.message;
        }
        if (e.reason) {
            errorMsg = e.reason;
        }
        showError('Failed to settle: ' + errorMsg);
    }
}

async function searchReport(skipFresherData = false) {
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
        // Skip this after submissions to avoid double-refresh
        const onFresherData = skipFresherData ? null : async (fresherResult) => {
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

            // Use cached bounty data from initial render
            const bountyData = currentReport?.bountyData || null;

            // Update global state
            currentReport = { ...report, token1Info, token2Info, bountyData };

            // Re-render with fresher data
            console.log(`Re-rendering with fresher data from block ${fresherResult.blockNum}`);
            renderReport(report, token1Info, token2Info, bountyData);
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

        // Fetch bounty data if awaiting initial report and network has bounty contract
        let bountyData = null;
        const hasInitialReport = report.currentReporter !== ethers.constants.AddressZero;
        if (!hasInitialReport && getBountyContractAddress()) {
            const bounties = await fetchBountyData([reportId]);
            bountyData = bounties[reportId] || null;
        }

        // Store for actions (spread to make mutable copy)
        currentReport = { ...report, token1Info, token2Info, bountyData };

        // Render the report
        renderReport(report, token1Info, token2Info, bountyData);

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

function calculateBountySubmitGasCost() {
    if (!currentGasPrice) return null;
    return currentGasPrice.mul(BOUNTY_SUBMIT_GAS);
}

function renderReport(report, token1Info, token2Info, bountyData = null) {
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
    let metricsHtml = '';
    if (isSettled) {
        statusBadge = '<span class="settled-badge">Settled</span>';
    } else if (hasInitialReport) {
        // Calculate initial time for display
        const now = getEstimatedBlockTimestamp();
        const reportTs = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
        const settlementTimeSecs = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
        const settleTs = reportTs + settlementTimeSecs;
        const remaining = settleTs - now;
        const isSettleable = remaining <= 0;

        if (isSettleable) {
            // Settleable - show Settle button with net reward
            const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
            let netRewardHtml = '';
            if (settleGasCost && report.settlerReward) {
                const netReward = report.settlerReward.sub(settleGasCost);
                const netRewardEth = parseFloat(ethers.utils.formatUnits(netReward, 18));
                const netRewardUsd = ethPrice ? netRewardEth * ethPrice : 0;
                const rewardClass = netRewardUsd >= 0 ? 'positive' : 'negative';
                const rewardSign = netRewardUsd >= 0 ? '+' : '';
                netRewardHtml = `
                    <div class="status-metric">
                        <span class="metric-label">Settler Reward</span>
                        <span class="metric-value ${rewardClass}">${rewardSign}$${Math.abs(netRewardUsd).toFixed(4)}</span>
                    </div>`;
            }
            statusBadge = `<span class="settled-badge">Ready to Settle</span><button class="report-action-btn" onclick="settleReport(${report.reportId}, this)">Settle</button>`;
            metricsHtml = `
                <div class="section-title">Economics</div>
                <div class="metrics-section">${netRewardHtml}</div>`;
        } else {
            // Not settleable yet - show countdown and dispute button
            const timeStr = remaining >= 60 ? `${Math.floor(remaining / 60)}m ${remaining % 60}s` : `${remaining}s`;
            const canDispute = report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report);
            const disputeBtnHtml = canDispute ? `<button class="dispute-btn" onclick="toggleDisputePane()">Dispute</button>` : '';
            statusBadge = `<span class="pending-badge">Pending Settlement</span>${disputeBtnHtml}`;

            // Calculate dispute economics
            const disputeInfo = calculateDisputeInfo(report, token1Info, token2Info);
            const liqStr = formatTokenAmount(disputeInfo.newAmount1, token1Info.decimals, token1Info.symbol);

            let profitHtml = '';
            if (disputeInfo.usdPnLAvailable) {
                const profitClass = disputeInfo.netPnLUSD >= 0 ? 'positive' : 'negative';
                const profitSign = disputeInfo.netPnLUSD >= 0 ? '+' : '';
                profitHtml = `
                    <div class="status-metric">
                        <span class="metric-label">Profit From Swap</span>
                        <span id="singleImmediateProfitDisplay" class="metric-value ${profitClass}">${profitSign}$${Math.abs(disputeInfo.netPnLUSD).toFixed(2)}</span>
                    </div>`;
            }

            metricsHtml = `
                <div class="section-title">Economics</div>
                <div class="metrics-section">${profitHtml}
                    <div class="status-metric">
                        <span class="metric-label">Settles In</span>
                        <span id="settlementCountdown" class="metric-value">${timeStr}</span>
                    </div>
                    <div class="status-metric">
                        <span class="metric-label">Liquidity</span>
                        <span class="metric-value neutral">${liqStr}</span>
                    </div>
                </div>`;
        }
    } else {
        const rewardEth = parseFloat(ethers.utils.formatUnits(netReporterReward, 18));
        let rewardUsd = ethPrice ? (rewardEth * ethPrice) : 0;
        const liqFloat = parseFloat(ethers.utils.formatUnits(report.exactToken1Report, token1Info.decimals));
        const liqStr = (liqFloat >= 0.01 ? liqFloat.toFixed(2) : liqFloat.toFixed(6)) + ' ' + token1Info.symbol;

        // Check for bounty (ETH/OP only)
        let bountyHtml = '';
        const hasBounty = isValidBounty(bountyData);
        if (hasBounty) {
            const now = getEstimatedBlockTimestamp();
            const currentBlock = getEstimatedBlockNumber();
            const bountyAmt = calcCurrentBounty(bountyData, now, currentBlock);
            const tokenInfo = getBountyTokenInfo(bountyData.bountyToken);
            const claimableInfo = isBountyClaimable(bountyData, now, currentBlock);

            // Store claimability info on currentReport for other parts of UI
            currentReport.bountyClaimable = claimableInfo;

            if (claimableInfo.claimable) {
                // Bounty is claimable - show amount
                // Add bounty to reward USD
                if (tokenInfo.symbol === 'ETH' && ethPrice) {
                    const bountyEth = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                    rewardUsd += bountyEth * ethPrice;
                } else if (tokenInfo.symbol === 'OP' && opPrice) {
                    const bountyOp = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                    rewardUsd += bountyOp * opPrice;
                }

                bountyHtml = `
                    <div class="status-metric">
                        <span class="metric-label">Bounty</span>
                        <span id="singleBountyDisplay" class="metric-value bounty">+${formatBountyAmount(bountyAmt, tokenInfo)}</span>
                    </div>`;
            } else {
                // Bounty not yet claimable - show countdown
                const timeUntil = claimableInfo.timeUntilClaimable;
                let countdownStr;
                if (claimableInfo.timeType) {
                    // timeType true = seconds
                    countdownStr = formatCountdown(timeUntil);
                } else {
                    // timeType false = blocks (estimate ~2 sec per block on OP)
                    const estSeconds = timeUntil * 2;
                    countdownStr = `~${formatCountdown(estSeconds)} (${timeUntil} blocks)`;
                }

                bountyHtml = `
                    <div class="status-metric">
                        <span class="metric-label">Bounty</span>
                        <span id="singleBountyDisplay" class="metric-value pending" style="font-size: 0.75rem;">
                            Available in <span id="bountyCountdown">${countdownStr}</span>
                        </span>
                    </div>
                    <div id="bountyStartingAt" class="status-metric">
                        <span class="metric-label">Bounty Starting At</span>
                        <span class="metric-value neutral">${formatBountyAmount(bountyData.bountyStartAmt, tokenInfo)}</span>
                    </div>`;
            }
        }

        // Store base reward (without bounty) for live updates
        const baseRewardUsd = ethPrice ? (rewardEth * ethPrice) : 0;
        if (hasBounty) {
            currentReport.baseRewardUsd = baseRewardUsd;
        }

        const rewardClass = rewardUsd >= 0 ? 'positive' : 'negative';
        const rewardUsdStr = ethPrice
            ? (rewardUsd >= 0 ? `+$${rewardUsd.toFixed(4)}` : `-$${Math.abs(rewardUsd).toFixed(4)}`)
            : '??';

        // Don't show Report button if callbackGasLimit is too high
        const canReport = report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report);
        let reportBtnHtml = '';
        if (canReport) {
            reportBtnHtml = `<button class="report-action-btn" onclick="toggleReportPane()">Report</button>`;
        } else {
            let reason = '';
            if (report.callbackGasLimit > MAX_CALLBACK_GAS_REPORT) reason = 'Gas limit too high';
            else if (!isSettlementTimeValid(report)) reason = 'Settlement time too high';
            reportBtnHtml = `<span style="font-size: 0.7rem; color: #ef4444; font-family: var(--font-mono);">${reason}</span>`;
        }

        statusBadge = `<span class="no-report-badge">Awaiting Report</span>${reportBtnHtml}`;
        metricsHtml = `
            <div class="section-title">Economics</div>
            <div class="metrics-section">
                <div class="status-metric">
                    <span class="metric-label">Net Reward</span>
                    <span id="singleNetRewardDisplay" class="metric-value ${rewardClass}">${rewardUsdStr}</span>
                </div>${bountyHtml}
                <div class="status-metric">
                    <span class="metric-label">Liquidity</span>
                    <span class="metric-value neutral">${liqStr}</span>
                </div>
            </div>`;
    }

    // Report pane HTML (shown above header when opened) - only if gas limit and settlement time are acceptable
    let reportPaneHtml = '';
    if (!hasInitialReport && report.callbackGasLimit <= MAX_CALLBACK_GAS_REPORT && isSettlementTimeValid(report)) {
        const settlementTimeVal = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
        const settlementStr = report.timeType
            ? formatSettlementTime(settlementTimeVal)
            : `${settlementTimeVal} blocks`;

        // Check if bounty is claimable for routing note
        let bountyRouteNote = '';
        if (isValidBounty(bountyData)) {
            const now = getEstimatedBlockTimestamp();
            const currentBlock = getEstimatedBlockNumber();
            const claimableInfo = isBountyClaimable(bountyData, now, currentBlock);

            if (!claimableInfo.claimable) {
                bountyRouteNote = `
                <div id="bountyRouteWarning" class="pane-note warning">
                    Bounty not yet available. Submitting now will route through standard batcher (no bounty reward).
                </div>`;
            }
        }

        const token1Amt = formatTokenAmount(report.exactToken1Report, token1Info.decimals, token1Info.symbol);
        const isWhitelisted = isWhitelistedPair(report.token1, report.token2);
        const whitelistWarning = isWhitelisted ? '' : `<div class="pane-note error">WARNING: token(s) not whitelisted - proceed with caution</div>`;

        reportPaneHtml = `
        <div id="reportPane" class="report-pane" style="display: none;">
            <div class="pane-header">Submit Initial Report</div>${bountyRouteNote}${whitelistWarning}
            <div class="pane-row">
                <div class="pane-label">${token1Info.symbol} Amount (fixed)</div>
                <div class="pane-value">${token1Amt}</div>
            </div>
            <div class="pane-row">
                <div class="pane-label">${token2Info.symbol} Amount (${token1Amt} worth of ${token2Info.symbol}) <span class="tooltip" data-tip="If you choose the wrong ${token2Info.symbol} amount, you stand to lose up to the absolute difference in value between ${token1Info.symbol} Amount and ${token2Info.symbol} Amount.">(?)</span></div>
                <div class="pane-input-group">
                    <input type="text" id="amount2Input" class="pane-input" placeholder="Enter ${token2Info.symbol} amount" oninput="updateBreakevenVolatility()">
                    <button class="auto-btn" onclick="autoFillAmount2()">Auto</button>
                </div>
            </div>
            <div id="breakevenRow" class="pane-row" style="display: none;">
                <div class="pane-label">
                    Breakeven ${token1Info.symbol}/${token2Info.symbol} Volatility
                    <span class="tooltip" data-tip="Higher is better. Max price move in either direction, at any time over ${settlementStr} settlement time, where you remain profitable if disputed.">(?)</span>
                </div>
                <div class="pane-value" id="breakevenValue">--</div>
            </div>
            <div id="reportUnprofitableWarning" class="pane-note error" style="display: none;">WARNING: report immediately unprofitable</div>
            <div class="pane-reminder">Please double check your ${token2Info.symbol} amount equals ~${token1Amt} in value or you will lose money</div>
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
            ? formatSettlementTime(settlementTimeVal)
            : `${settlementTimeVal} blocks`;

        const disputeToken1Amt = formatTokenAmount(tempDisputeInfo.newAmount1, token1Info.decimals, token1Info.symbol);
        const disputeIsWhitelisted = isWhitelistedPair(report.token1, report.token2);
        const disputeWhitelistWarning = disputeIsWhitelisted ? '' : `<div class="pane-note error">WARNING: token(s) not whitelisted - proceed with caution</div>`;

        disputePaneHtml = `
        <div id="disputePane" class="report-pane dispute-pane" style="display: none;">
            <div class="pane-header" style="color: var(--accent-red);">Submit Dispute</div>${disputeWhitelistWarning}
            <div class="pane-row">
                <div class="pane-label">New ${token1Info.symbol} Amount (fixed - escalated)</div>
                <div class="pane-value">${disputeToken1Amt}</div>
            </div>
            <div class="pane-row">
                <div class="pane-label">New ${token2Info.symbol} Amount (${disputeToken1Amt} worth of ${token2Info.symbol})</div>
                <div class="pane-input-group">
                    <input type="text" id="disputeAmount2Input" class="pane-input" placeholder="Enter ${token2Info.symbol} amount" oninput="updateDisputeRequirements()">
                    <button class="auto-btn" onclick="autoFillDisputeAmount2()">Auto</button>
                </div>
            </div>
            <div id="disputeRequirements" class="dispute-requirements" style="display: none;">
                <div class="pane-row">
                    <div class="pane-label">Est. Immediate PnL (assuming correct ${token2Info.symbol} amount above) <span class="tooltip" data-tip="If you choose the wrong ${token2Info.symbol} amount, you stand to lose up to the absolute difference in value between New ${token1Info.symbol} Amount and New ${token2Info.symbol} Amount.">(?)</span></div>
                    <div class="pane-value" id="disputePnL">--</div>
                </div>
                <div class="pane-row">
                    <div class="pane-label">
                        Breakeven ${token1Info.symbol}/${token2Info.symbol} Volatility
                        <span class="tooltip" data-tip="Higher is better. Max price move in either direction, at any time over ${settlementStr} settlement time, where you remain profitable if re-disputed.">(?)</span>
                    </div>
                    <div class="pane-value" id="disputeBreakeven">--</div>
                </div>
                <div id="disputeUnprofitableWarning" class="pane-note error" style="display: none;">WARNING: dispute immediately unprofitable</div>
                <div class="pane-row">
                    <div class="pane-label">You Transfer In (swapping <span id="recommendedSwap">--</span>)</div>
                    <div class="pane-value" id="disputeTransferIn">--</div>
                </div>
                <div class="pane-row">
                    <div class="pane-label">Your Position Will Be Worth</div>
                    <div class="pane-value" id="disputePositionWorth">--</div>
                </div>
            </div>
            <div class="pane-reminder">Please double check your ${token2Info.symbol} amount equals ~${disputeToken1Amt} in value or you will lose money</div>
            <div class="pane-actions">
                <button class="submit-btn" style="background: var(--accent-red);" onclick="submitDispute()">Submit Dispute</button>
                <button class="cancel-btn" onclick="toggleDisputePane()">Cancel</button>
            </div>
        </div>`;
    }

    const swapFeePercent = (report.feePercentage / 100000).toFixed(3);
    const protocolFeePercent = (report.protocolFee / 100000).toFixed(3);
    const totalFeePercent = ((report.feePercentage + report.protocolFee) / 100000).toFixed(3);

    const whitelistIcon = getWhitelistIcon(report.token1, report.token2);
    let html = `${reportPaneHtml}${disputePaneHtml}<div class="result-card">
        <h2 style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px;"><span>Report #${report.reportId}</span>${whitelistIcon}${statusBadge}</h2>
        ${metricsHtml}
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

        // Determine if we should flip the price display for readability
        // If token1 is stablecoin and token2 is not, show "1 TOKEN2 = X USD" instead
        const stablecoins = ['USDC', 'USDT', 'DAI', 'FRAX', 'LUSD'];
        const token1IsStable = stablecoins.includes(token1Info.symbol);
        const token2IsStable = stablecoins.includes(token2Info.symbol);

        let priceLabel, priceValue;
        if (token1IsStable && !token2IsStable && amount2Float > 0) {
            // Show "1 WETH = $3360" style
            const priceInStable = amount1Float / amount2Float;
            priceLabel = `Price (1 ${token2Info.symbol} =)`;
            priceValue = `$${priceInStable.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else if (token2IsStable && !token1IsStable && amount1Float > 0) {
            // Show "1 WETH = $3360" style (already natural order)
            const priceInStable = amount2Float / amount1Float;
            priceLabel = `Price (1 ${token1Info.symbol} =)`;
            priceValue = `$${priceInStable.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else {
            // Default: show token2 per token1 with appropriate precision
            const priceToken2PerToken1 = amount1Float > 0 ? (amount2Float / amount1Float) : 0;
            priceLabel = `Price (1 ${token1Info.symbol} =)`;
            // Use more decimals for small numbers
            const decimals = priceToken2PerToken1 < 0.0001 ? 8 : priceToken2PerToken1 < 0.01 ? 6 : 4;
            priceValue = `${priceToken2PerToken1.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: decimals})} ${token2Info.symbol}`;
        }

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
                <div class="info-label">${priceLabel}</div>
                <div class="info-value highlight">${priceValue}</div>
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

    // Start bounty live update timer if report has a bounty
    startSingleBountyTimer();
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

function showOpGrantError(msg) {
    const box = document.getElementById('opgrantErrorBox');
    if (box) {
        box.textContent = msg;
        box.style.display = 'block';
        // Auto-hide after 5 seconds
        setTimeout(() => {
            box.style.display = 'none';
        }, 5000);
    }
}

function hideOpGrantError() {
    const box = document.getElementById('opgrantErrorBox');
    if (box) box.style.display = 'none';
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

    // Default to OP Grant tab on Optimism
    if (isOpGrantAvailable()) {
        switchTab('opgrant');
    }

    document.getElementById('reportId').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchReport();
        }
    });
});

// Tab switching
function switchTab(tab) {
    // Stop My Reports timer when leaving that tab
    if (tab !== 'myreports') {
        stopMyReportsTimer();
    }

    // Stop bounty update timer when leaving overview tab
    if (tab !== 'overview') {
        stopBountyUpdateTimer();
        cachedBounties = {}; // Clear cached bounties
    }

    // Stop bounty and breakeven update timers when leaving single tab
    if (tab !== 'single') {
        stopSingleBountyTimer();
        stopBreakevenUpdateTimer();
    }

    // Stop OP Grant timer when leaving that tab
    if (tab !== 'opgrant') {
        stopOpGrantUpdateTimer();
    }

    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tabIndex = tab === 'opgrant' ? 1 : tab === 'single' ? 2 : tab === 'overview' ? 3 : tab === 'myreports' ? 4 : 5;
    document.querySelector(`.tab:nth-child(${tabIndex})`).classList.add('active');

    // Update tab content
    document.getElementById('singleTab').classList.toggle('active', tab === 'single');
    document.getElementById('overviewTab').classList.toggle('active', tab === 'overview');
    document.getElementById('myReportsTab').classList.toggle('active', tab === 'myreports');
    document.getElementById('wrapTab').classList.toggle('active', tab === 'wrap');
    const opgrantTab = document.getElementById('opgrantTab');
    if (opgrantTab) opgrantTab.classList.toggle('active', tab === 'opgrant');

    // Auto-load overview if switching to it and grid is empty
    if (tab === 'overview') {
        // Clean up single report event listeners when leaving single tab
        cleanupEventListeners();
        if (document.getElementById('reportsGrid').innerHTML === '') {
            loadOverview(true); // autoDetect = true for initial load
        }
    }

    // Auto-load my reports if switching to it
    if (tab === 'myreports') {
        loadMyReports();
    }

    // Refresh balances when switching to wrap tab
    if (tab === 'wrap') {
        refreshWrapBalances();
    }

    // Load OP Grant games when switching to that tab
    if (tab === 'opgrant') {
        loadOpGrantGames();
        startOpGrantUpdateTimer();
    } else {
        // Stop OP Grant timer when leaving that tab
        stopOpGrantUpdateTimer();
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
                const reason = err.message?.includes('quota') ? 'rate limited' : 'failed';
                console.log(`RPC ${i} (range) ${reason}`);
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
                const contract = new ethers.Contract(get_ORACLE_ADDRESS(), ORACLE_ABI, p);
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

        // Collect reportIds awaiting initial report to fetch bounty data
        const awaitingReportIds = reports
            .filter(r => !r.isDistributed && r.callbackGasLimit <= MAX_CALLBACK_GAS && r.currentReporter === ethers.constants.AddressZero)
            .map(r => r.reportId);

        // Fetch bounty data for awaiting reports (only if network has bounty contract)
        let bountyData = {};
        if (getBountyContractAddress() && awaitingReportIds.length > 0) {
            console.log(`Fetching bounty data for ${awaitingReportIds.length} awaiting reports...`);
            bountyData = await fetchBountyData(awaitingReportIds);
            cachedBounties = { ...cachedBounties, ...bountyData };
            console.log(`Found ${Object.keys(bountyData).length} reports with bounties`);
        }

        let awaiting = 0;
        let disputed = 0;
        let settleable = 0;
        let skipped = 0;

        const grid = document.getElementById('reportsGrid');
        const now = getEstimatedBlockTimestamp();
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
                formatSettlementTime(report.settlementTime) :
                `${report.settlementTime} blks`;

            // Determine status and calculate appropriate value
            let statusClass, statusText, valueLabel, valueUsd, valueClass;
            let bountyStr = ''; // Bounty display string (only for awaiting reports)
            let liqStr = ''; // Liquidity display string (only for awaiting reports)

            if (!hasInitialReport) {
                // Awaiting initial report - show reporter reward
                statusClass = 'awaiting';
                statusText = 'Needs Initial Report';
                valueLabel = 'Net Reward';
                awaiting++;

                // Get liquidity info (token1) - supports all tokens
                const token1Info = await getTokenInfo(report.token1);
                const liqFloat = parseFloat(ethers.utils.formatUnits(report.exactToken1Report, token1Info.decimals));
                liqStr = (liqFloat >= 0.01 ? liqFloat.toFixed(2) : liqFloat.toFixed(6)) + ' ' + token1Info.symbol;

                // Check for bounty (ETH/OP only)
                const bounty = bountyData[report.reportId];
                let hasBounty = isValidBounty(bounty);

                const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
                // Use bounty submit gas if there's a bounty, otherwise normal submit gas
                const submitGasCost = hasBounty ? calculateBountySubmitGasCost() : calculateInitialReportGasCost();
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

                // Store base reward (without bounty) for live updates
                const baseRewardUsd = valueUsd;

                // Add bounty to reward if available and claimable (ETH/OP only)
                if (hasBounty) {
                    const currentBlock = getEstimatedBlockNumber();
                    const claimable = isBountyClaimable(bounty, now, currentBlock);
                    const tokenInfo = getBountyTokenInfo(bounty.bountyToken);

                    // Store bounty data for live updates (only ETH/OP)
                    cachedBounties[report.reportId] = {
                        ...bounty,
                        tokenInfo: tokenInfo,
                        baseRewardUsd: baseRewardUsd
                    };

                    // Only include bounty in reward if claimable
                    if (claimable.claimable) {
                        const bountyAmt = calcCurrentBounty(bounty, now, currentBlock);
                        bountyStr = formatBountyAmount(bountyAmt, tokenInfo);

                        // Add bounty value to USD total
                        if (tokenInfo.symbol === 'ETH' && ethPrice) {
                            const bountyEth = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                            valueUsd += bountyEth * ethPrice;
                        } else if (tokenInfo.symbol === 'OP' && opPrice) {
                            const bountyOp = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                            valueUsd += bountyOp * opPrice;
                        } else if (tokenInfo.symbol === 'USDC') {
                            const bountyUsdc = parseFloat(ethers.utils.formatUnits(bountyAmt, 6));
                            valueUsd += bountyUsdc; // USDC is 1:1 with USD
                        }
                    }
                }

                valueClass = valueUsd >= 0 ? 'profit' : 'loss';
            } else {
                // Has initial report - check if settleable or disputable
                const reportTs = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
                const settlementTimeSecs = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
                const settleTs = reportTs + settlementTimeSecs;
                const now = getEstimatedBlockTimestamp();
                const isSettleable = now >= settleTs;

                if (isSettleable) {
                    statusClass = 'settleable';
                    statusText = 'READY TO SETTLE';
                    valueLabel = 'Settle Net';
                    settleable++;

                    // For settleable: just show settler reward - gas cost
                    const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
                    if (settleGasCost && report.settlerReward) {
                        const netReward = report.settlerReward.sub(settleGasCost);
                        const netRewardEth = parseFloat(ethers.utils.formatUnits(netReward, 18));
                        valueUsd = ethPrice ? netRewardEth * ethPrice : 0;
                    } else {
                        valueUsd = 0;
                    }
                    valueClass = valueUsd >= 0 ? 'profit' : 'loss';
                } else {
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
            }

            const valueStr = Math.abs(valueUsd) >= 0.01 ? `$${valueUsd.toFixed(2)}` : `$${valueUsd.toFixed(4)}`;
            const whitelistIcon = getWhitelistIcon(report.token1, report.token2);

            // Only show settlement time row if not already settleable
            const settleRow = statusClass === 'settleable' ? '' : `
                <div class="report-box-row">
                    <span class="report-box-label">Settlement time</span>
                    <span class="report-box-value">${settlementStr}</span>
                </div>`;

            // Bounty row (only for awaiting reports with bounty)
            const bountyRow = bountyStr ? `
                <div class="report-box-row">
                    <span class="report-box-label">Bounty</span>
                    <span class="report-box-value bounty" data-report-id="${report.reportId}">+${bountyStr}</span>
                </div>` : '';

            // Liquidity row (only for awaiting reports)
            const liqRow = statusClass === 'awaiting' ? `
                <div class="report-box-row">
                    <span class="report-box-label">Liquidity</span>
                    <span class="report-box-value">${liqStr}</span>
                </div>` : '';

            // Add data attribute for live bounty updates
            const rewardDataAttr = bountyStr ? `data-report-id="${report.reportId}"` : '';

            html += `
            <div class="report-box ${statusClass}" onclick="viewReport(${report.reportId})">
                <div class="report-box-header">
                    <span class="report-box-id">#${report.reportId}${whitelistIcon}</span>
                    <span class="report-box-status">${statusText}</span>
                </div>
                <div class="report-box-row">
                    <span class="report-box-label">${valueLabel}</span>
                    <span class="report-box-value ${valueClass}" ${rewardDataAttr}>${valueStr}</span>
                </div>${bountyRow}${liqRow}${settleRow}
            </div>`;
        }

        grid.innerHTML = html || '<div class="overview-loading">No unsettled reports in this range</div>';
        document.getElementById('overviewStats').textContent =
            `${awaiting} open, ${disputed} disputable, ${settleable} settleable, ${skipped} skipped (high gas)`;

        // Start bounty live update timer if there are bounties
        if (Object.keys(cachedBounties).length > 0) {
            startBountyUpdateTimer();
        }

    } catch (e) {
        console.error('Overview error:', e);
        document.getElementById('reportsGrid').innerHTML =
            `<div class="overview-loading">Error loading reports: ${e.message}</div>`;
    }

    document.getElementById('overviewLoading').style.display = 'none';
}

// Bounty live update timer
let bountyUpdateInterval = null;

function startBountyUpdateTimer() {
    stopBountyUpdateTimer();
    bountyUpdateInterval = setInterval(updateBountyDisplays, 2000); // 2s = Optimism block time
}

function stopBountyUpdateTimer() {
    if (bountyUpdateInterval) {
        clearInterval(bountyUpdateInterval);
        bountyUpdateInterval = null;
    }
}

// Single report bounty live update timer
let singleBountyUpdateInterval = null;

function updateSingleBountyDisplay() {
    if (!currentReport || !isValidBounty(currentReport.bountyData)) return;

    const bounty = currentReport.bountyData;
    const now = getEstimatedBlockTimestamp();
    const currentBlock = getEstimatedBlockNumber();
    const tokenInfo = getBountyTokenInfo(bounty.bountyToken);
    const claimableInfo = isBountyClaimable(bounty, now, currentBlock);

    // Debug: log bounty calculation details
    const start = bounty.start?.toNumber ? bounty.start.toNumber() : Number(bounty.start);
    const roundLen = bounty.roundLength?.toNumber ? bounty.roundLength.toNumber() : Number(bounty.roundLength);
    const elapsed = now - start;
    const rounds = Math.floor(elapsed / roundLen);
    console.log(`Bounty debug: now=${now}, start=${start}, elapsed=${elapsed}s, rounds=${rounds}, offset=${chainTimeOffset}`);

    // Update claimability on currentReport
    currentReport.bountyClaimable = claimableInfo;

    const singleBountyEl = document.getElementById('singleBountyDisplay');
    const bountyCountdownEl = document.getElementById('bountyCountdown');

    if (claimableInfo.claimable) {
        // Bounty is claimable - show escalating amount
        const bountyAmt = calcCurrentBounty(bounty, now, currentBlock);

        if (singleBountyEl) {
            singleBountyEl.textContent = `+${formatBountyAmount(bountyAmt, tokenInfo)}`;
            singleBountyEl.className = 'metric-value bounty';
            singleBountyEl.style.fontSize = '';
        }

        // Hide the route warning if it exists (bounty is now claimable)
        const routeWarning = document.getElementById('bountyRouteWarning');
        if (routeWarning) routeWarning.style.display = 'none';

        // Hide the "Starting At" display (only relevant before bounty is claimable)
        const startingAtEl = document.getElementById('bountyStartingAt');
        if (startingAtEl) startingAtEl.style.display = 'none';

        // Update net reward display (base reward + bounty value)
        const netRewardEl = document.getElementById('singleNetRewardDisplay');
        if (netRewardEl && currentReport.baseRewardUsd !== undefined) {
            let bountyUsd = 0;
            if (tokenInfo.symbol === 'ETH' && ethPrice) {
                const bountyEth = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                bountyUsd = bountyEth * ethPrice;
            } else if (tokenInfo.symbol === 'OP' && opPrice) {
                const bountyOp = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                bountyUsd = bountyOp * opPrice;
            }

            const totalRewardUsd = currentReport.baseRewardUsd + bountyUsd;
            const rewardSign = totalRewardUsd >= 0 ? '+' : '';
            netRewardEl.textContent = `${rewardSign}$${Math.abs(totalRewardUsd).toFixed(4)}`;
            netRewardEl.className = `metric-value ${totalRewardUsd >= 0 ? 'positive' : 'negative'}`;
        }
    } else {
        // Bounty not yet claimable - update countdown
        if (bountyCountdownEl) {
            const timeUntil = claimableInfo.timeUntilClaimable;
            let countdownStr;
            if (claimableInfo.timeType) {
                countdownStr = formatCountdown(timeUntil);
            } else {
                const estSeconds = timeUntil * 2;
                countdownStr = `~${formatCountdown(estSeconds)} (${timeUntil} blocks)`;
            }
            bountyCountdownEl.textContent = countdownStr;
        }
    }
}

function startSingleBountyTimer() {
    stopSingleBountyTimer();
    if (currentReport && isValidBounty(currentReport.bountyData)) {
        // Update immediately, then every 2 seconds
        updateSingleBountyDisplay();
        singleBountyUpdateInterval = setInterval(updateSingleBountyDisplay, 2000);
    }
}

function stopSingleBountyTimer() {
    if (singleBountyUpdateInterval) {
        clearInterval(singleBountyUpdateInterval);
        singleBountyUpdateInterval = null;
    }
}

// Breakeven volatility live update timer (for when there's a bounty on current report)
let breakevenUpdateInterval = null;

function startBreakevenUpdateTimer() {
    stopBreakevenUpdateTimer();
    // Only start if current report has a valid bounty
    if (currentReport && isValidBounty(currentReport.bountyData)) {
        breakevenUpdateInterval = setInterval(updateBreakevenVolatility, 2000);
    }
}

function stopBreakevenUpdateTimer() {
    if (breakevenUpdateInterval) {
        clearInterval(breakevenUpdateInterval);
        breakevenUpdateInterval = null;
    }
}

function updateBountyDisplays() {
    const now = getEstimatedBlockTimestamp();
    const currentBlock = getEstimatedBlockNumber();

    for (const [reportId, bounty] of Object.entries(cachedBounties)) {
        if (bounty.claimed || bounty.recalled) continue;

        const claimable = isBountyClaimable(bounty, now, currentBlock);
        const tokenInfo = bounty.tokenInfo;

        // Update bounty display
        const bountyEl = document.querySelector(`.report-box-value.bounty[data-report-id="${reportId}"]`);

        // Update reward display (base + bounty if claimable)
        const rewardEl = document.querySelector(`.report-box-value[data-report-id="${reportId}"]:not(.bounty)`);

        if (claimable.claimable) {
            const bountyAmt = calcCurrentBounty(bounty, now, currentBlock);
            const bountyStr = formatBountyAmount(bountyAmt, tokenInfo);

            if (bountyEl) {
                bountyEl.textContent = `+${bountyStr}`;
            }

            // Update reward with bounty value
            if (rewardEl) {
                let bountyUsd = 0;
                if (tokenInfo.symbol === 'ETH' && ethPrice) {
                    const bountyEth = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                    bountyUsd = bountyEth * ethPrice;
                } else if (tokenInfo.symbol === 'OP' && opPrice) {
                    const bountyOp = parseFloat(ethers.utils.formatUnits(bountyAmt, 18));
                    bountyUsd = bountyOp * opPrice;
                } else if (tokenInfo.symbol === 'USDC') {
                    bountyUsd = parseFloat(ethers.utils.formatUnits(bountyAmt, 6));
                }
                const totalUsd = bounty.baseRewardUsd + bountyUsd;
                const valueStr = Math.abs(totalUsd) >= 0.01 ? `$${totalUsd.toFixed(2)}` : `$${totalUsd.toFixed(4)}`;
                rewardEl.textContent = valueStr;
                rewardEl.className = `report-box-value ${totalUsd >= 0 ? 'profit' : 'loss'}`;
            }
        } else {
            // Bounty not yet claimable - show base reward only
            if (rewardEl) {
                const baseUsd = bounty.baseRewardUsd;
                const valueStr = Math.abs(baseUsd) >= 0.01 ? `$${baseUsd.toFixed(2)}` : `$${baseUsd.toFixed(4)}`;
                rewardEl.textContent = valueStr;
                rewardEl.className = `report-box-value ${baseUsd >= 0 ? 'profit' : 'loss'}`;
            }
        }
    }
}

// Click on a report box to view it
function viewReport(reportId) {
    document.getElementById('reportId').value = reportId;
    switchTab('single');
    searchReport();
}

// ============ MY REPORTS - LocalStorage Functions ============

function getMyReportsKey() {
    return `openoracle_my_reports_${currentNetworkId}`;
}

function getMyReportIds() {
    try {
        const stored = localStorage.getItem(getMyReportsKey());
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error loading my reports:', e);
        return [];
    }
}

function saveReportId(reportId) {
    const reportIds = getMyReportIds();
    // Handle BigNumber or string or number
    const id = typeof reportId === 'object' && reportId._isBigNumber
        ? reportId.toNumber()
        : parseInt(reportId.toString());
    console.log('Saving report ID to My Reports:', id);
    if (!reportIds.includes(id)) {
        reportIds.push(id);
        reportIds.sort((a, b) => b - a); // Most recent first
        localStorage.setItem(getMyReportsKey(), JSON.stringify(reportIds));
        console.log('Saved. Current My Reports:', reportIds);
    } else {
        console.log('Report ID already in My Reports');
    }
}

function removeReportId(reportId) {
    const reportIds = getMyReportIds();
    const id = parseInt(reportId);
    const filtered = reportIds.filter(r => r !== id);
    localStorage.setItem(getMyReportsKey(), JSON.stringify(filtered));
}

function clearMyReports() {
    if (confirm('Are you sure you want to clear all tracked reports?')) {
        localStorage.removeItem(getMyReportsKey());
        loadMyReports();
    }
}

async function loadMyReports() {
    const reportIds = getMyReportIds();
    const grid = document.getElementById('myReportsGrid');
    const loading = document.getElementById('myReportsLoading');
    const empty = document.getElementById('myReportsEmpty');
    const stats = document.getElementById('myReportsStats');

    if (reportIds.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
        loading.style.display = 'none';
        stats.textContent = '0 reports tracked';
        return;
    }

    empty.style.display = 'none';
    loading.style.display = 'block';
    grid.innerHTML = '';

    try {
        // Fetch all report IDs in one batch call - race providers for speed
        const dataPromises = providers.map(p => {
            const contract = new ethers.Contract(DATA_PROVIDER_ADDRESS, DATA_PROVIDER_ABI, p);
            return contract['getData(uint256[])'](reportIds);
        });
        const reports = await Promise.any(dataPromises);

        loading.style.display = 'none';

        if (!reports || reports.length === 0) {
            empty.style.display = 'block';
            stats.textContent = '0 reports found';
            return;
        }

        // Categorize reports and track which to purge
        let unsettled = 0;
        let settled = 0;
        let readyToSettle = 0;
        const toPurge = [];

        let html = '';
        for (const report of reports) {
            const hasInitialReport = report.currentReporter !== ethers.constants.AddressZero;
            const isSettled = report.isDistributed;
            const reportId = typeof report.reportId === 'number' ? report.reportId : report.reportId.toNumber();

            // Check if report doesn't exist (token addresses are zero)
            if (report.token1 === ethers.constants.AddressZero || report.token2 === ethers.constants.AddressZero) {
                toPurge.push(reportId);
                continue; // Skip non-existent reports
            }

            // Purge reports without initial report (stale data - UI only saves after successful tx)
            if (!hasInitialReport) {
                toPurge.push(reportId);
                continue; // Skip reports user never actually submitted to
            }

            // Check if we should purge this report
            if (isSettled) {
                settled++;
                toPurge.push(reportId);
                continue; // Skip settled reports in the grid
            }

            // Check if user is no longer the current reporter (got out-disputed)
            if (hasInitialReport && userAddress) {
                const currentReporter = report.currentReporter.toLowerCase();
                const initialReporter = report.initialReporter.toLowerCase();
                const user = userAddress.toLowerCase();
                // Purge if user was involved but is no longer current reporter
                if ((initialReporter === user || report.disputeOccurred) && currentReporter !== user) {
                    toPurge.push(reportId);
                    continue; // Skip - user lost this position
                }
            }

            unsettled++;

            // Check if ready to settle
            let canSettle = false;
            let settlementStr = '';
            if (hasInitialReport) {
                const now = getEstimatedBlockTimestamp();
                const reportTimestamp = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
                const settlementTime = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();

                if (report.timeType) {
                    // Time-based settlement
                    const settlementTimestamp = reportTimestamp + settlementTime;
                    canSettle = now >= settlementTimestamp;
                    if (canSettle) {
                        settlementStr = 'Ready to settle';
                        readyToSettle++;
                    } else {
                        const remaining = settlementTimestamp - now;
                        settlementStr = remaining > 60 ? `${Math.ceil(remaining / 60)}m left` : `${remaining}s left`;
                    }
                } else {
                    // Block-based settlement
                    settlementStr = `${settlementTime} blks`;
                }
            } else {
                settlementStr = 'Awaiting report';
            }

            // Calculate net settler reward
            let netRewardStr = '--';
            let netRewardClass = '';
            if (hasInitialReport && canSettle) {
                const settleGasCost = calculateSettleGasCost(report.callbackGasLimit);
                if (settleGasCost && report.settlerReward) {
                    const netReward = report.settlerReward.sub(settleGasCost);
                    const netRewardEth = parseFloat(ethers.utils.formatUnits(netReward, 18));
                    const netRewardUsd = ethPrice ? netRewardEth * ethPrice : 0;
                    netRewardStr = ethPrice ? `$${netRewardUsd.toFixed(4)}` : `${netRewardEth.toFixed(6)} ETH`;
                    netRewardClass = netRewardUsd >= 0 ? 'profit' : 'loss';
                }
            }

            const statusClass = canSettle ? 'awaiting' : (hasInitialReport ? 'disputed' : 'awaiting');
            const whitelistIcon = getWhitelistIcon(report.token1, report.token2);

            // Build rows based on state
            let row1Label, row1Value, row1Class = '';
            let row2Label = '', row2Value = '';

            // Calculate settlement target timestamp for live countdown
            let settlementTarget = 0;
            if (hasInitialReport && report.timeType && !canSettle) {
                const reportTimestamp = typeof report.reportTimestamp === 'number' ? report.reportTimestamp : report.reportTimestamp.toNumber();
                const settlementTime = typeof report.settlementTime === 'number' ? report.settlementTime : report.settlementTime.toNumber();
                settlementTarget = reportTimestamp + settlementTime;
            }

            if (canSettle) {
                row1Label = 'Net Reward';
                row1Value = netRewardStr;
                row1Class = netRewardClass;
                row2Label = 'Status';
                row2Value = 'Ready to settle';
            } else if (hasInitialReport) {
                row1Label = 'Time Left';
                row1Value = settlementStr;
                row2Label = 'Settlement';
                row2Value = report.timeType ? `${formatSettlementTime(report.settlementTime)} window` : `${report.settlementTime} blocks`;
            } else {
                row1Label = 'Status';
                row1Value = 'Awaiting initial report';
                row2Label = 'Settlement';
                row2Value = report.timeType ? `${formatSettlementTime(report.settlementTime)} window` : `${report.settlementTime} blocks`;
            }

            // Add data-settlement-target for live countdown updates
            const countdownAttr = settlementTarget > 0 ? `data-settlement-target="${settlementTarget}"` : '';

            html += `
            <div class="report-box ${statusClass}" onclick="viewReport(${report.reportId})" data-report-id="${report.reportId}">
                <div class="report-box-header">
                    <span class="report-box-id">#${report.reportId}${whitelistIcon}</span>
                    <span class="report-box-status">${canSettle ? 'SETTLE NOW' : (hasInitialReport ? 'Pending' : 'No Report')}</span>
                </div>
                <div class="report-box-row">
                    <span class="report-box-label">${row1Label}</span>
                    <span class="report-box-value ${row1Class}" ${countdownAttr}>${row1Value}</span>
                </div>
                <div class="report-box-row">
                    <span class="report-box-label">${row2Label}</span>
                    <span class="report-box-value">${row2Value}</span>
                </div>
            </div>`;
        }

        grid.innerHTML = html;
        stats.textContent = `${unsettled} unsettled, ${readyToSettle} ready to settle, ${settled} settled`;

        // Purge settled/lost reports from localStorage
        if (toPurge.length > 0) {
            console.log(`Purging ${toPurge.length} reports from My Reports:`, toPurge);
            for (const id of toPurge) {
                removeReportId(id);
            }
        }

        // Start live countdown timer for My Reports
        startMyReportsTimer();

    } catch (e) {
        console.error('Error loading my reports:', e);
        loading.style.display = 'none';
        grid.innerHTML = '<div style="color: #ef4444; padding: 20px;">Error loading reports</div>';
    }
}

// Start live countdown timers for My Reports tab
function startMyReportsTimer() {
    stopMyReportsTimer();
    myReportsTimerInterval = setInterval(updateMyReportsCountdowns, 1000);
}

// Stop My Reports timer
function stopMyReportsTimer() {
    if (myReportsTimerInterval) {
        clearInterval(myReportsTimerInterval);
        myReportsTimerInterval = null;
    }
}

// Update all countdown timers in My Reports
function updateMyReportsCountdowns() {
    const elements = document.querySelectorAll('[data-settlement-target]');
    const now = getEstimatedBlockTimestamp();

    elements.forEach(el => {
        const target = parseInt(el.getAttribute('data-settlement-target'));
        if (target <= 0) return;

        const remaining = target - now;
        if (remaining <= 0) {
            // Time's up - reload to update status
            el.textContent = 'Ready!';
            el.removeAttribute('data-settlement-target');
            // Trigger reload after a short delay
            setTimeout(() => loadMyReports(), 1000);
        } else if (remaining > 60) {
            el.textContent = `${Math.ceil(remaining / 60)}m left`;
        } else {
            el.textContent = `${remaining}s left`;
        }
    });
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
    const wrapBtn = document.querySelector('.wrap-btn.wrap');

    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    const amountStr = document.getElementById('wrapAmount').value;
    if (!amountStr || parseFloat(amountStr) <= 0) {
        showError('Please enter a valid ETH amount');
        return;
    }

    setButtonLoading(wrapBtn, true);

    try {
        const amount = ethers.utils.parseEther(amountStr);
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

        console.log(`Wrapping ${amountStr} ETH...`);
        const tx = await wethContract.deposit({ value: amount });
        console.log('TX sent:', tx.hash);

        await tx.wait();
        console.log('Wrap complete');

        setButtonLoading(wrapBtn, false, 'Wrap');
        document.getElementById('wrapAmount').value = '';
        refreshWrapBalances();
    } catch (e) {
        console.error('Wrap error:', e);
        setButtonLoading(wrapBtn, false, 'Wrap');
        showError('Wrap failed: ' + e.message);
    }
}

// Unwrap WETH to ETH
async function unwrapWeth() {
    const unwrapBtn = document.querySelector('.wrap-btn.unwrap');

    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    const amountStr = document.getElementById('unwrapAmount').value;
    if (!amountStr || parseFloat(amountStr) <= 0) {
        showError('Please enter a valid WETH amount');
        return;
    }

    setButtonLoading(unwrapBtn, true);

    try {
        const amount = ethers.utils.parseEther(amountStr);
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

        console.log(`Unwrapping ${amountStr} WETH...`);
        const tx = await wethContract.withdraw(amount);
        console.log('TX sent:', tx.hash);

        await tx.wait();
        console.log('Unwrap complete');

        setButtonLoading(unwrapBtn, false, 'Unwrap');
        document.getElementById('unwrapAmount').value = '';
        refreshWrapBalances();
    } catch (e) {
        console.error('Unwrap error:', e);
        setButtonLoading(unwrapBtn, false, 'Unwrap');
        showError('Unwrap failed: ' + e.message);
    }
}

// ============ OP GRANT REWARDS ============

// OP Grant Faucet contract address (Optimism only)
const OP_GRANT_FAUCET_ADDRESS = '0xc8EE5fFb25a9289abCc6B243Fa116d0b2D5aF91D';

// OP Grant Faucet ABI
const OP_GRANT_FAUCET_ABI = [
    "function games(uint256) view returns (uint256 exactToken1Report, uint256 escalationHalt, uint256 settlerReward, address token1Address, uint48 settlementTime, uint24 disputeDelay, uint24 protocolFee, address token2Address, uint32 callbackGasLimit, uint24 feePercentage, uint16 multiplier, bool timeType, bool trackDisputes, bool keepFee, address callbackContract, bytes4 callbackSelector, address protocolFeeRecipient)",
    "function lastGameTime(uint256) view returns (uint256)",
    "function gameTimer(uint256) view returns (uint256)",
    "function lastReportId(uint256) view returns (uint256)",
    "function bountyParams(uint256) view returns (uint256 bountyStartAmt, address creator, address editor, uint16 bountyMultiplier, uint16 maxRounds, bool timeType, uint256 forwardStartTime, address bountyToken, uint256 maxAmount, uint256 roundLength, bool recallOnClaim, uint48 recallDelay)",
    "function bountyForGame(uint256) view returns (uint8)",
    "function bountyAndPriceRequest(uint8 gameId) returns (uint256 reportId)",
    "event GameCreated(uint256 indexed reportId, uint8 indexed gameId)"
];

// Track active reports per game (reportId -> game data)
let activeGameReports = {};

// Game metadata
const GAME_NAMES = ['Quick Game', 'Standard Game', 'Medium Game', 'Big Game'];
const GAME_SETTLEMENT = ['10s', '4 blocks', '10 mins', '4 hours'];

// Calculate commitment in USD (2x the exactToken1Report)
function getCommitmentUsd(game) {
    if (!game.gameParams) return '~$?? WETH & USDC';

    const token1Addr = game.gameParams.token1Address?.toLowerCase() || '';
    const isWeth = token1Addr === WETH_ADDRESS.toLowerCase();
    const isUsdc = token1Addr === USDC_ADDRESS.toLowerCase();

    const decimals = isUsdc ? 6 : 18;
    const amount = parseFloat(ethers.utils.formatUnits(game.gameParams.exactToken1Report, decimals));
    const doubled = amount * 2;

    if (isUsdc) {
        return `~$${doubled.toFixed(0)} USDC & WETH`;
    } else if (isWeth && ethPrice) {
        const usdValue = doubled * ethPrice;
        return `~$${usdValue.toFixed(0)} WETH & USDC`;
    }
    return `~$?? WETH & USDC`;
}

// Cache for game state
let opGrantGames = [];
let opGrantUpdateTimer = null;
let loadingDotsInterval = null;
let loadingDotsCount = 1;

function startLoadingDotsAnimation() {
    const el = document.getElementById('opgrantLoading');
    if (!el) return;
    loadingDotsCount = 1;
    loadingDotsInterval = setInterval(() => {
        loadingDotsCount = (loadingDotsCount % 3) + 1;
        el.textContent = 'Loading games' + '.'.repeat(loadingDotsCount);
    }, 400);
}

function stopLoadingDotsAnimation() {
    if (loadingDotsInterval) {
        clearInterval(loadingDotsInterval);
        loadingDotsInterval = null;
    }
}

// Check if OP Grant tab should be visible
function isOpGrantAvailable() {
    return currentNetworkId === 'optimism';
}

// Update OP Grant tab visibility
function updateOpGrantTabVisibility() {
    const tab = document.getElementById('opGrantTab');
    if (tab) {
        tab.style.display = isOpGrantAvailable() ? '' : 'none';
    }
}

// Load OP Grant game data
let opGrantLoading = false;
async function loadOpGrantGames() {
    if (!isOpGrantAvailable()) return;
    if (opGrantLoading) return; // Prevent overlapping calls

    const grid = document.getElementById('opgrantGrid');
    if (!grid) return;

    // Start loading animation if no games loaded yet
    if (opGrantGames.length === 0) {
        startLoadingDotsAnimation();
    }

    opGrantLoading = true;
    try {
        // Race top 3 providers to reduce rate limit spam (each makes ~24 calls)
        const rpcEndpoints = getRpcEndpoints();
        const limitedProviders = providers.slice(0, 3);

        const racePromise = new Promise((resolve, reject) => {
            let resolved = false;
            let failCount = 0;

            limitedProviders.forEach((provider, idx) => {
                const faucetContract = new ethers.Contract(OP_GRANT_FAUCET_ADDRESS, OP_GRANT_FAUCET_ABI, provider);
                const startTime = performance.now();

                // Fetch all game data for this provider
                const gameDataPromises = [];
                for (let i = 0; i < 4; i++) {
                    gameDataPromises.push(Promise.all([
                        faucetContract.games(i),
                        faucetContract.lastGameTime(i),
                        faucetContract.gameTimer(i),
                        faucetContract.bountyForGame(i),
                        faucetContract.lastReportId(i)
                    ]));
                }

                Promise.all(gameDataPromises)
                    .then(gameData => {
                        // Also fetch bounty params
                        const bountyIndices = gameData.map(d => d[3]);
                        return Promise.all([
                            gameData,
                            Promise.all(bountyIndices.map(bIdx => faucetContract.bountyParams(bIdx)))
                        ]);
                    })
                    .then(([gameData, bountyParams]) => {
                        if (!resolved) {
                            resolved = true;
                            const elapsed = (performance.now() - startTime).toFixed(0);
                            const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                            console.log(`OP Grant games: ${rpcName} won race in ${elapsed}ms`);
                            resolve({ gameData, bountyParams });
                        }
                    })
                    .catch(err => {
                        const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                        const reason = err.message?.includes('quota') ? 'rate limited' : 'failed';
                        console.log(`OP Grant games: ${rpcName} ${reason}`);
                        failCount++;
                        if (failCount === limitedProviders.length && !resolved) {
                            reject(new Error('All RPCs failed'));
                        }
                    });
            });

            // Timeout after 15 seconds
            setTimeout(() => {
                if (!resolved) {
                    reject(new Error('All RPCs timed out'));
                }
            }, 15000);
        });

        const { gameData: allGameData, bountyParams: allBountyParams } = await racePromise;

        const games = [];
        const now = getEstimatedBlockTimestamp();

        // Build games array
        for (let i = 0; i < 4; i++) {
            const [gameParams, lastTime, timer, bountyIdx, lastReport] = allGameData[i];
            const bountyParamsData = allBountyParams[i];

            const lastTimeNum = lastTime.toNumber();
            const timerNum = timer.toNumber();
            const lastReportNum = lastReport.toString();
            const nextAvailable = lastTimeNum > 0 ? lastTimeNum + timerNum : 0;
            const canStart = lastTimeNum === 0 || now >= nextAvailable;
            const timeRemaining = canStart ? 0 : nextAvailable - now;

            games.push({
                id: i,
                name: GAME_NAMES[i],
                gameParams,
                bountyParams: bountyParamsData,
                lastGameTime: lastTimeNum,
                gameTimer: timerNum,
                nextAvailable,
                canStart,
                timeRemaining,
                activeReportId: lastReportNum !== '0' ? lastReportNum : null,
                activeReport: null,
                activeBounty: null
            });
        }

        // Fetch report and bounty data for games with active reports
        const bountyAddr = getBountyContractAddress();
        const activeReportIds = games.filter(g => g.activeReportId).map(g => g.activeReportId);

        if (activeReportIds.length > 0) {
            // Race limited providers for report data
            const reportRace = new Promise((resolve, reject) => {
                let resolved = false;
                let failCount = 0;

                limitedProviders.forEach((provider, idx) => {
                    const dataProvider = new ethers.Contract(get_DATA_PROVIDER_ADDRESS(), DATA_PROVIDER_ABI, provider);
                    Promise.all(activeReportIds.map(rid => dataProvider['getData(uint256)'](rid)))
                        .then(reportArrays => {
                            if (!resolved) {
                                resolved = true;
                                const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                                console.log(`OP Grant reports: ${rpcName} won race`);
                                resolve(reportArrays);
                            }
                        })
                        .catch(err => {
                            const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                            console.log(`OP Grant reports: ${rpcName} failed`);
                            failCount++;
                            if (failCount === limitedProviders.length && !resolved) {
                                reject(new Error('All RPCs failed for reports'));
                            }
                        });
                });

                setTimeout(() => { if (!resolved) reject(new Error('Report fetch timed out')); }, 10000);
            });

            const reportArrays = await reportRace;

            // Match reports back to games
            let idx = 0;
            for (const game of games) {
                if (game.activeReportId) {
                    const reportArray = reportArrays[idx++];
                    const report = reportArray[0];
                    const hasInitialReport = report.currentReporter !== ethers.constants.AddressZero;
                    const isSettled = report.isDistributed;

                    if (!isSettled) {
                        game.activeReport = report;
                        game.hasInitialReport = hasInitialReport;
                    } else {
                        game.activeReportId = null;
                    }
                }
            }

            // Race limited providers for bounty data
            const stillActiveIds = games.filter(g => g.activeReportId).map(g => g.activeReportId);
            if (bountyAddr && stillActiveIds.length > 0) {
                try {
                    const bountyRace = new Promise((resolve, reject) => {
                        let resolved = false;
                        let failCount = 0;

                        limitedProviders.forEach((provider, idx) => {
                            const bountyContract = new ethers.Contract(bountyAddr, BOUNTY_ABI, provider);
                            bountyContract.getBounties(stillActiveIds)
                                .then(bounties => {
                                    if (!resolved) {
                                        resolved = true;
                                        const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                                        console.log(`OP Grant bounties: ${rpcName} won race`);
                                        resolve(bounties);
                                    }
                                })
                                .catch(err => {
                                    const rpcName = rpcEndpoints[idx]?.split('//')[1]?.split('/')[0] || `RPC ${idx}`;
                                    console.log(`OP Grant bounties: ${rpcName} failed`);
                                    failCount++;
                                    if (failCount === limitedProviders.length && !resolved) {
                                        reject(new Error('All RPCs failed for bounties'));
                                    }
                                });
                        });

                        setTimeout(() => { if (!resolved) reject(new Error('Bounty fetch timed out')); }, 10000);
                    });

                    const bounties = await bountyRace;
                    let bidx = 0;
                    for (const game of games) {
                        if (game.activeReportId) {
                            const bountyData = bounties[bidx++];
                            if (bountyData && bountyData.totalAmtDeposited && !bountyData.totalAmtDeposited.isZero()) {
                                game.activeBounty = bountyData;
                            }
                        }
                    }
                } catch (bountyErr) {
                    console.log('Failed to fetch bounties:', bountyErr.message);
                }
            }
        }

        opGrantGames = games;
        renderOpGrantGames();

        // Re-apply loading states to buttons after render
        document.querySelectorAll('[data-loading-id]').forEach(btn => {
            const id = btn.dataset.loadingId;
            if (loadingButtons[id]) {
                btn.innerHTML = '<span class="btn-spinner"></span>Processing...';
                btn.classList.add('btn-loading');
                btn.disabled = true;
            }
        });

    } catch (e) {
        console.error('Failed to load OP Grant games:', e);
        // Only show error if we have no games loaded yet
        if (opGrantGames.length === 0) {
            stopLoadingDotsAnimation();
            grid.innerHTML = `<div class="opgrant-loading">Failed to load games: ${e.message}</div>`;
        }
    } finally {
        opGrantLoading = false;
        stopLoadingDotsAnimation();
    }
}

// Format time remaining
function formatTimeRemaining(seconds) {
    if (seconds <= 0) return 'Ready';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
        return `${mins}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Format cooldown period
function formatCooldown(seconds) {
    if (seconds >= 86400) return `${seconds / 86400} day`;
    if (seconds >= 3600) return `${seconds / 3600} hour`;
    if (seconds >= 60) return `${seconds / 60} min`;
    return `${seconds}s`;
}

// Get status info for oracle report
function getOpGrantStatusInfo(game) {
    if (!game.activeReport) return { text: 'Unknown', class: '' };
    if (game.activeReport.isDistributed) return { text: 'Settled', class: 'settled' };
    if (!game.hasInitialReport) return { text: 'Awaiting Report', class: '' };
    return { text: 'DISPUTE POSSIBLE', class: 'escalation' };
}

// Render OP Grant games
function renderOpGrantGames() {
    const grid = document.getElementById('opgrantGrid');
    if (!grid || opGrantGames.length === 0) return;

    const now = getEstimatedBlockTimestamp();

    grid.innerHTML = opGrantGames.map(game => {
        const timeRemaining = game.canStart ? 0 : Math.max(0, game.nextAvailable - now);
        const isReady = timeRemaining === 0 && !game.activeReportId;
        const isLive = !!game.activeReportId;

        // Parse bounty params
        const bountyStartAmt = parseFloat(ethers.utils.formatEther(game.bountyParams.bountyStartAmt));
        const bountyMaxAmt = parseFloat(ethers.utils.formatEther(game.bountyParams.maxAmount));

        // Card class based on state
        let cardClass = 'game-card';
        if (isLive) cardClass += ' live';
        else if (isReady) cardClass += ' available';

        // Live game content
        if (isLive) {
            const statusInfo = getOpGrantStatusInfo(game);
            let liveInfoHtml = '';

            if (game.hasInitialReport && game.activeReport) {
                // In escalation - show dispute info and settlement countdown
                const report = game.activeReport;

                // Calculate settlement time (handle both BigNumber and number)
                const lastReportTime = report.reportTimestamp
                    ? (typeof report.reportTimestamp.toNumber === 'function' ? report.reportTimestamp.toNumber() : Number(report.reportTimestamp))
                    : 0;
                const settlementTime = report.settlementTime
                    ? (typeof report.settlementTime.toNumber === 'function' ? report.settlementTime.toNumber() : Number(report.settlementTime))
                    : 0;
                const settleTarget = lastReportTime + settlementTime;
                const settleRemaining = Math.max(0, settleTarget - now);
                const settleTimeStr = settleRemaining > 0
                    ? (settleRemaining >= 60 ? `${Math.floor(settleRemaining / 60)}m ${settleRemaining % 60}s` : `${settleRemaining}s`)
                    : 'Now';

                // Detect token types
                const token1Addr = report.token1?.toLowerCase() || '';
                const token2Addr = report.token2?.toLowerCase() || '';
                const isToken1Weth = token1Addr === WETH_ADDRESS.toLowerCase();
                const isToken2Usdc = token2Addr === USDC_ADDRESS.toLowerCase();
                const isToken1Usdc = token1Addr === USDC_ADDRESS.toLowerCase();
                const isToken2Weth = token2Addr === WETH_ADDRESS.toLowerCase();

                // Calculate immediate profit (simplified - for WETH/USDC pairs)
                let profitStr = '$0.00';
                if (ethPrice && ((isToken1Weth && isToken2Usdc) || (isToken1Usdc && isToken2Weth))) {
                    let wethAmount, usdcAmount;
                    if (isToken1Weth) {
                        wethAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount1, 18));
                        usdcAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount2, 6));
                    } else {
                        wethAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount2, 18));
                        usdcAmount = parseFloat(ethers.utils.formatUnits(report.currentAmount1, 6));
                    }
                    const reportedPrice = wethAmount > 0 ? usdcAmount / wethAmount : 0;
                    const priceDiff = Math.abs(ethPrice - reportedPrice);
                    const tokenDistanceUsd = priceDiff * wethAmount;
                    const feePercent = (report.feePercentage ? Number(report.feePercentage) : 0) / 10000000;
                    const burnPercent = (report.protocolFee ? Number(report.protocolFee) : 0) / 10000000;
                    const swapFeeUsd = wethAmount * feePercent * ethPrice;
                    const burnFeeUsd = wethAmount * burnPercent * ethPrice;
                    const disputeGasCost = calculateDisputeGasCost();
                    const disputeGasCostUsd = disputeGasCost ? parseFloat(ethers.utils.formatUnits(disputeGasCost, 18)) * ethPrice : 0;
                    const profit = tokenDistanceUsd - swapFeeUsd - burnFeeUsd - disputeGasCostUsd;
                    profitStr = profit >= 0 ? `$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
                }

                // Format current amounts
                const amt1 = report.currentAmount1 ? parseFloat(ethers.utils.formatUnits(report.currentAmount1, isToken1Usdc ? 6 : 18)) : 0;
                const amt2 = report.currentAmount2 ? parseFloat(ethers.utils.formatUnits(report.currentAmount2, isToken2Usdc ? 6 : 18)) : 0;
                const token1Symbol = isToken1Weth ? 'WETH' : (isToken1Usdc ? 'USDC' : '???');
                const token2Symbol = isToken2Weth ? 'WETH' : (isToken2Usdc ? 'USDC' : '???');
                const amt1Str = amt1 < 0.01 ? amt1.toFixed(6) : amt1.toFixed(2);
                const amt2Str = amt2 < 0.01 ? amt2.toFixed(6) : amt2.toFixed(2);

                liveInfoHtml = `
                    <div class="game-escalation-info">
                        <div class="game-escalation-row">
                            <span class="game-escalation-label">${token1Symbol}</span>
                            <span class="game-escalation-value">${amt1Str}</span>
                        </div>
                        <div class="game-escalation-row">
                            <span class="game-escalation-label">${token2Symbol}</span>
                            <span class="game-escalation-value">${amt2Str}</span>
                        </div>
                        <div class="game-escalation-row">
                            <span class="game-escalation-label">Immediate Profit</span>
                            <span class="game-escalation-value profit">${profitStr}</span>
                        </div>
                        <div class="game-escalation-row">
                            <span class="game-escalation-label">Settles in</span>
                            <span class="game-escalation-value countdown" id="settle-countdown-${game.id}" data-settle-target="${settleTarget}">${settleTimeStr}</span>
                        </div>
                    </div>
                `;
            } else if (game.activeBounty) {
                // Awaiting report - show bounty info and commitment
                const bountyAmt = calcCurrentBounty(game.activeBounty, now, 0);
                const bountyOp = parseFloat(ethers.utils.formatEther(bountyAmt));
                const roundLen = game.activeBounty.roundLength ? game.activeBounty.roundLength.toNumber() : 6;
                const maxRounds = game.activeBounty.maxRounds || game.bountyParams.maxRounds;
                const startTime = game.activeBounty.start ? game.activeBounty.start.toNumber() : game.lastGameTime;
                const elapsed = Math.max(0, now - startTime);
                const currentRound = Math.min(Math.floor(elapsed / roundLen), maxRounds);

                liveInfoHtml = `
                    <div class="game-params" style="margin-bottom: 12px;">
                        <div class="game-param">
                            <div class="game-param-label">Commitment</div>
                            <div class="game-param-value">${getCommitmentUsd(game)}</div>
                        </div>
                        <div class="game-param">
                            <div class="game-param-label">Settlement</div>
                            <div class="game-param-value">${GAME_SETTLEMENT[game.id]}</div>
                        </div>
                    </div>
                    <div class="game-bounty-section live">
                        <div class="game-bounty-header">
                            <span class="game-bounty-label">Current Bounty</span>
                            <span class="game-bounty-round" id="round-${game.id}">Round ${currentRound}/${maxRounds}</span>
                        </div>
                        <div class="game-bounty-amount live" id="bounty-${game.id}">${bountyOp.toFixed(4)} OP</div>
                        <div class="game-bounty-range">Max: ${bountyMaxAmt.toFixed(2)} OP</div>
                    </div>
                `;
            }

            return `
                <div class="${cardClass}" data-game-id="${game.id}">
                    <div class="game-header">
                        <div class="game-id">Game <span>#${game.id + 1}</span></div>
                        <span class="game-cooldown-badge live">
                            🔴 LIVE
                        </span>
                    </div>

                    <div class="game-report-info">
                        <div class="game-report-id">Report #${game.activeReportId}</div>
                        <div class="game-report-status ${statusInfo.class}">${statusInfo.text}</div>
                    </div>

                    ${liveInfoHtml}

                    <div class="game-actions">
                        <button class="game-start-btn live"
                                onclick="goToOpGrantReport(${game.activeReportId})">
                            View & Report →
                        </button>
                    </div>
                </div>
            `;
        }

        // Idle/ready game content
        return `
            <div class="${cardClass}" data-game-id="${game.id}">
                <div class="game-header">
                    <div class="game-id">Game <span>#${game.id + 1}</span></div>
                    <span class="game-cooldown-badge ${isReady ? 'ready' : 'waiting'}">
                        ${isReady ? 'Available' : formatCooldown(game.gameTimer) + ' cooldown'}
                    </span>
                </div>

                <div class="game-params">
                    <div class="game-param" style="position: relative;">
                        <span class="tooltip-icon game-param-tip" data-tip="Half in each token. Commitment not required to start game.">(?)</span>
                        <div class="game-param-label">Commitment</div>
                        <div class="game-param-value">${getCommitmentUsd(game)}</div>
                    </div>
                    <div class="game-param">
                        <div class="game-param-label">Settlement</div>
                        <div class="game-param-value">${GAME_SETTLEMENT[game.id]}</div>
                    </div>
                </div>

                <div class="game-countdown">
                    <div class="game-countdown-label">${isReady ? 'Status' : 'Next Game In'}</div>
                    <div class="game-countdown-timer ${isReady ? 'ready' : ''}" id="countdown-${game.id}">
                        ${isReady ? '✓ Ready to Start' : formatTimeRemaining(timeRemaining)}
                    </div>
                </div>

                <div class="game-bounty-section">
                    <div class="game-bounty-header">
                        <span class="game-bounty-label">Bounty Reward</span>
                        <span class="game-bounty-token">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff0420"><circle cx="12" cy="12" r="10"/></svg>
                            OP Token
                        </span>
                    </div>
                    <div class="game-bounty-amount">${bountyStartAmt.toFixed(4)} - ${bountyMaxAmt.toFixed(2)} OP</div>
                    <div class="game-bounty-range">Escalates over ${game.bountyParams.maxRounds} rounds</div>
                </div>

                <div class="game-actions">
                    <button class="game-start-btn"
                            data-loading-id="opgrant-${game.id}"
                            onclick="startOpGrantGame(${game.id}, this)"
                            ${isReady ? '' : 'disabled'}>
                        ${isReady ? 'Start Game' : 'Waiting...'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Navigate to report from OP Grant game
function goToOpGrantReport(reportId) {
    document.getElementById('reportId').value = reportId;
    switchTab('single');
    searchReport();
}

// Start OP Grant game
async function startOpGrantGame(gameId, btn = null) {
    if (!signer) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    // Check network
    if (currentNetworkId !== 'optimism') {
        showOpGrantError('Please switch to Optimism network');
        return;
    }

    const game = opGrantGames[gameId];
    if (!game || !game.canStart) {
        showOpGrantError('Game is not available yet');
        return;
    }

    const buttonId = `opgrant-${gameId}`;
    setButtonLoading(btn, true, 'Start Game', buttonId);

    try {
        console.log(`Starting OP Grant game ${gameId}...`);

        const faucetContract = new ethers.Contract(OP_GRANT_FAUCET_ADDRESS, OP_GRANT_FAUCET_ABI, signer);

        // Estimate gas
        let gasEstimate;
        try {
            gasEstimate = await faucetContract.estimateGas.bountyAndPriceRequest(gameId);
            gasEstimate = gasEstimate.mul(120).div(100); // 20% buffer
        } catch (e) {
            console.warn('Gas estimation failed, using default:', e.message);
            gasEstimate = ethers.BigNumber.from(500000);
        }

        const tx = await faucetContract.bountyAndPriceRequest(gameId, { gasLimit: gasEstimate });
        console.log('TX sent:', tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log('Game started!', receipt);

        setButtonLoading(btn, false, 'Start Game', buttonId);

        // Parse event to get reportId
        const gameCreatedEvent = receipt.events?.find(e => e.event === 'GameCreated');
        if (gameCreatedEvent) {
            const reportId = gameCreatedEvent.args.reportId.toString();
            console.log('Created report ID:', reportId);

            // Navigate to the report
            document.getElementById('reportId').value = reportId;
            switchTab('single');
            searchReport();
        }

        // Reload games
        await loadOpGrantGames();

    } catch (e) {
        console.error('Failed to start game:', e);
        setButtonLoading(btn, false, 'Start Game', buttonId);
        if (e.message.includes('user rejected')) {
            showOpGrantError('Transaction rejected');
        } else if (e.message.includes('too early')) {
            showOpGrantError('Game is still on cooldown. Please wait.');
        } else {
            showOpGrantError('Failed to start game: ' + (e.reason || e.message));
        }
    }
}

// Update countdown timers
function updateOpGrantCountdowns() {
    if (!isOpGrantAvailable() || opGrantGames.length === 0) return;

    const now = getEstimatedBlockTimestamp();
    const estBlock = getEstimatedBlockNumber();

    opGrantGames.forEach(game => {
        const isLive = !!game.activeReportId && !!game.activeReport;

        // Update countdown for non-live games
        if (!isLive) {
            const countdown = document.getElementById(`countdown-${game.id}`);
            if (!countdown) return;

            const timeRemaining = game.canStart ? 0 : Math.max(0, game.nextAvailable - now);
            const isReady = timeRemaining === 0;

            countdown.textContent = isReady ? '✓ Ready to Start' : formatTimeRemaining(timeRemaining);
            countdown.classList.toggle('ready', isReady);

            // Update button state (skip if button is in loading state)
            const card = countdown.closest('.game-card');
            if (card) {
                const btn = card.querySelector('.game-start-btn');
                if (btn && !btn.classList.contains('btn-loading')) {
                    btn.disabled = !isReady;
                    btn.textContent = isReady ? 'Start Game' : 'Waiting...';
                }
                card.classList.toggle('available', isReady);
            }

            game.canStart = isReady;
            game.timeRemaining = timeRemaining;
        }

        // Update live bounty display (for awaiting report)
        if (isLive && game.activeBounty && !game.hasInitialReport) {
            const bountyEl = document.getElementById(`bounty-${game.id}`);
            const roundEl = document.getElementById(`round-${game.id}`);

            if (bountyEl) {
                const bountyAmt = calcCurrentBounty(game.activeBounty, now, estBlock);
                const bountyOp = parseFloat(ethers.utils.formatEther(bountyAmt));
                bountyEl.textContent = `${bountyOp.toFixed(4)} OP`;
            }

            if (roundEl) {
                const roundLen = game.activeBounty.roundLength ? game.activeBounty.roundLength.toNumber() : 6;
                const maxRounds = game.activeBounty.maxRounds || 35;
                const startTime = game.activeBounty.start ? game.activeBounty.start.toNumber() : game.lastGameTime;
                const elapsed = Math.max(0, now - startTime);
                const currentRound = Math.min(Math.floor(elapsed / roundLen), maxRounds);
                roundEl.textContent = `Round ${currentRound}/${maxRounds}`;
            }
        }

        // Update settlement countdown (for in escalation)
        if (isLive && game.hasInitialReport) {
            const settleCountdownEl = document.getElementById(`settle-countdown-${game.id}`);
            if (settleCountdownEl) {
                const settleTarget = parseInt(settleCountdownEl.dataset.settleTarget) || 0;
                const settleRemaining = Math.max(0, settleTarget - now);
                settleCountdownEl.textContent = settleRemaining > 0
                    ? (settleRemaining >= 60 ? `${Math.floor(settleRemaining / 60)}m ${settleRemaining % 60}s` : `${settleRemaining}s`)
                    : 'Now';
            }
        }
    });
}

// Start OP Grant update timer
let opGrantRefreshTimer = null;

function startOpGrantUpdateTimer() {
    if (opGrantUpdateTimer) clearInterval(opGrantUpdateTimer);
    if (opGrantRefreshTimer) clearInterval(opGrantRefreshTimer);

    // Update countdowns every second
    opGrantUpdateTimer = setInterval(updateOpGrantCountdowns, 1000);

    // Refresh game data from contract every 10 seconds
    opGrantRefreshTimer = setInterval(() => {
        loadOpGrantGames();
    }, 10000);
}

// Stop OP Grant update timer
function stopOpGrantUpdateTimer() {
    if (opGrantUpdateTimer) {
        clearInterval(opGrantUpdateTimer);
        opGrantUpdateTimer = null;
    }
    if (opGrantRefreshTimer) {
        clearInterval(opGrantRefreshTimer);
        opGrantRefreshTimer = null;
    }
}
