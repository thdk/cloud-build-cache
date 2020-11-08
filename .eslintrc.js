module.exports = {
    env: {
        node: true,
        commonjs: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/recommended',
                'prettier/@typescript-eslint',
                'plugin:prettier/recommended',
            ],
            rules: {},
        },
        {
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        },
    ],
};
