import React from 'react'
import styles from '@/styles/layout.module.css'

export default function Layout({ children, containerWidth }) {
  return (
    <main style={{width: `${containerWidth}%`}} className={styles.container}>
        {children}
    </main>
  )
}
