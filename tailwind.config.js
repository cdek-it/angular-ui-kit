/** @type {import('tailwindcss').Config} */
const generateColor = (color, arr) => {
    return arr.reduce((res, value) => {
        res[value] = `var(--${color}-${value})`;
        return res;
    }, {});
};
const arr_10_100 = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
// const arr_50_950 = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 ];
const arr_0_900 = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const arr_0_900_alpha = [...arr_0_900, 'alpha'];

export default {
    content: ['./src/**/*.{js,ts,html}', './primeng-sass-theme/themes/base/_styles-tailwind.scss'],
    theme: {
        screens: {
            sm: '1px',
            md: '768px',
            lg: '1200px',
            xl: '1280px',
            '2xl': '1536px'
        },
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                sans: ['Roboto', 'sans-serif']
            },
            colors: {
                // Common
                current: 'currentColor',
                transparent: 'transparent',
                // Primary
                primary: {
                    ...generateColor('primary', arr_0_900_alpha),
                    DEFAULT: 'var(--primary-color)'
                },
                // Service
                danger: 'var(--red-400)',
                warning: 'var(--orange-400)',
                success: 'var(--green-400)',
                info: 'var(--blue-400)',
                help: 'var(--purple-400)',
                // Neutrals
                white: {
                    ...generateColor('white', arr_10_100),
                    DEFAULT: 'var(--white-100)'
                },
                black: {
                    ...generateColor('black', arr_10_100),
                    DEFAULT: 'var(--black-100)'
                },
                //Surface
                surface: {
                    ...generateColor('surface', arr_0_900),
                    ground: 'var(--surface-ground)',
                    section: 'var(--surface-section)',
                    card: 'var(--surface-card)',
                    overlay: 'var(--surface-overlay)',
                    border: 'var(--surface-border)',
                    hover: 'var(--surface-hover)',
                    transparent: 'transparent' // rgba(255, 255, 255, 0.0001) - в фигме нет transparent, это костыль на нее
                },
                // Text
                color: 'var(--text-color)',
                'color-secondary': 'var(--text-color-secondary)',
                'color-primary': 'var(--primary-color-text)'
            },
            lineHeight: {
                DEFAULT: 'normal',
                auto: '1.2'
            },
            borderRadius: {
                kit: 'var(--border-radius)'
            },
            borderWidth: {
                1: '1px',
                2: '2px',
                3: '3px'
            },
            width: {
                1: '1rem',
                2: '2rem',
                3: '3rem',
                4: '4rem',
                5: '5rem',
                6: '6rem',
                7: '7rem',
                8: '8rem',
                9: '9rem',
                10: '10rem',
                11: '11rem',
                12: '12rem',
                13: '13rem',
                14: '14rem',
                15: '15rem',
                16: '16rem',
                17: '17rem',
                18: '18rem',
                19: '19rem',
                20: '20rem',
                21: '21rem',
                22: '22rem',
                23: '23rem',
                24: '24rem',
                25: '25rem',
                26: '26rem',
                27: '27rem',
                28: '28rem',
                29: '29rem',
                30: '30rem',
                34: '34rem',
                45: '45rem',
                50: '50rem',
                54: '54rem',
                58: '58rem',
                60: '60rem'
            },
            height: {
                1: '1rem',
                2: '2rem',
                3: '3rem',
                4: '4rem',
                5: '5rem',
                6: '6rem',
                7: '7rem',
                8: '8rem',
                9: '9rem',
                10: '10rem',
                11: '11rem',
                12: '12rem',
                13: '13rem',
                14: '14rem',
                15: '15rem',
                16: '16rem',
                17: '17rem',
                18: '18rem',
                19: '19rem',
                20: '20rem',
                21: '21rem',
                22: '22rem',
                23: '23rem',
                24: '24rem',
                25: '25rem',
                26: '26rem',
                27: '27rem',
                28: '28rem',
                29: '29rem',
                30: '30rem',
                34: '34rem',
                45: '45rem',
                50: '50rem',
                54: '54rem',
                58: '58rem',
                60: '60rem'
            },
            zIndex: {
                1: '1'
            }
        }
    },
    plugins: [require('tailwindcss')]
};
