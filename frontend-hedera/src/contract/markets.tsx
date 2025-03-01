export const allMarkets = [
  {
    ControllerAddress: "0xeA6928bDCcd7F756726C43CA7AD32d2398AFCFe3",
    FactoryAddress: "0x40293e9Eec7ceB331617C86DA17f2801083Ed74F",
    HedgeAddress: "0xF67F2110f7DE7AB482C39509C36cc980a8d8f17E",
    RiskAddress: "0xf24d7A71863706429f79AC1C9eB883bc657F8365",
    MarketId: 1,
    HedgeEvent: "1000 Turkish Lira will be below $17 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $17 before maturity",
    HedgePayment: "20%",
    RiskPayment: "50%",
    MaturityDate: "Mar 03 2025 13:00:00 GMT+0",
    StrikePrice: 17,
    Fee: 0,
  },
  {
    ControllerAddress: "0xeA6928bDCcd7F756726C43CA7AD32d2398AFCFe3",
    FactoryAddress: "0x40293e9Eec7ceB331617C86DA17f2801083Ed74F",
    HedgeAddress: "0x2317BaD11916612687BDc4596C709D1ae9266C58",
    RiskAddress: "0x3d8c1684Dc9Ff8F61A3Aa0C20AAad8e731068612",
    MarketId: 2,
    HedgeEvent: "1000 Turkish Lira will be below $15 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $15 before maturity",
    HedgePayment: "15%",
    RiskPayment: "37%",
    MaturityDate: "Mar 08 2025 13:00:00 GMT+0",
    StrikePrice: 15,
    Fee: 0,
  },
];

export const oracle = "Acurast TEE";

export const baseEventDescriptionHedge =
  "1000 Turkish Lira will be below selected price before maturity";

export const baseEventDescriptionRisk =
  "1000 Turkish Lira will NOT be below selected price before maturity";
