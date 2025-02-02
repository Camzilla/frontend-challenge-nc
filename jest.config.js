module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.svg$': 'ts-jest',
  },
}
