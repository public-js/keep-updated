module.exports = {
    plugins: ['simple-import-sort'],
    rules: {
        'simple-import-sort/imports': [
            'warn',
            {
                groups: [
                    ['^(@angular|@ngrx)/.*', '^rxjs(/.*|$)', '^(jasmine|jest)', '^node:*'],
                    ['^(@public-js)/.*'],
                    // ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'warn',
    },
};
