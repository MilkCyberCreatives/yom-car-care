import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
