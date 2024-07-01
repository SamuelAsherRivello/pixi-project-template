import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/scripts/client/client.ts',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('dist'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@client': path.resolve('src/scripts/client'),
        '@server': path.resolve('src/scripts/server'),
        '@shared': path.resolve('src/scripts/shared'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' },
        ],
      }),
      ...(isProduction ? [new CleanWebpackPlugin()] : []),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      port: 3000,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      open: true,
      client: {
        logging: 'none',
      },
    },
    performance: {
      maxAssetSize: 1000000, // 1MB
      maxEntrypointSize: 1000000, // 1MB
    },
    stats: 'errors-only', // Suppress detailed asset information
  };
};