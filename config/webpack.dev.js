/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
// const ApiUrl = '//apitest.huala.com';
const ApiUrl = 'http://localhost:8111/xiaopai';
const ImgUrl = '//wxtest.huala.com/hlman-pic';
//正式环境
// const ApiUrl ='//api.huala.com';
// const ImgUrl = '//img.huala.com/hlman-pic'
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR,
    ImgUrl: ImgUrl,
    ApiUrl:ApiUrl
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
    return webpackMerge(commonConfig({env: ENV}), {
        devtool: 'cheap-module-source-map',
        output: {
            
            path: helpers.root('dist'),
            
            filename: '[name].bundle.js',
            
            sourceMapFilename: '[file].map',
            
            chunkFilename: '[id].chunk.js',
            
            library: 'ac_[name]',
            
            libraryTarget: 'var',
        },
        
        module: {
            
            rules: [
                
                /*
                 * css loader support for *.css files (styles directory only)
                 * Loads external css styles into the DOM, supports HMR
                 *
                 */
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    include: [helpers.root('src', 'styles')]
                },
                
                /*
                 * sass loader support for *.scss files (styles directory only)
                 * Loads external sass styles into the DOM, supports HMR
                 *
                 */
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    include: [helpers.root('src', 'styles')]
                },
            
            ]
            
        },
        
        plugins: [
            // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                    'ApiUrl': JSON.stringify(METADATA.ApiUrl),
                    'ImgUrl': JSON.stringify(METADATA.ImgUrl)
                }
            }),
            new LoaderOptionsPlugin({
                debug: false,
                options: {}
            }),
        
        ],
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        },
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
        
    });
}
