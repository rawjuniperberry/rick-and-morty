module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}, useBuiltIns: 'usage'}],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: ['syntax-dynamic-import', '@babel/plugin-transform-runtime'],
}
