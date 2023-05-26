import Sky from "../elements/sky"
import Ground from "../elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"

import Image from "next/image"

import styles from '@/styles/updates.module.css'

import ModalOverlay from "../modal-overlay"

import { contentTypes } from "@/utils/helpers"

export default function UpdatesSpace () {

    const [modalState, setModalState] = useState({
        isOpen: false,
        contentSlug: ''
      })
    
    const changeModalState = (isOpen, slug) => setModalState({ isOpen, contentSlug: slug })

    const [ updates, setUpdates ] = useState(null)

    useEffect(() => {
        fetchGraphQL(`{ ${queries.updates} }`)
          .then((content) => {
            const data = content.data
            console.log(content)
            setUpdates(data.updatesCollection.items)
          })
          return () => {}
    }, [])

    const pause = 'pause'
    const play = 'play'

    const toggleAnimation = (toggle) => {
        const columns = document.getElementsByClassName('update')

        if(toggle === pause) {
            for (const column of columns) {
                column.className += " animation-paused"
            }
        } else if(toggle === play){
            for (const column of columns) {
                column.classList.remove('animation-paused')
            }
        }
    }

    return (
        <div>
            <Sky />
            <Ground />
            <div className={styles.container}>
                {
                    updates && updates.map(({ title, date, coverImage, slug }) => 
                        <div className={`${styles.update} ${styles.animate} update`}>
                            <Image 
                                src={ coverImage.url } 
                                alt={ coverImage.fileName }
                                width={250} 
                                height={250} 
                                
                                onClick={ (e) => { 
                                    changeModalState(true, slug)
                                }}
                                onMouseOver={() => toggleAnimation(pause)} onMouseOut={() => toggleAnimation(play)}
                            />
                            <p>{title}</p>
                            <p>{date}</p>
                        </div>
                    )
                }
                { modalState.isOpen && 
                    <ModalOverlay 
                        postContent={updates.filter(({ slug }) => slug === modalState.contentSlug)[0]}
                        setModalState={setModalState}
                        contentType={contentTypes.update}
                    /> 
                }
            </div>
        </div>
    )
}