const path = require("path");

module.exports = {
  entry: "./frontend/index.js",
  output: {
    filename: "main.js", 
    path: path.resolve(__dirname, "..", "dist"), 
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "..", "dist"),
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /main\.js$/, to: "/main.js" },
      ],
    },
    compress: false,
    port: 4000,
  },
};