import { LucideWaves, LucideArrowRight, LucideDownload } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export const XrplSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#D6BCFA] to-[#9b87f5] bg-clip-text text-transparent">
              Powered by RLUSD & Ripple
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Built on the XRP Ledger, HedgeWave leverages the power of one of
              the fastest, most energy-efficient blockchain networks in the
              world. Our integration with XRPL ensures lightning-fast
              transactions and minimal environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer">
                Learn more about XRPL
                <LucideArrowRight className="w-4 h-4" />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-accent text-accent hover:bg-accent hover:text-white"
                onClick={() => window.open("https://xumm.app/", "_blank")}
              >
                <LucideDownload className="w-4 h-4" />
                Download XRPL Wallet
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute w-full h-full">
              <LucideWaves className="random-float w-12 h-12 text-[#9b87f5] top-0 left-1/4" />
              <LucideWaves className="random-float animation-delay-2000 w-12 h-12 text-[#D6BCFA] bottom-1/4 right-1/4" />
              <LucideWaves className="random-float animation-delay-4000 w-12 h-12 text-[#9b87f5] bottom-0 right-1/3" />
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 relative">
              <Image
                src="/images/xrpl.svg"
                alt="XRPL Logo"
                width={32}
                height={32}
                className="mx-auto mb-6 animate-float"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#1A1F2C] mb-2">
                  XRP Ledger
                </h3>
                <p className="text-gray-600">Fast, Sustainable, and Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
