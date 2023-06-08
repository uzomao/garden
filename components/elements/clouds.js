export const cloudTopPositions = [10,20,30,40,50,60,70]
import styles from '@/styles/Home.module.css'

export default function Clouds ({ numClouds }) {

    const clouds = []

    for(let i = 0; i < numClouds; i++){
        clouds.push(<div className={styles.cloud} style={{
            animationDelay: `${i*10}s`,
            top: `${cloudTopPositions[Math.floor(Math.random()*cloudTopPositions.length)]}px`
          }}></div>)
    }

    return (
        <>
            {clouds.map((cloud) => cloud)}
        </>
    )
}