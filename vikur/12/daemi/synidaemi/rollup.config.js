import babel from 'rollup-plugin-babel';

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({
      sourceMaps: true,
      presets: [
        [
          '@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 2,
            targets: '> 0.25%, not dead',
          },
        ],
      ],
    }),
  ],
};
