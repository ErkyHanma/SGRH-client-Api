module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1'
  }
};
