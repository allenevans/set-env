module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  resetMocks: true,
  testMatch: [
    '**/?(*.)spec.ts',
  ],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
  ],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
};
