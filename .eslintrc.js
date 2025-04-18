module.exports = {
  //   ignorePatterns: ["node_modules/"],
  overrides: [
    {
      files: ["node_modules/shadcn/**"],
      rules: {
        "@typescript-eslint/no-empty-object-type": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: "module", // Enables ES6 `import/export` syntax
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  // other ESLint config
};
