"use client";

import { BiTrendingUp } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { APP_NAME } from "@/config/app";

export const DashboardNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleConnect = () => {
    open();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative">
              <BiTrendingUp className="h-8 w-8 text-primary" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              onClick={handleConnect}
              className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] text-white px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 hover:animate-gradient"
            >
              {isConnected
                ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
