export const allMarkets = [
  {
    ControllerAddress: "0xA6A0f612A764B23CdEffac61Fe677380Ac7f5f32",
    FactoryAddress: "0x55ED163F184b162F708E9d79C303D65a573508AE",
    HedgeAddress: "0xbe6bB2230F9Eb6C94861Aad91d661FAd14D26452",
    RiskAddress: "0xcf09463De1e4B06719F48cA9E7Bd623919E4A1cC",
    MarketId: 1,
    HedgeEvent: "1000 Turkish Lira will be below $15 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $15 before maturity",
    HedgePayment: "20%",
    RiskPayment: "50%",
    MaturityDate: "Mar 08 2025 11:30:00 GMT+0",
    StrikePrice: 15,
    Fee: 0,
  },
  {
    ControllerAddress: "0xA6A0f612A764B23CdEffac61Fe677380Ac7f5f32",
    FactoryAddress: "0x55ED163F184b162F708E9d79C303D65a573508AE",
    HedgeAddress: "0x4919da093614EC2F829715454cBC355B212CFB30",
    RiskAddress: "0x52f41Fb065d6CFBd68c6BA2f06b2BFd0b711a27e",
    MarketId: 2,
    HedgeEvent: "1000 Turkish Lira will be below $18 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $18 before maturity",
    HedgePayment: "15%",
    RiskPayment: "37%",
    MaturityDate: "Mar 03 2025 11:30:00 GMT+0",
    StrikePrice: 18,
    Fee: 0,
  },
];

export const oracle = "Acurast TEE";

export const baseEventDescriptionHedge =
  "1000 Turkish Lira will be below selected price before maturity";

export const baseEventDescriptionRisk =
  "1000 Turkish Lira will NOT be below selected price before maturity";
