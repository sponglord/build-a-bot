const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.resolve(__dirname, dir);

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: [resolve('src/index.js')],// 
    output: {
        filename: 'main.js',
        path: resolve('dist'),
    },
    /**
     * There are multiple devtools available, check
     * https://github.com/webpack/webpack/tree/master/examples/source-map
     */
    devtool: 'source-map',
    // ref: https://webpack.js.org/configuration/dev-server/
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        port: 8050,
        inline: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
        publicPath: '/assets/',
        https: false,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                // This is required for other javascript you are gonna write besides vue.
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                ],
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },

            {
                // loader for Asset URLs - see: https://github.com/webpack-contrib/url-loader
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',//url-loader
                        // options: {
                        //     limit: 8192
                        // }
                    }
                ]
            },
        ],
    },
    
    // devServer: {
    //     // The url you want the webpack-dev-server to use for serving files.
    //     host: '0.0.0.0',
    //     // Can be the popular 8080 also. Browser location will be localhost:8030
    //     port: 8050,
    //     // gzip compression
    //     compress: true,
    //     // Open the browser window, set to false if you are in a headless browser environment.
    //     open: false,
    //     watchOptions: {
    //         ignored: /node_modules/,
    //         poll: true,
    //     },
    //     // The path you want webpack-dev-server to use for serving files
    //     publicPath: '/dist/',
    //     // For static assets - including index.html, which is the start page containing the <div> with the id "app"
    //     contentBase: resolve('src/assets'),
    //     // index: 'start.html', // Doesn't work
    //     // Seems this is necessary if your 'index' file is called anything other than index.html
    //     /*historyApiFallback: {
    //       index: 'start.html'
    //     },*/
    //     // Reload for code changes to static assets.
    //     watchContentBase: true,
    // },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // Exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.HotModuleReplacementPlugin(),
        // Parses .vue files
        new VueLoaderPlugin(),
    ],
    resolve: {
        /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.vue', '.js', '.json'],
    },
};