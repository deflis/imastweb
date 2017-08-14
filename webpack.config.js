const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin3');
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "dev"
}

const config = {
    entry: {
        "app": "./src/index.ts",
    },
    output: {
        filename: "bundle.js",
        publicPath: "/",
        path: path.resolve(process.cwd() + "/build")
    },
    devtool: "source-map",
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            "module": "es2015",
                        },
                    },
                },],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                enforce: "post",
                test: /\.[js|tsx?]$/,
                use: [{
                    loader: 'buble-loader',
                    options: {
                        target: { chrome: 50, firefox: 48 },
                        transforms: {
                            modules: false
                        },
                    },
                },],
            },
            {
                // make all files ending in .json5 use the `json5-loader`
                test: /\.json5$/,
                loader: 'json5-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "less-loader" },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "sass-loader" },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ],
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".vue", ".js", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: `iMast(${process.env.NODE_ENV})`,
            filename: 'index.html',
            template: 'src/index.ejs'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV == "production"),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        hot: true,
        historyApiFallback: true,
    }
};

if (process.env.NODE_ENV == "production") {
    //config.devtool = false;
    config.plugins = [
        new HtmlWebpackPlugin({
            title: 'iMast',
            filename: 'index.html',
            template: 'src/index.ejs'
        }),
        new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJSPlugin({
            sourceMap: config.devtool && (config.devtool.indexOf("sourcemap") >= 0 || config.devtool.indexOf("source-map") >= 0),
            uglifyOptions: {
                ecma: 8,
                output: {
                    beautify: false
                },
            }
        }),
    ]
}

module.exports = config;