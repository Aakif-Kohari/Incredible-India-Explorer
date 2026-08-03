import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./frontend/tests/setup.js'],
    include: ['tests/**/*.test.{js,mjs}', 'frontend/tests/**/*.test.{js,mjs}'],
    exclude: ['node_modules', 'tests/*.test.mjs'],
  },
});
