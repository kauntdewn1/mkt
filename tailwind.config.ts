import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-space-grotesk)', ...defaultTheme.fontFamily.mono],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        // Removidos os duplicados para evitar conflitos de nomes
        // As cores já estão definidas acima em sidebar, primary e secondary
        success: '#42ba96',
        info: '#b45be1',
        'info-muted': '#9272a3',
        warning: '#d83aeb',
        danger: '#43b5c5',
        gray: {
          100: '#f9fdfc',
          200: '#f1f8f6',
          300: '#d9efe7',
          400: '#c6e6de',
          500: '#abd5c6',
          600: '#86b8b6',
          700: '#409088',
          800: '#387462',
        },
        black: '#232323',
        'card-bg': '#26262b',
        'card-hover': '#454549',
        'card-bg-light': '#f9f9fb',
        'card-bg-dark': '#000005',
        'new-gray': '#c8c8d6',
        'black-bg': '#232323',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        'xl': '1.3125rem',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'pulseGlow': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'pulseGlow': 'pulseGlow 3s infinite ease-in-out',
  		},
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '100%', letterSpacing: '-0.03rem' }],
        'display-lg': ['clamp(2.625rem, 8vw, 4.5rem)', { lineHeight: '105%', letterSpacing: '-0.0425rem' }],
        'display-md': ['clamp(2.25rem, 8vw, 3.5rem)', { lineHeight: '105%' }],
        'headline-lg': ['2.625rem', { lineHeight: '110%', letterSpacing: '-1px' }],
        'headline-md': ['1.75rem', { lineHeight: '118%' }],
        'headline-sm': ['1.5rem', { lineHeight: '117%' }],
        'body': ['1.3125rem', { lineHeight: '140%' }],
        'small': '1.1rem',
        'smaller': '1rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1141px',
        },
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '10.5': '2.625rem',
        '11.5': '2.875rem',
        '12.5': '3.125rem',
        '13.5': '3.375rem',
        '14.5': '3.625rem',
        '15.5': '3.875rem',
        '16.5': '4.125rem',
      },
      boxShadow: {
        'lift': '0 1rem 2.5rem rgba(35, 35, 35, 0.1), 0 0.5rem 1rem -0.75rem rgba(35, 35, 35, 0.1)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
