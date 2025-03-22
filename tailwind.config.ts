import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./index.html",
        "./src/index.css"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};

export default config;
