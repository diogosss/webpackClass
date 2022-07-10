const path = require('path');  //Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin'); //para usar HTML en webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para usar minicss
const CopyPlugin = require('copy-webpack-plugin'); //para usar copywebpack plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //
const TerserPLugin = require('terser-webpack-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),  //dist de distribution
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    // mover los images a la carpeta assets
    assetModuleFilename: 'assets/images/[hash][ext][query]'

  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        // Test: declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Use: es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude: permite omitir archivos o carpetas especificas
        exclude: /node_modules/
      },
      {
        test: /\.(css|styl)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.png/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            // limit => limite de tamaño
            limit: 10000,
            // Mimetype => tipo de dato
            mimetype: "application/font-woff",
            // name => nombre de salida
            name: "[name].[contenthash].[ext]",
            // outputPath => donde se va a guardar en la carpeta final
            outputPath: "./assets/fonts/",
            publicPath: "./assets/fonts/",
            esModule: false,
          }
        }
      }

    ]
  },
  plugins: [  //plugins
    new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
  ],
  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPLugin(),
    ]
  }

}
