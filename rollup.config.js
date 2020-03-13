import typescript from '@rollup/plugin-typescript';
const config = {
  input: 'src/index.ts',
  plugins: [
    typescript()
  ],
  output: [
		{
			file: 'dist/index.js',
			format: 'es',
		},
	],
};

export default config
