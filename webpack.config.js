const root = require('app-root-path').path,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    mode: 'development',
    watch: true,
    entry: `${root}/src/app.ts`,
    target: 'node',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3100
    },
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: 'bundle.js',
        path: `${root}/dist`,
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            `${root}/node_modules`,
            'node_modules'
        ]
    },
    resolveLoader: {
        //root: [`${root}/node_modules`],
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                }
            ]
        },
            {
                test: /\.yaml/,
                use: [ 'json-loader', 'yaml-frontmatter-loader' ]
            }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};