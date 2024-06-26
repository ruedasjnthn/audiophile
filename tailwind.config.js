/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.liquid'],
    theme: {
        fontFamily: {
            manrope: ['Manrope', 'sans-serif'],
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1440px',
            // => @media (min-width: 1536px) { ... }
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
