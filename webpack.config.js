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
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods'
            ]
          }
        }
      }
    ]
  }
};