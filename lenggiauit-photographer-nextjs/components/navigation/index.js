'use client'
export default function Navigation(props) {
  return (
    <>
      <nav id='bt-nav' className='bt-nav'>
        <a className='bt-btntogglemenu' href='javascript:void(0)'>
          X
        </a>
        <div id='bt-navigation' className='bt-navigation'>
          <strong className='bt-logo'>
            <a href='index.html'>
              <img src='/images/logo.png' alt='Logo' />
            </a>
          </strong>
          <ul className='bt-menu'>
            <li className='bt-active bt-hasdropdown'>
              <a href='/'>Home</a>
            </li>
            <li className='bt-hasdropdown'>
              <a href='/about'>About</a>
            </li>
            <li className='bt-hasdropdown'>
              <a href='/albums'>Albums</a>
            </li>
          </ul>
          <ul className='bt-socialicons'>
            <li>
              <a href='#'>
                <i className='fa fa-facebook'></i>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='fa fa-twitter'></i>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
          </ul>
          <ul className='bt-navinfo'>
            <li>
              <span>Email </span>
              <a href='lenggiauit@gmail.com'>lenggiauit@gmail.com</a>
            </li>
            <li>
              <span>Phone +1 437 410 3085</span>
            </li>
            <li>
              <address>Toronto, Canada</address>
            </li>
          </ul>
        </div>
      </nav>
      <header id='bt-header' className='bt-header bt-haslayout'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='bt-navigationarea'>
              <a className='bt-btntogglemenu' href='#'>
                {props.black && (
                  <>
                    <img src='/images/icons/icon-04.png' alt='menu' />
                  </>
                )}
                {!props.black && (
                  <>
                    <img src='/images/icons/icon-01.png' alt='menu' />
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
