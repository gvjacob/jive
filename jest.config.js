module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  testMatch: ['/**/*test.js'],
  collectCoverage: false,
  collectCoverageFrom: ['./src/**/*.js', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
