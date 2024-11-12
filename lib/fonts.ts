import localFont from 'next/font/local'

// 主字体 - Plus Jakarta Sans
export const bodyFont = localFont({
  src: [
    {
      path: '../public/fonts/PlusJakartaSans-Regular.ttf',
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

// 装饰字体 - Playball
export const decorativeFont = localFont({
  src: '../public/fonts/Playball-Regular.ttf',
  variable: '--font-decorative'
}) 