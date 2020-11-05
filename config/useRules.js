const { loadCSS, extractCSS, tsLoader } = require('./loaders');

module.exports = (env, esModule) => {
	const loaders = {
		css: (i) => {
			switch (i) {
				case 'inline':
					return loadCSS(/\.css$/i, esModule);
				case 'MCEP':
					return extractCSS(/\.css$/i, esModule);
				default:
					throw new Error(`The instruction ${i} is not covered`);
			}
		},
		tsx: (i) => {
			return tsLoader();
		}
	};

	// developer interface
	const instructions = {
		css: {
			development: 'inline',
			production: 'MCEP',
		},
		tsx: {

		}
	};

	// business logic
	let message = '[useRules] ';
	const rules = Object.entries(instructions).map(([key, value]) => {
		const i = instructions[key][env];
		message += key + '|' + i + '\n';
		return loaders[key](i);
	});

	console.info(`${message}: ${JSON.stringify(rules, null, "  ")}`);
	return { rules };
};
