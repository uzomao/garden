import styles from '@/styles/elements/clouds.module.css'
import { cloudTopPositions } from '@/utils/helpers'
import { useEffect, useState } from 'react'

import Cloud from './interactiveCloud'

export default function Clouds ({ numClouds, content }) {

    const [ thoughts, setThoughts ] = useState([])

    useEffect(() => {

        setThoughts(content ? content.blogPostCollection.items : [])
    
      return () => {}
    }, [content])

    const clouds = []

    for(let i = 0; i < numClouds; i++){
        const style = {
            animationDelay: `${i*10}s`,
            top: `${cloudTopPositions[i]}px`
        }

        thoughts.length > 0 &&
            clouds.push(i % 2 === 0 ? 
                <div className={styles.cloud} key={i} style={style}></div>
                :
                <div className={styles.cloud} key={i} style={style}>
                    <h4 className={styles.title}>
                        Click to open thought clouds
                    </h4>
                </div>
            )
    }

    return (
        <>
            {clouds.map((cloud) => cloud)}
        </>
    )
}