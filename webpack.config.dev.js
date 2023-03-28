const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

// Look for .html files
const htmlFiles = []
const directories = ['src']
while (directories.length > 0) {
  const directory = directories.pop()
  const dirContents = fs.readdirSync(directory)
    .map(file => path.join(directory, file))

  htmlFiles.push(...dirContents.filter(file => file.endsWith('.html')))
  directories.push(...dirContents.filter(file => fs.statSync(file).isDirectory()))
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './docs'),
    clean: true
  },
  devtool: 'source-map',
  plugins: [
    ...htmlFiles.map(htmlFile =>
      new HtmlWebpackPlugin({
        template: htmlFile,
        filename: htmlFile.replace(path.normalize('src/'), ''),
        inject: true
      })
    )
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.(styles)$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: () => [
                require('autoprefixer')
              ]
            }
          }
        },
        {
          loader: 'sass-loader'
        }

        ]
      }]
  }

}