const pkg = require('./package.json');

/**
 * 0: off
 * 1: warn
 * 2: error
 */
module.exports = {
    overrides: [
        {
            files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
            rules: {
                'jest/consistent-test-it': [1, { fn: 'test' }],
                'jest/expect-expect': 1,
                'jest/no-deprecated-functions': 2
            }
        }
    ],
    settings: {
        'import/core-modules': [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
    },
    rules: {
        'react/react-in-jsx-scope': 2,
        'react/no-unsafe': [2, { checkAliases: true }],
        'react/no-deprecated': 2,
        'import/no-anonymous-default-export': [
            2,
            {
                allowArray: true,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowLiteral: true,
                allowObject: true
            }
        ],
        'import/no-duplicates': 1,
        'import/order': [
            1,
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'unknown']
            }
        ],
        'import/no-useless-path-segments': [
            1,
            {
                noUselessIndex: true
            }
        ],
        'lines-between-class-members': [1, 'always', { exceptAfterSingleLine: true }],
        'padding-line-between-statements': [
            1,
            {
                blankLine: 'always',
                prev: [
                    'multiline-block-like',
                    'multiline-expression',
                    'const',
                    'let',
                    'var',
                    'cjs-import',
                    'import',
                    'export',
                    'cjs-export',
                    'class',
                    'throw',
                    'directive'
                ],
                next: '*'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'multiline-block-like',
                    'multiline-expression',
                    'const',
                    'let',
                    'var',
                    'cjs-import',
                    'import',
                    'export',
                    'cjs-export',
                    'class',
                    'throw',
                    'return'
                ]
            },
            { blankLine: 'any', prev: ['cjs-import', 'import'], next: ['cjs-import', 'import'] },
            { blankLine: 'any', prev: ['export', 'cjs-export'], next: ['export', 'cjs-export'] },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
        ]
    }
};
