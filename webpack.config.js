const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... 기존 설정 ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 기본 템플릿 HTML 파일 경로
      filename: 'index.html', // 기본 출력할 HTML 파일 이름
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ko.html', // 한국어 템플릿 HTML 파일 경로
      filename: 'index.ko.html', // 한국어 출력할 HTML 파일 이름
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.en.html', // 영어 템플릿 HTML 파일 경로
      filename: 'index.en.html', // 영어 출력할 HTML 파일 이름
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // ... 다른 로더 설정 ...
    ],
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  // ... 기존 설정 ...
};