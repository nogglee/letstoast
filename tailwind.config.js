module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Paperlogy', 'sans-serif'], // 타이틀 폰트 패밀리 설정
        body: ['Pretendard', 'sans-serif'], // 본문 폰트 패밀리 설정
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      colors: {
        blue: {
          700: '#151751',
          600: '#202279',
          500: '#2F32B1',
          400: '#4E50D0',
          300: '#8688DF',
          200: '#AEB0EA',
          100: '#EBEBFA',
        },
        gray: {
          700: '#2E3248',
          600: '#515880',
          500: '#6C74A2',
          400: '#8B92B6',
          300: '#AAAFCA',
          200: '#CACDDE',
          100: '#E9EAF1',
        },
        black: '#1A1C29',
      },
    },
  },
  plugins: [],
};