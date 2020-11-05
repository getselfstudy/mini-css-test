const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const useRules = require('./config/useRules');

module.exports = (env) => {
	let { mode } = env || {};
	let esModule;
	[_ignore, mode, esModule] = /^(.*?)(-non-module)?$/.exec(mode);
	if (esModule) {
		esModule = false;
	} else {
		esModule = true;
	}
	return {
		resolve: {
			extensions: [".js", ".xcss", ".css", ".tsx", ".mjs"],
		},
		devServer: {
			stats: 'errors-only',
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack Inline CSS',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
				esModule: true,
				modules: {
					namedExport: true
				}
			}),
			new ForkTsCheckerWebpackPlugin({
				async: true,
				typescript: {
					enabled: true,
					configFile: "./tsconfig.json",
					diagnosticOptions: {
						syntactic: true,
						semantic: true,
						declaration: true,
						global: true,
					},
				},
				// eslint: {
				// 	files: "./src/**/*.tsx",
				// 	enabled: true,
				// },
			})
],
		module: useRules(mode, esModule),
	};
};
