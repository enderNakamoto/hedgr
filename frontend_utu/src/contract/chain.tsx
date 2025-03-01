import { defineChain } from "viem";

export const customNetwork = defineChain({
  id: 2484,
  caipNetworkId: "eip155:2484",
  chainNamespace: "eip155",
  name: "Unicorn Ultra Nebulas Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "U2U",
    symbol: "U2U",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-nebulas-testnet.uniultra.xyz"],
      //webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.u2uscan.xyz/" },
  },
  contracts: {},
});
