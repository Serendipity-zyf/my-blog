import localFont from 'next/font/local'

// 主标题字体
export const titleFont = localFont({
  src: '../public/fonts/SmileySans-Oblique.ttf',
  variable: '--font-title'
})

// 正文字体
export const bodyFont = localFont({
  src: [
    {
      path: '../public/fonts/PlusJakartaSans-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PlusJakartaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/PlusJakartaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-body'
})

// 代码字体
export const codeFont = localFont({
  src: '../public/fonts/Monaco.ttf',
  variable: '--font-code'
})

// 装饰字体
export const decorativeFont = localFont({
  src: '../public/fonts/Playball-Regular.ttf',
  variable: '--font-decorative'
}) 