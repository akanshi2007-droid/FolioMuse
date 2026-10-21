/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c1920',
        ink2: '#26222d',
        cream: '#f3ecdd',
        cream2: '#e9dfca',
        retro: '#1d3fae',
        retro2: '#2f55d6',
        pop: {
          pink: '#ff6fa8',
          orange: '#ff8a3d',
          yellow: '#ffc93c',
          purple: '#8b6cff',
          blue: '#3f6bff',
          green: '#6aa84f',
          red: '#e5324b',
          mint: '#7fe0b4',
        },
      },
      fontFamily: {
        display: ['"Bagel Fat One"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        pixel: ['Silkscreen', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        hard: '4px 4px 0 0 #1c1920',
        hardlg: '6px 6px 0 0 #1c1920',
        hardcream: '4px 4px 0 0 #f3ecdd',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-14px) rotate(calc(var(--r,0deg) + 4deg))' } },
        wiggle: { '0%,100%': { transform: 'rotate(-4deg)' }, '50%': { transform: 'rotate(4deg)' } },
        blink: { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
        popin: { '0%': { transform: 'scale(.6)', opacity: 0 }, '70%': { transform: 'scale(1.06)', opacity: 1 }, '100%': { transform: 'scale(1)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        twinkle: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: .3, transform: 'scale(.6)' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        wiggle: 'wiggle 1.4s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        popin: 'popin .4s cubic-bezier(.2,.9,.3,1.3) both',
        marquee: 'marquee 28s linear infinite',
        twinkle: 'twinkle 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
