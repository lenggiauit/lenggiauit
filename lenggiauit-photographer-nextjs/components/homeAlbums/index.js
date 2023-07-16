'use client'
import Image from 'next/image'
import { v4 } from 'uuid'
export default function HomeAlbums(props) {
  return (
    <>
      <main
        id='bt-main'
        className='bt-main bt-haslayout h-100 overflow-hidden position-relative'
      >
        <div id='tg-postfullslider' className='tg-postfullslider'>
          {props.data.sliderData.map((item) => (
            <div key={v4()} className='bt-item'>
              <figure
                style={{
                  backgroundImage: `url('${item.image}')`,
                  backgroundPositionX: 'center',
                  backgroundPositionY: 'bottom',
                  backgroundRepeat: 'no-repeat',
                  backgroundAttachment: 'fixed',
                }}
              >
                <div className='bt-slidercontent'>
                  <h1 dangerouslySetInnerHTML={{ __html: item.title }}></h1>
                  <div className='bt-description'>
                    <p>{item.description}</p>
                  </div>
                  <div className='bt-btnbox'>
                    <a className='bt-btn' href={item.link}>
                      <span>view photos</span>
                    </a>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </div>
        <a id='bt-togglethumbnails' className='bt-togglethumbnails' href='#'>
          thumbs
        </a>
        <div id='tg-postthumbnail' className='tg-postthumbnail'>
          {props.data.sliderData.map((item) => (
            <div key={v4()} className='bt-item'>
              <figure>
                <Image
                  width={200}
                  height={133}
                  src={item.thumb}
                  alt='thumbnail'
                />
              </figure>
            </div>
          ))}
        </div>
        <div className='tg-bannerfullwidthslidecount'></div>
      </main>
    </>
  )
}
