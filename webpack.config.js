const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var entryPath = path.join(__dirname,'./index.js');
var outputPath = path.resolve(__dirname,'dist');
var indexHtmlPath = path.resolve(__dirname,'./index.html');

module.exports={
    devtool:'source-map',
    mode:'development',
    entry: entryPath,
    output:{
        path:outputPath,
        filename:'bundle.js',
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env','@babel/preset-react']
                }
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
      port:3080
    },
    plugins:[new HtmlWebpackPlugin({template:indexHtmlPath})]
}