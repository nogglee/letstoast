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
          400: '#7185FA',
          300: '#A3AEF7',
          200: '#C8CFFC',
          100: '#F2F3FE',
        },
        gray: {
          700: '#2E3248',
          600: '#515880',
          500: '#6C74A2',
          400: '#8B92B6',
          300: '#AAAFCA',
          200: '#CACDDE',
          100: '#E9EAF1',
          50: '#FAFAFA',
        },
        black: '#1A1C29',
      },
    },
  },
  plugins: [],
  variants: {
    scrollbar: ['rounded']
  },
  // 스크롤바 관련 유틸리티 클래스 추가
  utilities: {
    '.scrollbar-hide': {
      /* IE and Edge */
      '-ms-overflow-style': 'none',
      /* Firefox */
      'scrollbar-width': 'none',
      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  }
};