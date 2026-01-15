import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier"; // 1. Importe aqui

export default tseslint.config(
  { ignores: ["dist", "node_modules", "build"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // ... suas outras configs (languageOptions, etc)
  },
  eslintConfigPrettier // 2. SEMPRE por último
);