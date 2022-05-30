const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
	return {
		mode,
		entry: "./src/index.js",
		devServer: {
			hot: true,
			open: true,
		},
		output: {
			publicPath: "/",
			path: path.resolve(__dirname, "build"),
			filename: "bundled.js",
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: "babel-loader",
				},
				{
					test: /\.css$/i,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[local]__[hash:base64:7]",
								},
								sourceMap: true,
							},
						},
					],
					include: /\.module\.css$/,
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
					exclude: /\.module\.css$/,
				},
			],
		},
		plugins: [
			new HTMLWebpackPlugin({
				template: "./public/index.html",
			}),
			new webpack.HotModuleReplacementPlugin(),
		],
	};
};
