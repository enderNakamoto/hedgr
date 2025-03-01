"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiRipple, SiSolana } from "react-icons/si";

// Mock data - can be replaced with CoinGecko API data later
const mockCryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 84118.82,
    change24h: 2.5,
    icon: FaBitcoin,
    color: "#F7931A",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2235.65,
    change24h: -1.2,
    icon: FaEthereum,
    color: "#627EEA",
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 2.14,
    change24h: 5.8,
    icon: SiRipple,
    color: "#00B8D4",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 147.45,
    change24h: 3.2,
    icon: SiSolana,
    color: "#00FFA3",
  },
];

export const CryptoPrices = () => {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Live Crypto Prices
          </h2>
          {/* <div className="mt-4 flex justify-center gap-2">
            <Button
              variant={timeframe === "24h" ? "default" : "outline"}
              onClick={() => setTimeframe("24h")}
            >
              24H
            </Button>
            <Button
              variant={timeframe === "7d" ? "default" : "outline"}
              onClick={() => setTimeframe("7d")}
            >
              7D
            </Button>
            <Button
              variant={timeframe === "30d" ? "default" : "outline"}
              onClick={() => setTimeframe("30d")}
            >
              30D
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCryptoData.map((crypto) => (
            <Card
              key={crypto.id}
              className={`group transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCrypto === crypto.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() =>
                setSelectedCrypto(
                  crypto.id === selectedCrypto ? null : crypto.id
                )
              }
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <crypto.icon
                    className="w-6 h-6"
                    style={{ color: crypto.color }}
                  />
                  <CardTitle className="text-xl font-semibold">
                    {crypto.symbol}
                  </CardTitle>
                </div>
                <CardDescription>{crypto.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(crypto.price)}
                </div>
                <div
                  className={`text-sm font-medium ${
                    crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {crypto.change24h >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(crypto.change24h)}%
                </div>
                {selectedCrypto === crypto.id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>24h Volume: {formatPrice(crypto.price * 1000)}</p>
                    <p>Market Cap: {formatPrice(crypto.price * 1000000)}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
