module.exports = {
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.js',
  setupFiles: ['./tests/setupEnv.js'],
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 20000
};
