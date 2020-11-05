const { loadCSS, extractCSS, tsLoader } = require('./loaders');

module.exports = (env) => {
	const loaders = {
		css: (i) => {
			switch (i) {
				case 'inline':
					return loadCSS(/\.css$/);
				case 'MCEP':
					return extractCSS(/\.css$/);
				default:
					throw new Error(`The instruction ${i} is not covered`);
			}
		},
		xcss: (i) => {
			switch (i) {
				case 'inline':
					return loadCSS(/\.xcss$/);
				case 'MCEP':
					return extractCSS(/\.xcss$/);
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
		xcss: {
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

	console.info(message, rules);
	return { rules };
};
