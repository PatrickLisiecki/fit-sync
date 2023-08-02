/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            poppins: ["Poppins", "sans-serif"],
        },
        container: {
            padding: {
                DEFAULT: "15px",
            },
        },
        screens: {
            xs: "300px",
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1200px",
        },
        extend: {
            colors: {
                primary: "#333333",
                secondary: "#565656",
                accent: "#FFA500",
                sidebar: "#424242",
            },
            boxShadow: {
                bs: "0 0 10px rgba(0,0,0,.1)",
            },
        },
    },
    plugins: [],
};
