/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#818182",
        input: "#b0b0b0",
        ring: "#0C2D57",
        background: "#ffffff",
        foreground: "#000000",
        primary: {
          DEFAULT: "#0C2D57",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FC6736",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "#c4c0c0",
          foreground: "#c2c2c2",
        },
        accent: {
          DEFAULT: "#4b72ad",
          foreground: "hsl(var(--accent-foreground))",
        },
        error: {
          DEFAULT: "#bd0909",
        },
        destructive: {
          DEFAULT: "#bd0909",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#0b9439",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
