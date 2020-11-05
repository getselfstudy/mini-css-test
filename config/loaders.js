const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function addConfigs(r, c) {
	Object.entries(c).forEach(([key, value]) => {
		if (!value) return;
		r[key] = value;
	});
	return r;
}

exports.cssLoader = () => {
	return {
		loader: 'css-loader',
		options: {
			import: true,
			modules: true
		}
	}
}

exports.loadCSS = (test) => {
	const rule = {
		test,
		use: ['style-loader', exports.cssLoader()],
	};

	return addConfigs(rule, {});
};

exports.extractCSS = (test) => {
	// basic rule
	const rule = {
		test,
		use: [MiniCssExtractPlugin.loader, exports.cssLoader()],
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