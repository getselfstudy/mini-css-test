const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function addConfigs(r, c) {
	Object.entries(c).forEach(([key, value]) => {
		if (!value) return;
		r[key] = value;
	});
	return r;
}

exports.cssLoader = (esModule = true) => {
	return {
		loader: 'css-loader',
		options: {
			import: true,
			modules: true
		}
	}
}

exports.loadCSS = (test, esModule = true) => {
	const rule = {
		test,
		use: [{
			loader: 'style-loader',
			options: {
				esModule	
			}
		}, exports.cssLoader(esModule)],
	};

	return addConfigs(rule, {});
};

exports.extractCSS = (test, esModule = true) => {
	// basic rule
	const rule = {
		test,
		use: [{
			loader: MiniCssExtractPlugin.loader,
			options: { esModule }
		}, exports.cssLoader(esModule)],
	};

	return addConfigs(rule, {});
};

exports.tsLoader = () => {
	const rule = {
		test: /\.tsx$/i,
		loader: "ts-loader",
		options: {
			transpileOnly: true,
			experimentalWatchApi: true,
			happyPackMode: true,
			compilerOptions: {
				isolatedModules: false,
				module: "esnext",
				allowJs: true,
				target: "es5",
				sourceMap: true,
			},
			reportFiles: [
				"*.ts",
				"*.tsx",
				"*.js",
				"*.jsx",
			],
		}
	}

	return addConfigs(rule, {});
}