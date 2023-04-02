import React, { ReactElement, useRef, useState } from 'react'; 
import { useTrail, useChain, useSprings, useSpring, animated, useSpringRef } from '@react-spring/web';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import styles from './styles.module.css';

const Messages : React.FC = () =>{

    const parallax = useRef<IParallax>(null) 
    const parallaxApi = useSpringRef() 
    const parallaxSpring = useSpring({
      ref: parallaxApi,
      from: { opacity: 0 },
      to: { opacity: 1 }, 
    })
   
    const scroll = (to: number) => {
      if (parallax.current) {
        parallax.current.scrollTo(to)
      }
    }
    const playerContainer = {  }

    //useChain([parallaxApi], [22], 500) 

    return (<>
        <animated.div style={parallaxSpring}>
          <div className="page-container" style={{ height: '80vh', width: '100%' }}>
            <Parallax ref={parallax} pages={5} style={{ overflow: 'hidden' }}>
              <ParallaxLayer offset={0} style={{ textAlign: 'center' }}  >
                <div className="player-container" style={{...playerContainer}}>
                  <div className="row">
                    <div className="col-12" >
                      <h1>What do you want to know?</h1>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6" >
                      <button onClick={() => scroll(1)}> About me  </button>
                    </div>
                    <div className="col-6"> <button onClick={() => scroll(1)}> About me  </button> </div>
                  </div>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={1} style={{}} onClick={() => scroll(2)}>
                <div className="player-container">
                  <p> About me </p>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={2} style={{}} onClick={() => scroll(3)}>
                <div className="player-container">
                  <p>I'm not</p>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={3} speed={1.5} style={{}} onClick={() => scroll(4)}>
                <div className="player-container">
                  <p>Neither am I</p>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={4} speed={1.5} style={{}} onClick={() => scroll(0)}>
                <div className="player-container">
                  <p>Neither am I</p>
                </div>
              </ParallaxLayer>

            </Parallax>

          </div>
          </animated.div>
    </>)
}

export default Messages;
