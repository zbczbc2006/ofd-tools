import { babel } from '@rollup/plugin-babel';
import pkg from './package.json' assert { type: "json" };

export default {
	input: 'src/ofd/ofd.js',
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' }
	],
	plugins: [babel({ babelHelpers: 'bundled' })]
}
