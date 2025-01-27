// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as honoConfig from "@hono/eslint-config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { type Linter } from "eslint";

const eslintConfig: Linter.FlatConfig[] = [
	{
		plugins: ["prettier"],
		rules: {
			"prettier/prettier": "error"
		}
	},
	{ ...honoConfig },
	{ ...eslintPluginPrettierRecommended }
];

export default eslintConfig;
