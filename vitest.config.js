import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./frontend/tests/setup.js'],
    include: ['frontend/tests/**/*.test.{js,mjs}', 'tests/**/*.test.{js,mjs}'],
    exclude: ['node_modules', 'tests/*.test.mjs'],
  },
});
