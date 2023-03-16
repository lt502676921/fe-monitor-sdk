const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  context: process.cwd(),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get('/success', function (req, res) {
        res.json({ id: 1 }); // 200
      });
      devServer.app.post('/error', function (req, res) {
        res.sendStatus(500); // 500
      });
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
    }),
  ],
};
