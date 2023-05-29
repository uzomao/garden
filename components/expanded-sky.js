import styles from '@/styles/expanded-sky.module.css'
import { useState } from 'react'
import { formatDate, contentTypes } from '@/utils/helpers';

export default function ExpandedSky({ thoughts, ideas, changeModalState, setIsIdeaModalOpen, setCurrentIdea }) {

    const [ activeContentType, setActiveContentType ] = useState(contentTypes.thoughts)

    const getActiveClass = (contentType) => {
        return activeContentType === contentType ? styles.active : '' 
    }

    return (
        <main className={styles.container}>
            <div className={styles.contentsection}>
                <div className={styles.toggler}>
                    <p onClick={() => setActiveContentType(contentTypes.thoughts)} className={`${getActiveClass(contentTypes.thoughts)}`}>Thoughts</p>
                    <p className={styles.divider}>|</p>
                    <p onClick={() => setActiveContentType(contentTypes.ideas)} className={`${getActiveClass(contentTypes.ideas)}`}>Ideas</p>
                </div>
                <div className={styles.content}>
                    {
                        activeContentType === contentTypes.thoughts ?
                            thoughts && thoughts.map(({title, slug, date }) => 
                                <div className={styles.piece}>
                                    <h2 onClick={() => {
                                        changeModalState(true, slug)
                                    }}>{title}</h2>
                                    <p>{formatDate(date)}</p>
                                </div>
                            )
                        :
                        ideas && ideas.map((idea) =>
                            <h2 onClick={() => {
                                setIsIdeaModalOpen(true)
                                setCurrentIdea(idea)
                            }}>{idea.title}</h2>
                        )
                    }
                </div>
            </div>
        </main>
    )

}