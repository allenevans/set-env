const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    ['set-env']: path.resolve('src/main'),
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};
