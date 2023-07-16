import Navigation from '@/components/navigation'
import HomeAlbums from '@/components/homeAlbums'
import Head from 'next/head'
let appSetting = require('/appSetting.json')
let appData = require('/data.json')
const pageData = appData.find((x) => x.pageUrl == '/about')

export async function generateMetadata({ params, searchParams }, parent) {
  if (pageData) {
    return {
      title: pageData.metaData.title,
      description: pageData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: '',
        title: pageData.metaData.title,
        description: pageData.metaData.description,
        url: appSetting.baseUrl + '/about',
      },
    }
  } else {
    return null
  }
}
export default function About() {
  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout'>
        <Navigation />
        <div className='bt-innerpagebanner bt-innerpagebannerv3'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div className='bt-innerbannercontent'>
                  <h1>about</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main id='bt-main' className='bt-main bt-haslayout pt-4'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div id='bt-content' className='bt-content'>
                  <div className='bt-member bt-memberdetail'>
                    <div className='bt-membercontent'>
                      <div className='bt-membername'>
                        <h3>Giau Le</h3>
                      </div>
                      <span className='bt-memberdesignation'>
                        Developer &amp; Photographer
                      </span>
                      <h4>I’m a professional photographer</h4>
                      <div className='bt-description'>
                        <p>
                          With a love for travel and exploration, I connect with
                          people and share stories. My passion for discovery,
                          both in new places and cuisines, brings me endless
                          joy. Through my lens, I create captivating images that
                          transport viewers to ethereal realms, capturing
                          cherished moments with a touch of enchantment.
                        </p>
                      </div>
                      <ul className='bt-socialicons'>
                        <li>
                          <a
                            target='_blank'
                            href='https://www.facebook.com/lenggiauit'
                          >
                            <i className='fa fa-facebook'></i>
                          </a>
                        </li>
                        <li>
                          <a
                            target='_blank'
                            href='https://www.instagram.com/lenggiauit/'
                          >
                            <i className='fa fa-instagram'></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='bt-skillsandclients'>
                      <div className='bt-skills'>
                        <h3>My Skills</h3>
                        <div id='bt-memberskills' className='bt-memberskills'>
                          <div className='bt-memberskill'>
                            <h4>Digital Photography</h4>
                            <div
                              className='bt-memberskillholder'
                              data-percent='78%'
                            >
                              <div className='bt-memberskillbar'></div>
                            </div>
                          </div>
                          <div className='bt-memberskill'>
                            <h4>Wedding Photography</h4>
                            <div
                              className='bt-memberskillholder'
                              data-percent='90%'
                            >
                              <div className='bt-memberskillbar'></div>
                            </div>
                          </div>
                          <div className='bt-memberskill'>
                            <h4>Portrait</h4>
                            <div
                              className='bt-memberskillholder'
                              data-percent='82%'
                            >
                              <div className='bt-memberskillbar'></div>
                            </div>
                          </div>
                          <div className='bt-memberskill'>
                            <h4>Commercial</h4>
                            <div
                              className='bt-memberskillholder'
                              data-percent='88%'
                            >
                              <div className='bt-memberskillbar'></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='bt-clients mt-5'>
                        <h3>Contact</h3>
                        <ul className='w-100'>
                          <li>
                            <span>Email </span>
                            <a href='lenggiauit@gmail.com'>
                              lenggiauit@gmail.com
                            </a>
                          </li>
                          <li>
                            <span>Phone +1 437 410 3085</span>
                          </li>
                          <li>Toronto, Canada</li>
                        </ul>
                      </div>
                    </div>
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
