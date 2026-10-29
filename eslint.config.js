import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/**", ".astro/**"] },
  {
    files: ["**/*.{js,mjs,ts}"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: { ...tsPlugin.configs.recommended.rules },
  },
  ...astro.configs["flat/recommended"],
];
