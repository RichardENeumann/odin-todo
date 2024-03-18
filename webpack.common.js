const path = require("path");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "./main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.otf$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: "style"
                }
              }
            ]
          }
        ]
      }
};