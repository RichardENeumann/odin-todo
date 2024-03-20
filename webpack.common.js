const path = require("path");

module.exports = {
    entry: {
        app: "./src/logic/index.js",
    },
    output: {
        filename: "./logic/main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
          },
        ]
      }
};
