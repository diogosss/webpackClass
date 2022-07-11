const path = require('path');  //Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin'); //para usar HTML en webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para usar minicss
const CopyPlugin = require('copy-webpack-plugin'); //para usar copywebpack plugin
const Dotenv = require('dotenv-webpack'); //variables globales

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
  mode: 'development', //Modo desrrollo
  watch: true, //que haga un auto build cada que encuentre o vea un cambio
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    //Aqui van los paths para los alias
    alias: {
      '@utils':path.resolve(__dirname, 'src/utils/'),
      '@templates':path.resolve(__dirname, 'src/templates/'),
      '@styles':path.resolve(__dirname, 'src/styles/'),
      '@images':path.resolve(__dirname, 'src/assets/images/')
    }
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
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
				// type: 'asset/resource',
				use: {
					loader: 'url-loader', // NOMBRE DEL LOADER
					options: {
						limit: false, // O LE PASAMOS UN NUMERO, Habilita o deshabilita la transformación de archivos en base64.
						mimetype: 'aplication/font-woff', //  nos permite determinar el tipo de archivo que será enlazado o cargado
						// Los MIME Types (Multipurpose Internet Mail Extensions), son la manera standard de mandar contenido a través de la red.
						name: '[name].[ext]', // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN, PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria ubuntu-regularhola.woff
						outputPath: './assets/fonts/', 
						publicPath: '../assets/fonts/',
						esModule: false
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
    new Dotenv(),
  ],
}
