'use client'
import React from 'react'
import Navigation from '@/components/navigation'
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

function Page404() {
  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout'>
        <Navigation></Navigation>
        <main id='bt-main' className='bt-main bg-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div id='bt-content' className='bt-content'>
                  <div className='bt-404content'>
                    <span className='bt-iconbox'>
                      <img
                        src='images/icons/icon-05.png'
                        alt='image description'
                      />
                    </span>
                    <h1>OOPS NOT FOUND</h1>
                    <h2>
                      404Error. Either Something Get Wrong or the Page Doesn't
                      Exist Anymore
                    </h2>
                    <a className='bt-btn' href='/'>
                      <span>Home</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Page404
