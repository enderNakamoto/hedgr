import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F97316",  // Vibrant orange
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFF7ED",  // Light orange-tinted gray
          foreground: "#7C2D12",  // Dark orange-brown
        },
        accent: {
          DEFAULT: "#F59E0B",  // Amber/golden orange
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "rgba(255, 253, 250, 0.9)",  // Warm white with slight opacity
          foreground: "#7C2D12",  // Dark orange-brown
        },
        destructive: {
          DEFAULT: "#DC2626",  // Warm red
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#FEF2F2",  // Very light red/pink
          foreground: "#B91C1C",  // Deeper red
        },
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        }
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "gradient": "gradient 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;