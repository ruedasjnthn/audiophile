/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.liquid'],
    theme: {
        fontFamily: {
            manrope: ['Manrope', 'sans-serif'],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                sm: '2rem',
                lg: '3.5rem',
                xl: '8rem',
                '2xl': '10rem',
            },
        },
        extend: {},
    },
    plugins: [],
}
