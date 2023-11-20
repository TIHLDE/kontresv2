import type { Config } from 'tailwindcss'
//@ts-expect-error no types
import themeSwapper from 'tailwindcss-theme-swapper'

interface ColorRange {
	50: string
	100: string
	200: string
	300: string
	400: string
	500: string
	600: string
	700: string
	800: string
	900: string
	DEFAULT: string
}

type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

const getColorsWithDefault = (colors: Omit<ColorRange, 'DEFAULT'>, defaultShade: Shades = 500) => ({
	DEFAULT: colors[defaultShade],
	...colors
})

const base = {}

const dark = {}

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {}
	},
	plugins: [
		themeSwapper({
			themes: [
				{
					name: 'base',
					selectors: [':root'],
					theme: base
				},
				{
					name: 'dark',
					selectors: ['.dark'],
					theme: dark
				}
			]
		})
	]
}
export default config
