// tailwind.config.mts
import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-headings": "var(--text)",
            h1: {
              fontWeight: "normal",
              marginBottom: "0.25em",
              fontSize: "2.5rem",
            },
            h2: {
              fontWeight: "600",
              fontSize: "1.25rem",
            },
            "@media (min-width: 768px)": {
              h1: { fontSize: "3.5rem" },
              h2: { fontSize: "1.5rem" },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
