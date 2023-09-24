module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['./.jest/setupEnv.js'],
  transform: {
    '.+\\.(t|j)sx?$': 'ts-jest'
  },
  testRegex: '(/__test__/.*\\.(j|t)sx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
};
