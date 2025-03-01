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

![alt text](images/architecture.png.png)

The Contract Architecture looks like this: 

![alt text](images/contract.png)

## Oracle

We used Acurast TEEs to get real life data (not just on-chain price).

![alt text](images/acurast.png)


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
