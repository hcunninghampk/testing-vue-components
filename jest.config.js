module.exports = {
  verbose: true,
  roots: ["<rootDir>/src/", "<rootDir>/specs/"],
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"//tell Jest that every file ending in .vue should run thru vue-jest
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]
};
