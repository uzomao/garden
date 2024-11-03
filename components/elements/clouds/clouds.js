import styles from '@/styles/elements/clouds.module.css'
import { cloudTopPositions } from '@/utils/helpers'
import { useEffect, useState } from 'react'

import useModal from '@/hooks/use-modal'
import ModalOverlay from '@/components/modal-overlay'

export default function Clouds ({ numClouds, content }) {
    

    const [ thoughts, setThoughts ] = useState([])
    const [ clouds, setClouds ] = useState([])
    const [ isPauseClouds, setIsPauseClouds ] = useState(false)

    const { modalState, setModalState, changeModalState } = useModal()

    const MAX_THOUGHTS_NUMBER = 5
    const maxThoughtsToShow = thoughts.length >= MAX_THOUGHTS_NUMBER ? MAX_THOUGHTS_NUMBER : thoughts.length

    useEffect(() => {
        if (content) {
            const thoughts = content.blogPostCollection.items;
            setThoughts(thoughts);
        }
    }, [content]);

    useEffect(() => {
        if (thoughts.length) {
            generateClouds(thoughts);
        }
    }, [thoughts, isPauseClouds]);

    const generateClouds = (thoughts) => {
        const clouds = []
        const delayIncrement = 10
        
        for(let j = 0; j < maxThoughtsToShow; j++){
    
            for(let i = 0; i < numClouds; i++){
                
                const index = j * 3 + i; //Unique index for each cloud
                const style = {
                    animationDelay: `${index * delayIncrement}s`,
                    top: `${cloudTopPositions[i]}px`,
                    animationPlayState: isPauseClouds ? 'paused' : 'running'
                }
        
                clouds.push(
                    i === 1 ? (
                        <div className={styles.cloud} key={`${j}-${i}`} style={style} onClick={() => {
                            setIsPauseClouds(true)
                            changeModalState(true, thoughts[j].slug)}
                        }>
                            <h4 className={styles.title} 
                                onMouseEnter={() => setIsPauseClouds(true)}
                                onMouseLeave={() => setIsPauseClouds(false)}
                            >
                                    {thoughts[j].title}
                            </h4>
                        </div>
                    ) : (
                        <div className={styles.cloud} key={`${j}-${i}`} style={style}></div>
                    )
                );
            }
        }
        setClouds(clouds)
    }

    // Effect to reset `isPauseClouds` when the modal is closed
    // Na ChatGPT run this one for boys
    useEffect(() => {
        if (!modalState.isOpen) {
            setIsPauseClouds(false);
        }
    }, [modalState.isOpen]);

    return (
        <>
            {clouds.map((cloud) => cloud)}
            { modalState.isOpen && 
                <ModalOverlay
                    postContent={thoughts.filter(({ slug }) => slug === modalState.contentSlug)[0]}
                    setModalState={setModalState}
                />
            }
        </>
    )
}