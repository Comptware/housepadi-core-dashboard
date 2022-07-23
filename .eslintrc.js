module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "standard",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "react"],
  rules: {
    "react/react-in-jsx-scope": 0,
    camelcase: 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
