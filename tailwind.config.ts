import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced teal palette matching be-shvil-yehuda.com
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
        // Natural color palette inspired by the Judean landscape
        sand: {
          50: "#fefdf8",
          100: "#fef7e7",
          200: "#fdecc4",
          300: "#fbdc96",
          400: "#f7c566",
          500: "#f3b142",
          600: "#e49c2a",
          700: "#be7c20",
          800: "#98621f",
          900: "#7c511e",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
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
        // Enhanced green palette for nature elements
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Enhanced gold palette - more elegant, less yellow/orange
        gold: {
          50: "#fefdf8",
          100: "#fef7e7",
          200: "#fdecc4",
          300: "#fbdc96",
          400: "#f7c566",
          500: "#d4af37", // Classic gold
          600: "#b8941f", // Deeper gold
          700: "#9c7c1a", // Rich gold
          800: "#806515", // Dark gold
          900: "#654f11", // Very dark gold
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        hebrew: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "gentle-float": "gentleFloat 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "image-fade-in": "imageFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "timeline-zoom": "timelineZoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "modal-backdrop": "modalBackdrop 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
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
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        imageFadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        timelineZoom: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        modalBackdrop: {
          "0%": { opacity: "0", backdropFilter: "blur(0px)" },
          "100%": { opacity: "1", backdropFilter: "blur(8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(251, 191, 36, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "teal-landscape": "linear-gradient(135deg, #134e4a 0%, #0f766e 25%, #14b8a6 75%, #5eead4 100%)",
        "natural-gradient": "linear-gradient(to bottom, #f0fdf4, #ecfdf5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
