import styles from '@/styles/elements/clouds.module.css'
import { cloudTopPositions } from '@/utils/helpers'
import { useEffect, useState, useRef } from 'react'

import useModal from '@/hooks/use-modal'
import ModalOverlay from '@/components/modal-overlay'

export default function Clouds ({ numClouds, content }) {
    

    const [ thoughts, setThoughts ] = useState([])
    const [ isPauseClouds, setIsPauseClouds ] = useState(false)
    const [ index, setIndex ] = useState(0)
    const titleRef = useRef(null);

    const { modalState, setModalState, changeModalState } = useModal()

    const MAX_THOUGHTS_NUMBER = 5
    const delayIncrement = 10

    // Load thoughts from content on initial render
    useEffect(() => {
        if (content) {
            setThoughts(content.blogPostCollection.items);
        }
    }, [content]);
    
    useEffect(() => {
        const maxThoughtsToShow = Math.min(thoughts.length, MAX_THOUGHTS_NUMBER);

        if (thoughts.length > 0 && titleRef.current) {
            // Initialize the titleRef with the first thought's title
            titleRef.current.textContent = thoughts[0].title;
        }
    
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % maxThoughtsToShow;
                if (thoughts.length > 0) {
                    titleRef.current.textContent = thoughts[newIndex].title;

                    // Reset animation by removing and re-adding the class
                    titleRef.current.classList.remove('clouds-text-drift-in');
                    void titleRef.current.offsetWidth; // Trigger reflow
                    titleRef.current.classList.add('clouds-text-drift-in');
                }
                return newIndex;
            });
        }, 30000);
    
        return () => clearInterval(interval);
    }, [thoughts, MAX_THOUGHTS_NUMBER]);

    // Effect to reset `isPauseClouds` when the modal is closed
    // Na ChatGPT run this one for boys
    useEffect(() => {
        if (!modalState.isOpen) {
            setIsPauseClouds(false);
        }
    }, [modalState.isOpen]);

    const cloudStyle = (i) => ({
        animationDelay: `${i * delayIncrement}s`,
        top: `${cloudTopPositions[i]}px`,
        animationPlayState: isPauseClouds ? 'paused' : 'running'
    });

    return (
        <>
            {/* Render clouds with hover and click functionality */}
            {thoughts.length > 0 &&
                <>
                        <div className={styles.cloud} key={`0`} style={cloudStyle(0)}></div>
                        <div
                            key={`1`}
                            className={styles.cloud}
                            style={cloudStyle(1)}
                            onClick={() => {
                                setIsPauseClouds(true);
                                changeModalState(true, thoughts[index].slug);
                            }}
                        >
                            <h4
                                ref={titleRef}
                                className={styles.title}
                                onMouseEnter={() => setIsPauseClouds(true)}
                                onMouseLeave={() => {
                                    // unpause the cloud motion only if the modal is still closed
                                    if (!modalState.isOpen) {
                                        setIsPauseClouds(false)
                                    }
                                }
                                }
                            >
                            </h4>
                        </div>
                        <div className={styles.cloud} key={`2`} style={cloudStyle(2)}></div>
                    </>
                }               

            { modalState.isOpen && 
                <ModalOverlay
                    postContent={thoughts.find(({ slug }) => slug === modalState.contentSlug)}
                    setModalState={setModalState}
                />
            }
        </>
    )
}