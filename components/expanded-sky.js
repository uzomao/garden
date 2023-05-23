import styles from '@/styles/expanded-sky.module.css'
import { useState } from 'react'
import { useRouter } from "next/router";
import { formatDate } from '@/utils/helpers';

export default function ExpandedSky({ thoughts, ideas, changeModalState, cloud }) {

    const contentTypes = {
        thoughts: 'thoughts',
        ideas: 'ideas'
    }

    const router = useRouter()

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
                            thoughts && thoughts.map(({title, slug, publishDate }) => 
                                <div className={styles.piece}>
                                    <h2 onClick={() => {
                                        changeModalState(true, slug)
                                        router.push(`/?${cloud}=${slug}`, undefined, { shallow: true })
                                    }}>{title}</h2>
                                    <p>{formatDate(publishDate)}</p>
                                </div>
                            )
                        :
                        ideas && ideas.map(({title}) =>
                            <h2>{title}</h2>
                        )
                    }
                </div>
            </div>
        </main>
    )

}