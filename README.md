# HedgeWave

## What Did we Build and Why?

We set out to create a protocol to Hedge Real Life Risks.

We built a generalized Hedge/Risk Protocol that could be adapted for Insirance, Prediction Markets, or simply a way to Hedge against real life events

### Our Example: 
Hedge against Inflation of Turkish Lira.

## How did we do it? - Risk/Hedge Protocol

We built a protocol on top of ERC4626 primitive ((https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol))

![alt text](images/vault.png)

We then Combined Vaults to create our hedge/Risk

![alt text](images/architecture.png)

The Contract Architecture looks like this: 

![alt text](images/contract.png)

## Oracle

We used Acurast TEEs to get real life data (not just on-chain price).

![alt text](images/acurast.png)

Funfact: 

All the Acurast TEEs are actually processors of old phones. They are a Depin project

![alt text](images/cluster.png)


## How to run this locally: 
Contract commands:

```
forge install
forge build
forge test
```

Script commands (check if environment variables are set by example):

```
forge clean
forge build
forge script script/CreateMarket.s.sol --rpc-url sepolia
forge script script/Deploy.s.sol --rpc-url sepolia
forge script script/DeployCore.s.sol --rpc-url sepolia
forge script script/DeployMainnet.s.sol --rpc-url sepolia
forge script script/DeployTestnet.s.sol --rpc-url sepolia
forge script script/ManageMarket.s.sol --rpc-url sepolia
```

To broadcast these transactions on-chain instead of simulate, add `--broadcast` flag at the end

Foundry environment variables: [.env.example](./.env.example)

UI commands:

```
cd ui
npm install
npm run dev
```

For production:

```
cd ui
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

UI environment variables: [.env.example](./ui/.env.example)

Contracts deploy order:

- Deploy MarketController with empty constructor
- Deploy MarketFactory with controller and ERC20 asset addresses
- Call setMarketFactory function for MarketController with market factory address

Create a new market with parameters (start time, end time, trigger price)

Deposit flow:

- Check if deposits are allowed
- Approve amount of underlying asset (ERC20) to the spender (vault)
- Deposit to vault setting your address as a receiver

Helpful tools:

https://www.unixtimestamp.com/

Market states:

<img src="./images/market-states.png" alt="Market States"/>

## Smart Contracts 

### ETH Sepolia using RLUSD 


### Hedera Testnet 

* HUSD  
    * 0x194543C05F72Dd85bECD13B00d3DdF3d77daEDD7
    * https://hashscan.io/testnet/contract/0.0.5640748?ps=1&pa=1&pr=1&pf=1

* Controller 
    * 0xeA6928bDCcd7F756726C43CA7AD32d2398AFCFe3
    * https://hashscan.io/testnet/contract/0.0.5640750?pa=1&ps=1&pf=1&pr=1

* Factory 
    * 0x40293e9Eec7ceB331617C86DA17f2801083Ed74F
    * https://hashscan.io/testnet/contract/0.0.5640752?ps=1&pa=1&pr=1&pf=1

#### Markets Deployed 

* Market id 1
    * uint256: startTime 1740834000
    * uint256: endTime 1741006800
    * address: riskVault 0xf24d7A71863706429f79AC1C9eB883bc657F8365
    * address: hedgeVault 0xF67F2110f7DE7AB482C39509C36cc980a8d8f17E
    * strike price 17

* Market id 2
    * uint256: startTime 1740834000
    * uint256: endTime 1741438800
    * address: riskVault 0x3d8c1684Dc9Ff8F61A3Aa0C20AAad8e731068612
    * address: hedgeVault 0x2317BaD11916612687BDc4596C709D1ae9266C58
    * strike price 15

## U2U Network Testnet (Nebula)

## Demo 