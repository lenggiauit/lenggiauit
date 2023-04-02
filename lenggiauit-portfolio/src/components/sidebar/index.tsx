import React, { ReactElement } from 'react';
import { animated, useSpringValue } from '@react-spring/web'
import { clamp } from '@react-spring/shared'
import { SidebarContext } from './sidebarContext'
import styles from './styles.module.scss'
import { useWindowResize } from './hooks/useWindowResize'; 
interface SidebarProps {
    children: React.ReactNode;
}
export const DOCK_ZOOM_LIMIT = [-100, 50];

const Sidebar = ({ children }: SidebarProps) => {


    const [hovered, setHovered] = React.useState(false)
    const [width, setWidth] = React.useState(0)
    const isZooming = React.useRef(false)
    const dockRef = React.useRef<HTMLDivElement>(null!)

    const setIsZooming = React.useCallback((value: boolean) => {
        isZooming.current = value
        setHovered(!value)
    }, [])

    const zoomLevel = useSpringValue(1, {
        onChange: () => {
            console.log(dockRef.current.clientWidth);
            setWidth(dockRef.current.clientWidth)
        },
    })

    useWindowResize(() => {
        setWidth(dockRef.current.clientWidth)
    })

    return (
        <div className={styles.sidebar}>
            <SidebarContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
                <animated.div
                    ref={dockRef}
                    className={styles.dock}
                    onMouseOver={() => {
                        if (!isZooming.current) {
                            setHovered(true)
                        }
                    }}
                    onMouseOut={() => {
                        setHovered(false)
                    }}
                    // style={{
                    //     x: '0',
                    //     scale: zoomLevel
                    //         .to({
                    //             range: [DOCK_ZOOM_LIMIT[1], 1, DOCK_ZOOM_LIMIT[0]],
                    //             output: [2, 1, 0.5],
                    //         })
                    //         .to(value => clamp(0.5, 2, value)),
                    // }}
                    >
                    {children}
                </animated.div>
            </SidebarContext.Provider>
        </div>
    )

};

export default Sidebar;