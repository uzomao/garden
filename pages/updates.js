import Ground from "@/components/elements/ground"

import { useState, useEffect } from "react"

import Image from "next/image"

import styles from '@/styles/updates.module.css'

import ModalOverlay from "@/components/modal-overlay"

import { formatDate } from "@/utils/helpers"

import useModal from "@/hooks/use-modal"

import { contentTypes } from "@/utils/helpers"

export default function UpdatesSpace ({ content }) {

    const [ updates, setUpdates ] = useState([])

    const { modalState, setModalState, changeModalState } = useModal()

    useEffect(() => {
        setUpdates(content.updatesCollection.items)
    }, [])

    return (
        <>
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
        </>
    )
}