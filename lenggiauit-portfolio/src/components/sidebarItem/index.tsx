import * as React from 'react'

import styles from './styles.module.scss'

interface SidebarItemProps {
  src: string
}

export const SidebarItem = ({ src }: SidebarItemProps) => (
  <span className={styles['sidebar-item']} >
    <img className={styles['sidebar-item__blur']} src={src} alt="" />
    <img className={styles['sidebar-item__img']} src={src} alt="" />
  </span>
) 