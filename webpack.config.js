const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... 기존 설정 ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 기본 템플릿 HTML 파일 경로
      filename: 'index.html', // 기본 출력할 HTML 파일 이름
      inject: true, // 스크립트와 스타일을 자동으로 삽입
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ko.html', // 한국어 템플릿 HTML 파일 경로
      filename: 'index.ko.html', // 한국어 출력할 HTML 파일 이름
      inject: true, // 스크립트와 스타일을 자동으로 삽입
    }),
    new HtmlWebpackPlugin({
      template: './public/index.en.html', // 영어 템플릿 HTML 파일 경로
      filename: 'index.en.html', // 영어 출력할 HTML 파일 이름
      inject: true, // 스크립트와 스타일을 자동으로 삽입
    }),
  ],
  // ... 기존 설정 ...
};