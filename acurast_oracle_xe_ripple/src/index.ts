const { ethers } = require('ethers');
// For ethers v6, import specific items
const { JsonRpcProvider, Wallet, Contract } = ethers;
require('dotenv').config();

declare const _STD_: any;

const FROM_CURRENCY =  "USD";
const TO_CURRENCY = "AED";
const AMOUNT = 1;

if (typeof _STD_ === "undefined") {
  // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
  // Define _STD_ here for local testing.
  console.log("Running in local environment");
  (global as any)._STD_ = {
    app_info: { version: "local" },
    job: { getId: () => "local" },
    device: { getAddress: () => "local" },
    env: {
      XE_API_URL: process.env.XE_API_URL,
      XE_ACCOUNT_ID: process.env.XE_ACCOUNT_ID,
      XE_API_KEY: process.env.XE_API_KEY,
      RPC_URL: process.env.RPC_URL,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
    }
  };
} else {
  console.log("Running in Acurast Cloud");
}

// Access environment variables using _STD_.env pattern
const XE_API_URL = _STD_.env.XE_API_URL;
const XE_ACCOUNT_ID = _STD_.env.XE_ACCOUNT_ID;
const XE_API_KEY = _STD_.env.XE_API_KEY;

// Blockchain configuration from environment
const RPC_URL = _STD_.env.RPC_URL;
const PRIVATE_KEY = _STD_.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = _STD_.env.CONTRACT_ADDRESS;

// Contract ABI for the function we need
const CONTROLLER_ABI = [
  "function processOracleData(uint256 marketId, uint256 currentPrice, uint256 timestamp)"
];

// Create authorization header for XE API
const authHeader = 'Basic ' + Buffer.from(`${XE_ACCOUNT_ID}:${XE_API_KEY}`).toString('base64');

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
    
    // Fetch exchange rate from XE API
    const response = await fetch(`${XE_API_URL}/v1/convert_to?from=${FROM_CURRENCY}&to=${TO_CURRENCY}&amount=${AMOUNT}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      throw new Error(`XE API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the mid value from the response
    const midValue = data.from[0].mid;
    console.log(`Exchange rate: ${midValue} ${TO_CURRENCY} per ${FROM_CURRENCY}`);
    
    // Convert exchange rate to blockchain-compatible format
    const scaledPrice = ethers.parseUnits(midValue.toString(), 18);
    
    // Get current Unix timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Market ID
    const marketId = 1;
    
    console.log(`Sending data to blockchain contract...`);
    console.log(`Market ID: ${marketId}`);
    console.log(`Current Price: ${scaledPrice} (${midValue} scaled)`);
    console.log(`Timestamp: ${timestamp}`);
    
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