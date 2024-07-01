export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@client/(.*)$': '<rootDir>/src/scripts/client/$1',
    '^@server/(.*)$': '<rootDir>/src/scripts/server/$1',
    '^@shared/(.*)$': '<rootDir>/src/scripts/shared/$1',
    '^@tests/(.*)$': '<rootDir>/src/scripts/tests/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/src/scripts/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
