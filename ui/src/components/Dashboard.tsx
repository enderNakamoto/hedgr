"use client";

import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
import { Button } from "@/components/ui/button";
import { FaWallet, FaChartLine, FaExchangeAlt } from "react-icons/fa";
import { useAppKitAccount } from "@reown/appkit/react";
// import { DashboardSidebar } from "@/components/DashboardSidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { ProfileDialog } from "@/components/ProfileDialog";
// import { ActiveHedgePools } from "@/components/ActiveHedgePools";
// import { DashboardFooter } from "@/components/DashboardFooter";

const mockPortfolioData = [
  { date: "2025-01", value: 10000, hedgedValue: 9800 },
  { date: "2025-02", value: 12000, hedgedValue: 11500 },
  { date: "2025-03", value: 9000, hedgedValue: 10200 },
  { date: "2025-04", value: 15000, hedgedValue: 14000 },
];

const topCryptos = [
  { name: "Bitcoin", symbol: "BTC", value: 45000, amount: 0.85, change: 2.5 },
  { name: "Ethereum", symbol: "ETH", value: 2800, amount: 12.3, change: -1.2 },
  { name: "Ripple", symbol: "XRP", value: 0.85, amount: 15000, change: 5.7 },
  { name: "Cardano", symbol: "ADA", value: 1.2, amount: 8500, change: 3.1 },
  { name: "Solana", symbol: "SOL", value: 98, amount: 125, change: 8.4 },
];

const Dashboard = () => {
  const { isConnected, address } = useAppKitAccount();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <DashboardNavigation />
      <div className="my-20">
        {!isConnected && (
          <p className="text-center">Please connect your wallet first.</p>
        )}
        {isConnected && (
          <p className="text-center">Wallet Address: {address}</p>
        )}
      </div>
      {/* <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-1">
          <DashboardSidebar />
          <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1" />
              <SidebarTrigger className="mr-4" />
              <ProfileDialog />
            </div>

            <div className="grid gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FaWallet className="text-primary" />
                      Total Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$15,000.00</p>
                    <p className="text-sm text-green-500">+5.2% (24h)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FaChartLine className="text-primary" />
                      Hedge Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">+12.5%</p>
                    <p className="text-sm text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FaExchangeAlt className="text-primary" />
                      Active Hedges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">
                      Across 2 pairs
                    </p>
                  </CardContent>
                </Card>
              </div>

              <ActiveHedgePools />

              <Card>
                <CardHeader>
                  <CardTitle>Top Cryptocurrencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCryptos.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className="flex items-center justify-between p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {crypto.symbol}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="font-medium">
                              ${crypto.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {crypto.amount} {crypto.symbol}
                            </div>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              crypto.change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {crypto.change >= 0 ? "+" : ""}
                            {crypto.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockPortfolioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#00E5CC"
                          name="Portfolio Value"
                        />
                        <Line
                          type="monotone"
                          dataKey="hedgedValue"
                          stroke="#6E59A5"
                          name="Hedged Value"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Hedge Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All Positions</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="closed">Closed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                      <div className="grid gap-4">
                        {[1, 2, 3].map((i) => (
                          <Card key={i}>
                            <CardContent className="flex items-center justify-between p-4">
                              <div>
                                <p className="font-semibold">
                                  BTC/USD Hedge #{i}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Opened: 2025-03-{i}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-green-500">
                                  +2.3%
                                </p>
                                <Button variant="outline" size="sm">
                                  Manage
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="active">
                      <p className="text-muted-foreground">
                        Similar content for active positions...
                      </p>
                    </TabsContent>
                    <TabsContent value="closed">
                      <p className="text-muted-foreground">
                        Similar content for closed positions...
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            <DashboardFooter />
          </main>
        </div>
      </SidebarProvider> */}
    </div>
  );
};

export default Dashboard;
