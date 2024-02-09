/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "../index.html",
        "../app.js",
        "../js/**/*.js",
        "../landing.html",
        "../dashboard.html",
    ],
    theme: {
        extend: {
            screens: {
                "min-1860": "1860px",
            },
            fontFamily: {
                quicksand: ["Quicksand", "sans-serif"],
            },
            colors: {
                background: {
                    light: "hsl(0deg 0% 93% / <alpha-value>)", // Light background color
                    dark: "hsl(0deg 0% 7% / <alpha-value>)", // Dark background color
                },
                primary: {
                    light: "hsl(211deg 100% 50% / <alpha-value>)", // Light primary color
                    dark: "hsl(211deg 100% 35% / <alpha-value>)", // Dark primary color
                },
                secondary: {
                    light: "hsl(133deg 61% 40% / <alpha-value>)", // Light secondary color
                    dark: "hsl(133deg 61% 30% / <alpha-value>)", // Dark secondary color
                },
                accent: {
                    light: "hsl(27deg 98% 53% / <alpha-value>)", // Light accent color
                    dark: "hsl(32deg 100% 38% / <alpha-value>)", // Dark accent color
                },
                neutral: {
                    light: "hsl(210deg 16% 97% / <alpha-value>)", // Light neutral color
                    dark: "hsl(0deg 0% 14% / <alpha-value>)", // Dark neutral color
                },
                text: {
                    light: "hsl(210deg 10% 22% / <alpha-value>)", // Light text color
                    dark: "hsl(0deg 0% 88% / <alpha-value>)", // Dark text color
                },
                highlight: {
                    light: "hsl(0deg 0% 100% / <alpha-value>)", // Light highlight color
                    dark: "hsl(0deg 0% 96% / <alpha-value>)", // Dark highlight color
                },
                supporting: {
                    light: "hsl(188deg 77% 40% / <alpha-value>)", // Light supporting color
                    dark: "hsl(182deg 80% 25% / <alpha-value>)", // Dark supporting color
                },
                toast: {
                    success: "hsl(143deg 64% 24% / <alpha-value>)",
                    warning: "hsl(50deg 98% 64% / <alpha-value>)",
                    error: "hsl(0deg 74% 42% / <alpha-value>)",
                },
            },
        },
    },
    plugins: [],
};
