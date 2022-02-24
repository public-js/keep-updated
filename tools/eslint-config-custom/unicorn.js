// The base config taken from: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
module.exports = {
    env: { es2020: true },
    parserOptions: {
        ecmaVersion: 2020, // uni: 'latest'
        sourceType: 'module',
    },
    plugins: ['unicorn'],
    rules: {
        'unicorn/better-regex': 'error',
        'unicorn/catch-error-name': 'warn', // uni: 'error' -- negotiable
        'unicorn/consistent-destructuring': 'warn', // uni: 'error' -- negotiable
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/custom-error-definition': 'off',
        'unicorn/empty-brace-spaces': 'off', // uni: 'error' -- prettier
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'off', // uni: 'error' -- negotiable
        'unicorn/expiring-todo-comments': 'off', // uni: 'error'
        'unicorn/explicit-length-check': 'warn', // uni: 'error' -- negotiable
        'unicorn/filename-case': 'off', // uni: 'error' -- negotiable
        'unicorn/import-index': 'off',
        'unicorn/import-style': 'off', // uni: 'error' -- negotiable
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-array-callback-reference': 'error',
        'unicorn/no-array-for-each': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-array-method-this-argument': 'error',
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-array-reduce': 'off', // uni: 'error' -- questionable
        'unicorn/no-await-expression-member': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-document-cookie': 'error',
        'unicorn/no-empty-file': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-for-loop': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-hex-escape': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-invalid-remove-event-listener': 'error',
        'unicorn/no-keyword-prefix': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-lonely-if': 'warn', // uni: 'error' -- questionable
        'no-nested-ternary': 'off',
        'unicorn/no-nested-ternary': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-new-array': 'off', // uni: 'error' -- questionable
        'unicorn/no-new-buffer': 'off', // uni: 'error' -- questionable
        'unicorn/no-null': 'off', // uni: 'error' -- questionable
        'unicorn/no-object-as-default-parameter': 'error',
        'unicorn/no-process-exit': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-thenable': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/no-unreadable-array-destructuring': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-unsafe-regex': 'off',
        'unicorn/no-unused-properties': 'off',
        'unicorn/no-useless-fallback-in-spread': 'warn', // uni: 'error' -- negotiable
        'unicorn/no-useless-length-check': 'error',
        'unicorn/no-useless-promise-resolve-reject': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/no-useless-undefined': 'error',
        'unicorn/no-zero-fractions': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/numeric-separators-style': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        // TODO: Enable this by default when targeting a Node.js version that supports `Array#at`. -- 16.6.0
        'unicorn/prefer-at': 'off',
        'unicorn/prefer-code-point': 'error',
        'unicorn/prefer-date-now': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-dataset': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-export-from': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-json-parse-buffer': 'warn', // uni: 'error' -- negotiable
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-module': 'error',
        'unicorn/prefer-negative-index': 'warn', // uni: 'error' -- negotiable
        'unicorn/prefer-node-protocol': 'warn', // uni: 'error' -- negotiable
        'unicorn/prefer-number-properties': 'off', // uni: 'error' -- questionable
        'unicorn/prefer-object-from-entries': 'error',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-prototype-methods': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-reflect-apply': 'off', // uni: 'error'
        'unicorn/prefer-regexp-test': 'off', // uni: 'error' -- questionable
        'unicorn/prefer-set-has': 'warn', // uni: 'error' -- negotiable
        'unicorn/prefer-spread': 'error',
        // TODO: Enable this by default when targeting Node.js 16.
        'unicorn/prefer-string-replace-all': 'off',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-trim-start-end': 'warn', // uni: 'error' -- negotiable
        'unicorn/prefer-switch': 'error',
        'unicorn/prefer-ternary': 'warn', // uni: 'error' -- negotiable
        // TODO: Enable this by default when targeting Node.js 14.
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prefer-type-error': 'error',
        'unicorn/prevent-abbreviations': 'warn', // uni: 'error' -- negotiable
        'unicorn/relative-url-style': 'error',
        'unicorn/require-array-join-separator': 'error',
        'unicorn/require-number-to-fixed-digits-argument': 'error',
        'unicorn/require-post-message-target-origin': 'off',
        'unicorn/string-content': 'off',
        'unicorn/template-indent': 'off', // uni: 'error' -- prettier
        'unicorn/text-encoding-identifier-case': 'error',
        'unicorn/throw-new-error': 'error',
    },
};
