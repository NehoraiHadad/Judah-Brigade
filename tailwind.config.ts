import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "Heebo", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        hebrew: ["var(--font-heebo)", "Heebo", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        heebo: ["var(--font-heebo)", "Heebo", "sans-serif"],
        noto: ["var(--font-noto-sans-hebrew)", "Noto Sans Hebrew", "sans-serif"],
      },
      colors: {
        // Essential colors for the project
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        gold: {
          50: "#fefdf8",
          100: "#fef7e7",
          200: "#fdecc4",
          300: "#fbdc96",
          400: "#f7c566",
          500: "#d4af37",
          600: "#b8941f",
          700: "#9c7c1a",
          800: "#806515",
          900: "#654f11",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "gentle-float": "gentleFloat 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "blink": "blink 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(251, 191, 36, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "25%, 75%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
}

export default config
