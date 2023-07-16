import React from 'react'
import Image from 'next/image'
import { v4 } from 'uuid'

let appSetting = require('/appSetting.json')

function AlbumList(props) {
  const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return (
    <>
      <div className='bt-innerpagebanner bt-innerpagebannerv2 bt-fullheight'>
        <figure
          className='bt-fullheight'
          data-vide-bg='poster: images/photos/all_albums.jpg'
          data-vide-options='position: 0% 50%'
        >
          <figcaption>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='bt-innerbannercontent'>
                    <h1>Album list</h1>
                  </div>
                </div>
              </div>
            </div>
          </figcaption>
          <a
            id='bt-btnscrollto'
            className='bt-btnscrollto bt-btnscroll'
            href='#bt-main'
          >
            scroll
          </a>
        </figure>
      </div>
      <main id='bt-main' className='bt-main bt-haslayout'>
        <div
          id='bt-threecolumnscubevonegallery'
          className='bt-photogallery bt-photogallerythreecolumns bt-threecolumnscubegallery cbp'
        >
          {props.data.map((item) => (
            <div key={v4()} className='cbp-item'>
              <article className='bt-album'>
                <figure>
                  <a href={item.link}>
                    <Image
                      width={632}
                      height={421}
                      blurDataURL={rgbDataURL(237, 181, 6)}
                      src={item.image}
                      alt={item.title}
                    ></Image>
                  </a>
                  <figcaption>
                    <div className='bt-titleandinfo'>
                      <div className='bt-albumtitle'>
                        <h3>
                          <a href={item.link}>{item.title}</a>
                        </h3>
                      </div>
                      <ul className='bt-shareandlikes'>
                        <li>
                          <div className='bt-shapreicons'>
                            <a
                              target='_blank'
                              href={`https://twitter.com/intent/tweet?original_referer=${
                                appSetting.baseUrl + item.link
                              }&amp;ref_src=${
                                appSetting.baseUrl + item.link
                              }&amp;text=${item.title}&amp;url=${
                                appSetting.baseUrl + item.link
                              }`}
                            >
                              <i className='fa fa-twitter'></i>
                            </a>
                            <a
                              target='_blank'
                              href={`https://www.facebook.com/sharer/sharer.php?u=${
                                appSetting.baseUrl + item.link
                              }`}
                            >
                              <i className='fa fa-facebook'></i>
                            </a>
                            <a
                              target='_blank'
                              href={`http://pinterest.com/pin/create/button/?url=${
                                appSetting.baseUrl + item.link
                              }`}
                            >
                              <i className='fa fa-pinterest-p'></i>
                            </a>
                          </div>
                          <a className='bt-btnshare' href='#'>
                            <span className='icon-share4'></span>
                            <span>Share</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </figcaption>
                </figure>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default AlbumList
