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
        primary: {
          50: '#F5F5FF',
          100: '#E7E6FF',
          400: '#B5B3FF',
          500: '#615FFF',
          900: '#010061',
        },
        secondary: {
          500: '#FFC700',
        },
        gray: {
          100: '#FCFCFC', 
          200: '#F1F1F3',
          300: '#E2E2E5',
          400: '#C4C4CA',
          500: '#898994',
          600: '#59595D',
          700: '#414144',
        },
        red: {
          500: '#FF6363',
        }
      },
    },
  },
  plugins: [],
};