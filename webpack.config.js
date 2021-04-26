/* eslint-env node */
const path = require('path');
const webpack = require('webpack');

function getConfig(env) {
  const config = {
    mode: env,
    entry: './lib/ReactCrop.tsx',
    output: {
      path: path.resolve('dist'),
      library: 'ReactCrop',
      libraryTarget: 'umd',
      filename: env === 'production' ? 'ReactCrop.min.js' : 'ReactCrop.js',
      globalObject: 'this',
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    },
    externals: {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    ],
  };

  return config;
}

module.exports = [getConfig('development'), getConfig('production')];
