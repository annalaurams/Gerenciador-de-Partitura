import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier'; // 1. Importe aqui

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'prisma'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ... suas outras configs
  eslintConfigPrettier, // 2. SEMPRE por último
);
