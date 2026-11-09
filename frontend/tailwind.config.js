/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bc: {
          black: '#080808',
          surface: '#151515',
          card: '#181818',
          'card-hover': '#202020',
          border: '#303030',
          'border-light': '#444444',
          muted: '#A7A5A2',
          white: '#F5F3EF',
          red: '#F32936',
          'red-hover': '#D81C29',
          'red-glow': 'rgba(243, 41, 54, 0.35)',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(243, 41, 54, 0.35)',
        'glow-red-lg': '0 0 50px rgba(243, 41, 54, 0.45)',
        'glow-subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

