/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	plugins: [
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports',
	],
	semi: true,
	printWidth: 80,
	tabWidth: 4,
	trailingComma: 'all',
	singleQuote: true,
	importOrder: ['^@/types/*', '<THIRD_PARTY_MODULES>', '^@/server/*', '^@/components/*', '^@/utils/*', '^.*$'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
}

export default config
