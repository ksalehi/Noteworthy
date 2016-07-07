var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/noteworthy.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ],
     noParse: /node_modules\/quill\/dist/
  },
  devtool: 'source-maps'
};
