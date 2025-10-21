module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ==================== FONT FAMILY ====================
      fontFamily: {
        display: ["DM Sans", "system-ui", "sans-serif"], // untuk hero/heading
        heading: ["Outfit", "system-ui", "sans-serif"], // untuk subheading
        body: ["Nunito", "system-ui", "sans-serif"], // untuk paragraf
        accent: ["Outfit", "system-ui", "sans-serif"], // untuk tombol
        sans: ["Nunito", "system-ui", "sans-serif"],
      },

      // ==================== FONT SIZE ====================
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "-0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
      },

      // ==================== FONT WEIGHT ====================
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },

      // ==================== LETTER SPACING ====================
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },

      // ==================== LINE HEIGHT ====================
      lineHeight: {
        tight: 1.1,
        snug: 1.2,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },

      // ==================== COLORS ====================
      colors: {
        blue: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
        },
        cyan: {
          50: "#ecf0ff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },

      // ==================== SPACING ====================
      spacing: {
        128: "32rem",
        144: "36rem",
      },

      // ==================== SHADOWS ====================
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },

      // ==================== BORDER RADIUS ====================
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        base: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      // ==================== ANIMATIONS ====================
      animation: {
        fade: "fade 0.8s ease-out",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        slideIn: "slideIn 0.6s ease-out",
        slideDown: "slideDown 0.6s ease-out",
        blob: "blob 8s infinite",
        "blob-delay-2": "blob 8s infinite 2s",
        "blob-delay-4": "blob 8s infinite 4s",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out infinite 1s",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },

      // ==================== KEYFRAMES ====================
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(2deg)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.05)",
          },
        },
      },

      // ==================== TRANSITIONS ====================
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
      },

      // ==================== BACKDROP ====================
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },

      // ==================== GRADIENTS ====================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
