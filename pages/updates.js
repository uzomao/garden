import Sky from "@/components/elements/sky"
import Ground from "@/components/elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"

import Image from "next/image"

import styles from '@/styles/updates.module.css'

import Clouds from "@/components/elements/clouds"
import ModalOverlay from "@/components/modal-overlay"

import { formatDate, plants } from "@/utils/helpers"

import { sortByDateDescending } from "@/utils/helpers"
import useModal from "@/hooks/use-modal"

import { contentTypes } from "@/utils/helpers"

export default function UpdatesSpace () {

    const [ updates, setUpdates ] = useState([])

    const { modalState, setModalState, changeModalState } = useModal()

    useEffect(() => {
        fetchGraphQL(`{ ${queries.updates} }`)
          .then((content) => {
            const data = content.data
            console.log(data);
            setUpdates(data.updatesCollection.items)
          })
          return () => {}
    }, [])

    return (
        <div>
            <Sky>
                <Clouds numClouds={5} />
            </Sky>

            <Ground>
                <div className={styles.updates}>
                    {
                        updates && updates.map(({ title, date, slug, coverImage }, index) => 
                            <div key={index} className={styles.update} onClick={() => { 
                                changeModalState(true, slug)
                            }}>
                                {/* <span role="img" aria-label="plant emoji" style={{fontSize: '48px'}}>{plants.cherryBlossom}</span> */}
                                <Image 
                                    src={ coverImage.url } 
                                    alt={ coverImage.fileName }
                                    width={100} 
                                    height={100}
                                    className={styles['update-image']}
                                />
                                <div className={styles['update-data']}>
                                    <p>{title}</p>
                                    <p>{formatDate(date)}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Ground>
            { modalState.isOpen &&
                <ModalOverlay 
                    postContent={updates.filter(({ slug }) => slug === modalState.contentSlug)[0]}
                    setModalState={setModalState}
                    contentType={contentTypes.updates}
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