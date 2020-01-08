const path = require("path");

const config = {
  mode: "production",
  entry: {
    app: [path.join(__dirname, "index.scss")]
  },
  output: {
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.scss$/,

        // Remember that these run in reverse, so start at the last item in the
        // array and read up to understand what's going on.
        use: [
          {
            // Extracts all that CSS into a file and plops it on the disk.
            loader: "file-loader",
            options: { name: "app.css" }
          },

          // Converts the local disk paths from css-loader into their final
          // paths relative to the dist directory.
          "extract-loader",

          // Interprets any url() and @import statements and resolves them to
          // their full path on the local disk.
          "css-loader",

          // Doesn't do anything. Probably legacy? But leave it for now, and
          // we can remove it later when we've got time to make sure it doesn't
          // break anything.
          "resolve-url-loader",

          // Handles resolving and importing all the CSS files, so we end up
          // with one nice, big file to deal with. Also adds vendor prefixes
          // as necessary for CSS rules that aren't yet widely supported.
          "postcss-loader",

          {
            // Parse the Sass into CSS.
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/fonts"
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
