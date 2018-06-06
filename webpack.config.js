const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
		mode: 'none',
		entry:path.resolve(__dirname,"./files/js/app.js"),
		output:{
			path:path.resolve(__dirname,"js"),
			filename:"app.js"
		},
		module:{
			rules:[
				{
					test:/\.jsx?$/,
					exclude:/node_modules/,
					use:{
						loader: 'babel-loader',
						options:{
							presets: ["env"]
						}
					}
				},
				{
					test:/\.css$/,
					exclude:/node_modules/,
                    use:[
                     MiniCssExtractPlugin.loader,"css-loader"
                    ]
				}
			]
		},
		 plugins: [
           new MiniCssExtractPlugin({filename:"style.css"})
        ]
};