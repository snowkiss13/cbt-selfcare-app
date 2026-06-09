import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "system-ui", "sans-serif"]
      },
      colors: {
        primary: "var(--primary)",
        calm: "var(--calm)",
        success: "var(--success)",
        warning: "var(--warning)",
        ink: "var(--gray-700)",
        paper: "var(--gray-50)",
        surface: "var(--gray-100)"
      },
      borderRadius: {
        card: "8px",
        button: "6px"
      }
    }
  },
  plugins: []
};

export default config;
