import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  // Add CSS varible def
  ({ addBase }) => {
    addBase({
      ":root": {
        colorScheme: "light",
        "--background": "0 0% 100%",
        "--foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--primary": "20.5 90.2% 48.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem",
        "--chart-1": "12 76% 61%",
        "--chart-2": "173 58% 39%",
        "--chart-3": "197 37% 24%",
        "--chart-4": "43 74% 66%",
        "--chart-5": "27 87% 67%",
      },
      ".dark": {
        colorScheme: "dark",
        "--background": "224 71% 4%",
        "--foreground": "213 31% 91%",
        "--muted": "223 47% 11%",
        "--muted-foreground": "215.4 16.3% 56.9%",
        "--popover": "224 71% 4%",
        "--popover-foreground": "215 20.2% 65.1%",
        "--card": "224 71% 4%",
        "--card-foreground": "213 31% 91%",
        "--border": "216 34% 17%",
        "--input": "216 34% 17%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 1.2%",
        "--secondary": "222.2 47.4% 11.2%",
        "--secondary-foreground": "210 40% 98%",
        "--accent": "216 34% 17%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 63% 31%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "216 34% 17%",
        "--radius": "0.5rem",
        "--chart-1": "220 70% 50%",
        "--chart-2": "160 60% 45%",
        "--chart-3": "30 80% 55%",
        "--chart-4": "280 65% 60%",
        "--chart-5": "340 75% 55%",
      },
    });

    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        borderColor: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
        },
        colors: {
          border: "hsl(var(--border) / <alpha-value>)",
          input: "hsl(var(--input) / <alpha-value>)",
          ring: "hsl(var(--ring) / <alpha-value>)",
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
          primary: {
            DEFAULT: "hsl(var(--primary) / <alpha-value>)",
            foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
            foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
            foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          },
          muted: {
            DEFAULT: "hsl(var(--muted) / <alpha-value>)",
            foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "hsl(var(--accent) / <alpha-value>)",
            foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          },
          popover: {
            DEFAULT: "hsl(var(--popover) / <alpha-value>)",
            foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          },
          card: {
            DEFAULT: "hsl(var(--card) / <alpha-value>)",
            foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "fade-up": {
            "0%": {
              opacity: "0",
              transform: "translateY(10px)",
            },
            "80%": {
              opacity: "0.6",
            },
            "100%": {
              opacity: "1",
              transform: "translateY(0px)",
            },
          },
          "fade-down": {
            "0%": {
              opacity: "0",
              transform: "translateY(-10px)",
            },
            "80%": {
              opacity: "0.6",
            },
            "100%": {
              opacity: "1",
              transform: "translateY(0px)",
            },
          },
          "slide-down-and-fade": {
            from: { opacity: "0", transform: "translateY(-5px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          "slide-left-and-fade": {
            from: { opacity: "0", transform: "translateX(5px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          "slide-up-and-fade": {
            from: { opacity: "0", transform: "translateY(5px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          "slide-right-and-fade": {
            from: { opacity: "0", transform: "translateX(-5px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "slide-up-modal": {
            from: { opacity: "0", transform: "translateY(5%)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
        },
        animation: {
          "fade-up": "fade-up 0.5s",
          "fade-down": "fade-down 0.5s",
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "slide-down-and-fade": "slide-down-and-fade 0.2s ease-out",
          "slide-up-and-fade": "slide-up-and-fade 0.2s ease-out",
          "slide-left-and-fade": "slide-left-and-fade 0.2s ease-out",
          "slide-right-and-fade": "slide-right-and-fade 0.2s ease-out",
        },
      },
    },
  },
);
