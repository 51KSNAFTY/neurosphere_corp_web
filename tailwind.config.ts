import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#05A8B3',
          accent: '#2FBB8C',
          'accent-alt': '#74CCA3',
          destructive: '#E35345',
        },
        foreground: '#1e1e1e',
        muted: '#555',
        background: '#fefefe',
        'border-color': '#e6e6e6',
        'header-bg': '#1e1e1e',
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans-jp)',
          'Noto Sans JP',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

export default config
