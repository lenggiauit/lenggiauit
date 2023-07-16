import Script from 'next/script'
import Head from 'next/head'
import '../public/css/bootstrap.min.css'
import '../public/css/normalize.css'
import '../public/css/icomoon.css'
import '../public/css/font-awesome.min.css'
import '../public/css/cubeportfolio.css'
import '../public/css/jgallery.min.css'
import '../public/css/pogoslider.css'
import '../public/css/prettyPhoto.css'
import '../public/css/slick-theme.css'
import '../public/css/slick.css'
import '../public/css/transitions.css'
import '../public/css/style.css'
import '../public/css/color.css'
import '../public/css/responsive.css'
import Link from 'next/link'

export const metadata = {
  title: 'lenggiauit - Photographer Portfolio',
  description: 'lenggiauit - Photographer Portfolio',
  'og:title': 'European Travel Destinations',
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <Link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
      <Script src='/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js'></Script>
      <body className='bt-home'>{children}</body>
      <Script src='/js/vendor/jquery-library.js'></Script>
      <Script src='/js/vendor/bootstrap.min.js'></Script>
      <Script src='/js/jquery.cubeportfolio.min.js'></Script>
      <Script src='/js/tinycolor-0.9.16.min.js'></Script>
      <Script src='/js/jquery.scrollTo.min.js'></Script>
      <Script src='/js/jquery.pogoslider.js'></Script>
      <Script src='/js/touchswipe.min.js'></Script>
      <Script src='/js/jgallery.min.js'></Script>
      <Script src='/js/jquery.vide.js'></Script>
      <Script src='/js/prettyPhoto.js'></Script>
      <Script src='/js/slick.min.js'></Script>
      <Script src='/js/parallax.js'></Script>
      <Script src='/js/countTo.js'></Script>
      <Script src='/js/appear.js'></Script>
      <Script src='/js/themefunction.js'></Script>
    </html>
  )
}
