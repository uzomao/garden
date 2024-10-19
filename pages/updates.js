import Sky from "@/components/elements/sky"
import Ground from "@/components/elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"

import Image from "next/image"

import styles from '@/styles/updates.module.css'

import Clouds from "@/components/elements/clouds"
import ModalOverlay from "@/components/modal-overlay"

import { formatDate } from "@/utils/helpers"

import { sortByDateDescending } from "@/utils/helpers"
import useModal from "@/hooks/use-modal"

export default function UpdatesSpace () {

    const [ updates, setUpdates ] = useState([])

    const { modalState, setModalState, changeModalState } = useModal()

    const limit = 10;
    const [ skip, setSkip ] = useState(0)

    const queryString = `query($limit: Int!, $skip: Int!){ ${queries.ideaUpdates2} }`

    const fetchUpdates = (skip, queryString) => {
        fetchGraphQL(queryString, { limit, skip })
            .then((content) => {
                const data = sortByDateDescending(content.data.ideaUpdateCollection.items)
                setUpdates((prevUpdates) => [...prevUpdates, ...data])
        })
    }

    useEffect(() => {
        fetchGraphQL(queryString, { limit, skip })
            .then((content) => {
                const data = sortByDateDescending(content.data.ideaUpdateCollection.items)
                setUpdates(data)
        })
        return () => {}
    }, [])

    const loadMore = () => {
        setSkip(prevSkip => {
            const newSkip = prevSkip + limit;
            fetchUpdates(newSkip, queryString);  // Call with the updated skip value
            return newSkip;
        });
    };

    return (
        <div>
            <Sky>
                <Clouds numClouds={5} />
            </Sky>

            <Ground>
                <div className={styles.updates}>
                    {
                        updates && updates.map(({ plant, title, date, idea }, index) => 
                            <div key={index} className={styles.update} onClick={() => { 
                                changeModalState(true, title)
                            }}>
                                <span role="img" aria-label="plant emoji" style={{fontSize: '48px'}}>{plant}</span>
                                <div className={styles['update-data']}>
                                    <p>{title}</p>
                                    <p className={styles['update-data-project']}>{idea.title}</p>
                                    <p>{formatDate(date)}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <button onClick={() => loadMore()}>Load more...</button>
            </Ground>
            { modalState.isOpen &&
                <ModalOverlay 
                    postContent={updates.filter(({ title }) => title === modalState.contentSlug)[0]}
                    setModalState={setModalState}
                />
            }
            {/* <div className={styles.container}>
                { title && <h3 className={styles.title}>{title}</h3>}
                {
                    updates && updates.map(({ title, coverImage, slug }) => 
                        <div className={`${styles.update} ${styles.animate} update`} style={{width: `${100/numColumns}%`}}>
                            <Image 
                                src={ coverImage.url } 
                                alt={ coverImage.fileName }
                                width={250} 
                                height={250}  
                                onClick={ () => { 
                                    changeModalState(true, slug)
                                }}
                                // onMouseOver={() => toggleAnimation(pause)} 
                                // onMouseOut={() => !modalState.isOpen && toggleAnimation(play)}
                                onMouseOver={() => setTitle(title)} 
                                onMouseOut={() => setTitle('')}
                            />
                        </div>
                    )
                }
                { modalState.isOpen &&
                    <ModalOverlay 
                        postContent={updates.filter(({ slug }) => slug === modalState.contentSlug)[0]}
                        setModalState={setModalState}
                        contentType={contentTypes.updates}
                    />
                }
            </div> */}
        </div>
    )
}