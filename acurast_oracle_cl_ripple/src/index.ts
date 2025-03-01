const { ethers } = require('ethers');
// For ethers v6, import specific items
const { JsonRpcProvider, Wallet, Contract } = ethers;
require('dotenv').config();

declare const _STD_: any;

const FROM_CURRENCY =  "TRY";
const TO_CURRENCY = "USD";
const AMOUNT = 1000;

if (typeof _STD_ === "undefined") {
  // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
  // Define _STD_ here for local testing.
  console.log("Running in local environment");
  (global as any)._STD_ = {
    app_info: { version: "local" },
    job: { getId: () => "local" },
    device: { getAddress: () => "local" },
    env: {
      API_KEY: process.env.API_KEY,
      RPC_URL: process.env.RPC_URL,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
    }
  };
} else {
  console.log("Running in Acurast Cloud");
}

// Access environment variables using _STD_.env pattern
const API_URL = "http://apilayer.net/api/live";
const API_KEY = _STD_.env.API_KEY;

// Blockchain configuration from environment
const RPC_URL = _STD_.env.RPC_URL;
const PRIVATE_KEY = _STD_.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = _STD_.env.CONTRACT_ADDRESS;

// Contract ABI for the function we need
const CONTROLLER_ABI = [
  "function processOracleData(uint256 marketId, uint256 currentPrice, uint256 timestamp)"
];

async function main() {
  try {
    // Connect to the network
    const provider = new JsonRpcProvider(RPC_URL);
    const wallet = new Wallet(PRIVATE_KEY, provider);
    
    // Connect to the contract
    const controllerContract = new Contract(
      CONTRACT_ADDRESS,
      CONTROLLER_ABI,
      wallet
    );
    
    // Fetch exchange rate from currencylayer API
    const response = await fetch(`${API_URL}?access_key=${API_KEY}&currencies=${TO_CURRENCY}&source=${FROM_CURRENCY}&format=1`);

    if (!response.ok) {
      throw new Error(`Currency API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(`API request failed: ${JSON.stringify(data)}`);
    }
    
    // Extract the exchange rate value
    const rateKey = `${FROM_CURRENCY}${TO_CURRENCY}`;
    const exchangeRate = data.quotes[rateKey];
    console.log(`Exchange rate: ${exchangeRate} ${TO_CURRENCY} per ${FROM_CURRENCY}`);
    
    // Convert exchange rate to blockchain-compatible format
    // Multiply by 10^6 to get integer value as requested
    const scaledValue = Math.round(exchangeRate * (AMOUNT));
    const scaledPrice = BigInt(scaledValue);
    
    // Get current Unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Market ID
    const marketId = 1;
    
    console.log(`Sending data to blockchain contract...`);
    console.log(`Market ID: ${marketId}`);
    console.log(`Current Price: ${scaledPrice} (${exchangeRate} × ${AMOUNT})`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Acurast version: ${_STD_.app_info.version}`);
    console.log(`Deployment ID: ${_STD_.job.getId()}`);
    console.log(`Device Address: ${_STD_.device.getAddress()}`);
    
    // Call the contract function
    const tx = await controllerContract.processOracleData(
      marketId,
      scaledPrice,
      timestamp
    );
    
    console.log(`Transaction sent: ${tx.hash}`);
    console.log('Waiting for transaction confirmation...');
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Execute the main function
main();