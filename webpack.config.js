const path = require('path');

module.exports = {
  entry: './static/components/index.js',
  output: {
    path: path.resolve(__dirname, 'static/components/'),
    filename: 'main.js',
  },
  mode: 'development',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              customElement: true
            }
          },
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['solid']
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    conditionNames: ['svelte','require','node'],
  },
};