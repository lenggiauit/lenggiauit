import React, { useRef, useState } from 'react';
import { useTrail, useChain, useSprings, useSpring, animated, useSpringRef } from '@react-spring/web';
import styles from './styles.module.css';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';

const MESSAGES = [
    [50, 30],
    [50, 40],
    [50, 50],
    [50, 60],
    [50, 70],

    [60, 50],
    [70, 50],

    [80, 30],
    [80, 40],
    [80, 50],
    [80, 60],
    [80, 70],
    // H
    [100, 30],
    [100, 40],
    [100, 50],
    [100, 60],
    [100, 70],

    [110, 30],
    [120, 30],
    [130, 30],

    [110, 50],
    [120, 50],
    [130, 50],

    [110, 70],
    [120, 70],
    [130, 70],
    // E

    [150, 30],
    [150, 40],
    [150, 50],
    [150, 60],
    [150, 70],

    [160, 70],
    [170, 70],
    [180, 70],
    // L
    [200, 30],
    [200, 40],
    [200, 50],
    [200, 60],
    [200, 70],

    [210, 70],
    [220, 70],
    [230, 70],
    // L 
    [260, 30],
    [270, 30],

    [250, 30],
    [250, 40],
    [250, 50],
    [250, 60],
    [250, 70],

    [260, 70],
    [270, 70],

    [280, 30],
    [280, 40],
    [280, 50],
    [280, 60],
    [280, 70],
    // O
    [120, 110],
    [130, 110],
    [140, 110],
    // I
    [130, 110],
    [130, 120],
    [130, 130],
    [130, 140],
    [130, 150],

    [120, 150],
    [140, 150],
    // '
    [160, 110],
    // M
    [180, 110],
    [180, 120],
    [180, 130],
    [180, 140],
    [180, 150],

    [195, 120],

    [210, 110],
    [210, 120],
    [210, 130],
    [210, 140],
    [210, 150],
    // G

    [110, 200],
    [110, 190],
    [100, 190],
    [90, 190],
    [80, 190],

    [80, 200],
    [80, 210],
    [80, 220],
    [80, 230],
    [80, 240],

    [90, 240],
    [100, 240],
    [110, 240],

    [110, 230],
    [100, 220],
    [110, 220],
    // I

    [130, 190],
    [140, 190],
    [150, 190],
    // I
    [140, 200],
    [140, 210],
    [140, 220],
    [140, 230],
    [140, 240],

    [130, 240],
    [150, 240],

    [180, 190],
    [175, 200],
    [170, 210],
    [170, 220],
    [170, 230],
    [170, 240],

    [190, 190],
    [195, 200],
    [200, 210],
    [200, 220],
    [200, 230],
    [200, 240],

    [180, 220],
    [190, 220],
    // U

    [220, 190],
    [220, 200],
    [220, 210],
    [220, 220],
    [220, 230],
    [230, 240],

    [250, 190],
    [250, 200],
    [250, 210],
    [250, 220],
    [250, 230],
    [240, 240],
]

const STROKE_WIDTH = 0.2
const OFFSET = STROKE_WIDTH / 2
const MAX_WIDTH = 350 + OFFSET * 2
const MAX_HEIGHT = 300 + OFFSET * 2;

const HomeAnimations: React.FC = () => {
    var currentColor = "#ddd";
    // horizontal line
    const gridApi = useSpringRef()
    const gridSprings = useTrail(36, {
        ref: gridApi,
        from: {
            x2: 0,
            y2: 0,
        },
        to: {
            x2: MAX_WIDTH,
            y2: MAX_HEIGHT,
        },
    })
    // vertical
    const boxApi = useSpringRef()

    // borders
    const borderApi = useSpringRef()
    const borderSprings = useTrail(2, {
        ref: borderApi,
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: {
            mass: 1,
            friction: 12,
            tension: 12,
        },
    })

    const helloApi = useSpringRef()

    const [boxSprings] = useSprings(MESSAGES.length, i => ({
        ref: helloApi,
        from: {
            scale: 0,
        },
        to: {
            scale: 1,
        },
        delay: i * 200,
        config: {
            mass: 2,
            tension: 220,
        },
    }))

    // start chain
    useChain([gridApi, boxApi, borderApi, helloApi], [0, 1, 10, 15], 50)


    const parallax = useRef<IParallax>(null)
    const parallaxApi = useSpringRef()
    const parallaxSpring = useSpring({
        ref: parallaxApi,
        from: { opacity: 1 },
        to: { opacity: 1 },
    })

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }
    const playerContainer = {}

    return (
        <div className={styles['background-container']}>
            <div className={styles.bg_container}>
                <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
                    <g>
                        {gridSprings.map(({ x2 }, index) => (
                            <animated.line
                                x1={0}
                                y1={index * 10 + OFFSET}
                                x2={x2}
                                y2={index * 10 + OFFSET}
                                key={index}
                                strokeWidth={STROKE_WIDTH}
                                stroke={currentColor}
                            />
                        ))}
                        {gridSprings.map(({ y2 }, index) => (
                            <animated.line
                                x1={index * 10 + OFFSET}
                                y1={0}
                                x2={index * 10 + OFFSET}
                                y2={y2}
                                key={index}
                                strokeWidth={STROKE_WIDTH}
                                stroke={currentColor}
                            />
                        ))}
                        {borderSprings.map(({ opacity }, index) => (
                            <animated.rect
                                style={{ opacity }}
                                fill="none"
                                width={`${(99 - (index + 1))}%`}
                                height={`${99 - (index + 1)}%`}
                                stroke-linejoin="round"
                                rx="5" ry="5"
                                stroke="#999"
                                stroke-width={STROKE_WIDTH}
                                transform-origin={`${(99 - (index + 1))}% ${(99 - (index + 1))}%`} transform={`scale(0.${(99 - (index + 1))})`}
                            />
                        ))}
                        {boxSprings.map(({ scale }, index) => (
                            <animated.rect
                                key={index}
                                width={10}
                                height={10}
                                fill="#999"
                                style={{
                                    transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                                    transform: `translate(${MESSAGES[index][0] + OFFSET}px, ${MESSAGES[index][1] + OFFSET}px)`,
                                    scale,
                                }}
                            />
                        ))}
                    </g>
                </svg>
            </div>

            {/* <animated.div style={{ position: 'absolute', zIndex:999, top: 0, left: 0, width: '100%', height: '100vh' }}>
                <div className="page-container" style={{ height: '80vh', width: '100%' }}>
                    <Parallax ref={parallax} pages={5} style={{ overflow: 'hidden' }}>
                        <ParallaxLayer offset={0} style={{ textAlign: 'center' }}  >
                            <div className="player-container position-relative" style={{ ...playerContainer }}>
                                <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
                                    <g>
                                        {boxSprings.map(({ scale }, index) => (
                                            <animated.rect
                                                key={index}
                                                width={10}
                                                height={10}
                                                fill="#999"
                                                style={{
                                                    transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                                                    transform: `translate(${MESSAGES[index][0] + OFFSET}px, ${MESSAGES[index][1] + OFFSET}px)`,
                                                    scale,
                                                }}
                                            />
                                        ))}
                                    </g> 
                                </svg>
                                <div style={{ position: 'absolute', zIndex:999, top: 0, left: 0, width: '100%', height: '100vh' }}>
                                    <button > About me </button>
                                </div>

                            </div>
                        </ParallaxLayer>

                        <ParallaxLayer offset={1} style={{}} onClick={() => scroll(2)}>

                            <div className="player-container" style={{ ...playerContainer }}>
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
            </animated.div> */}
        </div>
    )
}

export default HomeAnimations;
