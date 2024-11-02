import styles from '@/styles/elements/clouds.module.css'
import { cloudTopPositions } from '@/utils/helpers'
import { useEffect, useState } from 'react'

import Cloud from './interactiveCloud'

export default function Clouds ({ numClouds, content }) {

    const [ thoughts, setThoughts ] = useState([])
    const [ clouds, setClouds ] = useState([])

    useEffect(() => {

        if(content){
            const thoughts = content.blogPostCollection.items
            setThoughts(thoughts)
            generateClouds(thoughts)
        }
    
      return () => {}
    }, [content])

    const maxThoughtsToShow = 5

    const generateClouds = (thoughts) => {
        const clouds = []
        const delayIncrement = 150 / (maxThoughtsToShow * numClouds);
        
        for(let j = 0; j < maxThoughtsToShow; j++){
    
            for(let i = 0; i < numClouds; i++){
                
                const index = j * 3 + i; //Unique index for each cloud
                const style = {
                    animationDelay: `${index * delayIncrement}s`,
                    top: `${cloudTopPositions[i]}px`
                }
        
                clouds.push(
                    i === 1 ? (
                        <div className={styles.cloud} key={`${j}-${i}`} style={style}>
                            <h4 className={styles.title}>{thoughts[j].title}</h4>
                        </div>
                    ) : (
                        <div className={styles.cloud} key={`${j}-${i}`} style={style}></div>
                    )
                );
            }
        }

        setClouds(clouds)
    }

    return (
        <>
            {clouds.map((cloud) => cloud)}
        </>
    )
}