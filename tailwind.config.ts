import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier Prime', 'monospace'],
      },
      colors: {
        crt: {
          bg: '#0a0e02',
          yellow: '#ffaa00',
          green: '#00dd00',
          red: '#cc0000',
        },
      },
    },
  },
  plugins: [],
}

export default config
