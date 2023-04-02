import { createContext, useContext } from 'react'
import { SpringValue } from '@react-spring/web'

type SideBarApi = {
  hovered: boolean
  width: number,
  zoomLevel?: SpringValue
  setIsZooming: (isZooming: boolean) => void
}

export const SidebarContext = createContext<SideBarApi>({ width: 0, hovered: false, setIsZooming: () => {} })

export const useSideBar = () => {
  return useContext(SidebarContext)
}
