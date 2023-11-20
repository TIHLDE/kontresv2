import type { Config } from 'tailwindcss'
import themeSwapper from 'tailwindcss-theme-swapper'

const base = {

}

const dark = {

}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

    },
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
        }
      ]
    })
  ],
}
export default config
