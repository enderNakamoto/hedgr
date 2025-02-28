"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiDogecoin, SiLitecoin } from "react-icons/si";
import { TbCurrencyMonero } from "react-icons/tb";
import { FaLink } from "react-icons/fa";

const mockCurrencies = [
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.152,
    change24h: 1.2,
    icon: SiDogecoin,
    color: "#C2A633",
  },
  {
    id: "ltc",
    name: "Litecoin",
    symbol: "LTC",
    price: 68.45,
    change24h: -0.8,
    icon: SiLitecoin,
    color: "#345D9D",
  },
  {
    id: "monero",
    name: "Monero",
    symbol: "XMR",
    price: 164.2,
    change24h: 2.5,
    icon: TbCurrencyMonero,
    color: "#FF6600",
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    price: 18.75,
    change24h: 3.1,
    icon: FaLink,
    color: "#2A5ADA",
  },
  {
    id: "doge2",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.152,
    change24h: 1.2,
    icon: SiDogecoin,
    color: "#C2A633",
  },
  {
    id: "ltc2",
    name: "Litecoin",
    symbol: "LTC",
    price: 68.45,
    change24h: -0.8,
    icon: SiLitecoin,
    color: "#345D9D",
  },
  {
    id: "monero2",
    name: "Monero",
    symbol: "XMR",
    price: 164.2,
    change24h: 2.5,
    icon: TbCurrencyMonero,
    color: "#FF6600",
  },
  {
    id: "chainlink2",
    name: "Chainlink",
    symbol: "LINK",
    price: 18.75,
    change24h: 3.1,
    icon: FaLink,
    color: "#2A5ADA",
  },
];

export const CurrencyCarousel = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev - 1) % (mockCurrencies.length * 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="w-full overflow-hidden bg-secondary/30 py-6">
      <div
        className="flex gap-4 transition-transform duration-300"
        style={{ transform: `translateX(${position}px)` }}
      >
        {mockCurrencies.map((currency) => (
          <Card
            key={currency.id}
            className="min-w-[200px] bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <currency.icon
                  className="w-6 h-6"
                  style={{ color: currency.color }}
                />
                <CardTitle className="text-lg font-semibold">
                  {currency.symbol}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {formatPrice(currency.price)}
              </div>
              <div
                className={`text-sm font-medium ${
                  currency.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {currency.change24h >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(currency.change24h)}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
