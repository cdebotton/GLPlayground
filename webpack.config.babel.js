import path from 'path';
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, LoaderOptionsPlugin } from 'webpack';

export default {
  devtool: 'eval',
  entry: path.join(__dirname, 'lib', 'client', 'index.js'),
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'lib'),
        loader: 'babel-loader',
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
      },
      {
        test: /.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new LoaderOptionsPlugin({

    }),
  ],
};
