/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': "#FD8B51",
                'secondary': '#257180'
            },
            gridTemplateColumns: {
                'auto': 'repeat(auto-fill,minmax(200px,1fr))'
            }
        },
    },
    plugins: [],
}