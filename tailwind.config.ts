// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Adição da cor AGP ---
        'agp-green': '#0b4e3e', // Verde Floresta Profundo
        // ------------------------
      },
      // ... outras extensões
    },
  },
  plugins: [],
};

export default config;