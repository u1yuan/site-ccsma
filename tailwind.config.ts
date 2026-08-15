import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "var(--night-950)",
          900: "var(--night-900)",
        },
        navi: { 600: "var(--navi-600)" },
        bio: { 400: "var(--bio-400)" },
        sprite: { 100: "var(--sprite-100)" },
        flora: { 500: "var(--flora-500)" },
        heli: { 400: "var(--heli-400)" },
        ink: { 100: "var(--ink-100)" },
        campus: {
          green: "var(--campus-green)",
          gold: "var(--campus-gold)",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "monospace"],
      },
      boxShadow: {
        bio: "0 0 32px color-mix(in srgb, var(--bio-400) 22%, transparent)",
        flora: "0 0 40px color-mix(in srgb, var(--flora-500) 20%, transparent)",
      },
      backgroundImage: {
        "technical-grid":
          "linear-gradient(color-mix(in srgb, var(--bio-400) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--bio-400) 7%, transparent) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
