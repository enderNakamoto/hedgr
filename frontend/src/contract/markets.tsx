export const allMarkets = [
  {
    ControllerAddress: "0x87e8B0a19087f0637AA9b27af2747F1CF1814182",
    HedgeAddress: "0xe95DC2d13618c21b2805d22aa54dB95e1e9DeC02",
    RiskAddress: "0xdfe1468d30CEb9c17C36e3845EB0d77a2c7C6494",
    HedgeEvent: "1000 Turkish Lira will be below $18 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $18 before maturity",
    HedgePayment: "20%",
    RiskPayment: "50%",
    MaturityDate: "Mar 07 2025 19:21:00 GMT+0",
    StrikePrice: 18,
    Fee: 0,
  },
  {
    ControllerAddress: "0x87e8B0a19087f0637AA9b27af2747F1CF1814182",
    HedgeAddress: "0xa5299DaD0529405E90146CAA6Af262fd9cEb3832",
    RiskAddress: "0x57Bb38Cc0ce49cbe1Dfe20e6e43bB286AE7Ebec6",
    HedgeEvent: "1000 Turkish Lira will be below $15 before maturity",
    RiskEvent: "1000 Turkish Lira will NOT be below $15 before maturity",
    HedgePayment: "15%",
    RiskPayment: "37%",
    MaturityDate: "Mar 02 2025 23:00:00 GMT+0",
    StrikePrice: 15,
    Fee: 0,
  },
];

export const oracle = "Acurast TEE";

export const baseEventDescriptionHedge =
  "1000 Turkish Lira will be below selected price before maturity";

export const baseEventDescriptionRisk =
  "1000 Turkish Lira will NOT be below selected price before maturity";
