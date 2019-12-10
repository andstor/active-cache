const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'active-cache.js',
		path: path.resolve(__dirname, 'lib'),
		library: 'ActiveCache',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader"
			}
		]
	}
};
