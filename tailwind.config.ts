import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  // Ensure our custom class names are never dropped in production
  safelist: [
    "container-px",
    "header-glass",
    "card",
    "btn-primary",
    "btn-ghost",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
