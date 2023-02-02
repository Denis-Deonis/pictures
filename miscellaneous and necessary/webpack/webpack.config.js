const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // «Вебпак» умеет подключать сгенерированный JS-код в HTML автоматически.
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //будет каждый раз при сборке проекта удалять содержимое папки dist.
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin


module.exports = {
  // указали первое место, куда заглянет webpack,
  //— файл index.js в папке src
  entry: { main: './src/index.js' },

  // указали в какой файл будет собираться весь js и дали ему имя
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },

  mode: 'development', // добавили режим разработчика

  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
        // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
              // добавьте объект options Если вы используете директиву @import
          options: { importLoaders: 1 }
        },
          'postcss-loader'
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин для очистки

    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов

  ], // добавьте массив



} // module.exports — это синтаксис экспорта в Node.js
