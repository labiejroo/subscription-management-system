/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      borderRadius: {
        card: '12px',
      },
      maxWidth: {
        layout: '1200px',
      },
      minWidth: {
        table: '860px',
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '1rem' }],
      },
      spacing: {
        4.5: '1.125rem', // 18px — checkbox & spinner icon containers
      },
    },
  },
  plugins: [],
};
