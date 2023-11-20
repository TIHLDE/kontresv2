/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
	pluginSearchDirs: false,
	semi: false,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	importOrder: ['^@/types/(.*)$', '<THIRD_PARTY_MODULES>', '^@/server/(.*)$', '^@/components/(.*)$', '^@/utils/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
}

export default config
