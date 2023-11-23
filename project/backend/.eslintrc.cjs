module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    rules: {
      "no-console": "warn", // Puedes ajustar según tus necesidades
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // Permitir argumentos no utilizados si se llaman 'next'
      quotes: ["error", "single"], // Preferir comillas simples
      semi: ["error", "always"], // Siempre usar punto y coma al final de las sentencias
      indent: ["error", 2], // Establecer indentación a 2 espacios
    },
  },
};
