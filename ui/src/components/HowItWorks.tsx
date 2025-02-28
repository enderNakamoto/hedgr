"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { BiPlayCircle } from "react-icons/bi";
import { DialogTitle } from "@radix-ui/react-dialog";

export const HowItWorks = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          How HedgeWave Works
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Smart Contract Integration
              </h3>
              <p className="text-gray-600">
                Our advanced smart contracts automatically execute trades based
                on your predefined hedging strategies.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Real-time Risk Management
              </h3>
              <p className="text-gray-600">
                Monitor and adjust your positions with real-time market data and
                risk analytics.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Automated Hedging
              </h3>
              <p className="text-gray-600">
                Set up automated hedging rules that protect your portfolio 24/7.
              </p>
            </div>
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <BiPlayCircle className="w-20 h-20 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogTitle className="text-transparent">Video</DialogTitle>
        <DialogContent className="max-w-4xl p-0">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="HedgeWave Explainer Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
