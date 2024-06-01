import variablesPlugin from "@mertasan/tailwindcss-variables";
import colorVariable from "@mertasan/tailwindcss-variables/colorVariable";
import containerQueryPlugin from "@tailwindcss/container-queries";
import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export const lightVariables = {
  colors: {
    border: "#DFE6E9",
    input: "#e2e8f0",
    ring: "#4E6AFF",
    background: "#ffffff",
    foreground: "#020817",
    primary: "#4E6AFF",
    "primary-foreground": "#ffffff",
    "primary-dark": "#323FD4",
    secondary: "#F55B7A",
    "secondary-foreground": "#0f172a",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    success: "#39a561",
    "success-foreground": "#ffffff",
    muted: "#f8fafc",
    "muted-foreground": "#64748b",
    accent: "#f1f5f9",
    "accent-foreground": "#0f172a",
    popover: "#ffffff",
    "popover-foreground": "#020817",
    card: "#ffffff",
    "card-foreground": "#020817",
    grayText: "#444649",
    titleText: "#18191A",
  },
};

export const darkVariables = {
  colors: {
    border: "#DFE6E9",
    input: "#e2e8f0",
    ring: "#4E6AFF",
    background: "#ffffff",
    foreground: "#020817",
    primary: "#4E6AFF",
    "primary-foreground": "#ffffff",
    "primary-dark": "#323FD4",
    secondary: "#F55B7A",
    "secondary-foreground": "#0f172a",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    success: "#39a561",
    "success-foreground": "#ffffff",
    muted: "#f8fafc",
    "muted-foreground": "#64748b",
    accent: "#f1f5f9",
    "accent-foreground": "#0f172a",
    popover: "#ffffff",
    "popover-foreground": "#020817",
    card: "#ffffff",
    "card-foreground": "#020817",
    grayText: "#444649",
    titleText: "#18191A",
  },
};

export default {
  content: [],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      boxShadow: {
        sm: "0 2px 8px 0 rgb(0, 0, 0, 0.025), 0 0 1px rgba(0,0,0,0.1)",
        DEFAULT: "0 4px 16px 0 rgb(0, 0, 0, 0.05), 0 0 1px rgba(0,0,0,0.1)",
        md: "0 6px 24px 0 rgb(0, 0, 0, 0.075), 0 0 1px rgba(0,0,0,0.1)",
        lg: "0 8px 32px 0 rgb(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.1)",
        xl: "0 12px 48px 0 rgb(0, 0, 0, 0.125), 0 0 1px rgba(0,0,0,0.1)",
        "2xl": "0 16px 64px 0 rgb(0, 0, 0, 0.15), 0 0 1px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        lg: `0.75rem`,
        md: `calc(0.75rem - 2px)`,
        sm: "calc(0.75rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
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
      colors: {
        border: colorVariable("--colors-border"),
        input: colorVariable("--colors-input"),
        ring: colorVariable("--colors-ring"),
        background: colorVariable("--colors-background"),
        foreground: colorVariable("--colors-foreground"),
        primary: {
          DEFAULT: colorVariable("--colors-primary"),
          foreground: colorVariable("--colors-primary-foreground"),
        },
        "primary-dark": colorVariable("--colors-primary-dark"),
        secondary: {
          DEFAULT: colorVariable("--colors-secondary"),
          foreground: colorVariable("--colors-secondary-foreground"),
        },
        destructive: {
          DEFAULT: colorVariable("--colors-destructive"),
          foreground: colorVariable("--colors-destructive-foreground"),
        },
        success: {
          DEFAULT: colorVariable("--colors-success"),
          foreground: colorVariable("--colors-success-foreground"),
        },
        muted: {
          DEFAULT: colorVariable("--colors-muted"),
          foreground: colorVariable("--colors-muted-foreground"),
        },
        accent: {
          DEFAULT: colorVariable("--colors-accent"),
          foreground: colorVariable("--colors-accent-foreground"),
        },
        popover: {
          DEFAULT: colorVariable("--colors-popover"),
          foreground: colorVariable("--colors-popover-foreground"),
        },
        card: {
          DEFAULT: colorVariable("--colors-card"),
          foreground: colorVariable("--colors-card-foreground"),
        },
        grayText: colorVariable("--colors-grayText"),
        title: colorVariable("--colors-titleText"),
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
        "primary-light-gradient":
          "linear-gradient(188.57deg, rgba(240, 241, 255, 0.6) -5.24%, rgba(255, 225, 231, 0.6) 91.83%)",
        "secondary-gradient":
          "linear-gradient(-90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
      },
      borderImage: {
        "primary-gradient":
          "linear-gradient(90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
        "secondary-gradient":
          "linear-gradient(-90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
      },
      textImage: {
        "primary-gradient":
          "linear-gradient(90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
        "secondary-gradient":
          "linear-gradient(-90deg, var(--colors-primary-dark) 0%, var(--colors-secondary) 100%)",
      },
    },
    variables: {
      DEFAULT: lightVariables,
    },
    darkVariables: {
      DEFAULT: darkVariables,
    },
  },
  plugins: [
    formsPlugin({
      strategy: "base",
    }),
    typographyPlugin,
    animatePlugin,
    containerQueryPlugin,
    variablesPlugin({
      colorVariables: true,
    }),
  ],
} satisfies Config;
