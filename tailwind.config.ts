import type { Config } from 'tailwindcss';
import themeSwapper from 'tailwindcss-theme-swapper';

const base = {
    colors: {
        primary: '#1C458A',
        secondary: '#581D6C',
        accent: '#',
        surface: '#',
        background: '#',
    },
    borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '16px',
        xl: '24px',
    },
};

{ 'cyclamen': { DEFAULT: '#F56FA1', 100: '#43051b', 200: '#860937', 300: '#c80e52', 400: '#f02d75', 500: '#f56fa1', 600: '#f78db4', 700: '#f9a9c6', 800: '#fbc6d9', 900: '#fde2ec' }, 'marian_blue': { DEFAULT: '#1C458A', 100: '#060e1c', 200: '#0b1c38', 300: '#112a54', 400: '#173770', 500: '#1c458a', 600: '#2861c4', 700: '#5586dc', 800: '#8eafe8', 900: '#c6d7f3' }, 'tropical_indigo': { DEFAULT: '#9888FF', 100: '#0a004f', 200: '#15009d', 300: '#1f00ec', 400: '#553bff', 500: '#9888ff', 600: '#aea1ff', 700: '#c2b9ff', 800: '#d6d0ff', 900: '#ebe8ff' } }
const dark = {};

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        themeSwapper({
            themes: [
                {
                    name: 'base',
                    selectors: [':root'],
                    theme: base,
                },
                {
                    name: 'dark',
                    selectors: ['.dark'],
                    theme: dark,
                },
            ],
        }),
    ],
};
export default config;
