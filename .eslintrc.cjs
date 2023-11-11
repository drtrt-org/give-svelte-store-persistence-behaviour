module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:node/recommended",
		"plugin:prettier/recommended",
		"plugin:svelte/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		extraFileExtensions: [".svelte"],
	},
	rules: {
		"node/no-missing-import": "off",
		"import/order": [
			"warn",
			{
				groups: ["builtin", "external", "parent", "sibling", "index"],
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	overrides: [
		{
			files: ["*.ts"],
		},
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
};
