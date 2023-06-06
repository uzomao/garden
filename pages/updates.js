import Sky from "@/components/elements/sky"
import Ground from "@/components/elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"

import Image from "next/image"

import styles from '@/styles/updates.module.css'

import ModalOverlay from "@/components/modal-overlay"

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
                column.className += ` ${styles['animation-paused']}`
            }
        } else if(toggle === play){
            for (const column of columns) {
                column.classList.remove(styles['animation-paused'])
            }
        }
    }

    const [ title, setTitle ] = useState('')

    let groundContainerHeight = '100vh'
    const numColumns = 3
    
    if(updates){
        groundContainerHeight = `${200 * (Math.floor(updates.length/numColumns))}vh`
    }

    return (
        <div>
            <Sky />
            <div style={{ height: groundContainerHeight}}>
                <Ground />
            </div>
            <div className={styles.container}>
                { title && <h3 className={styles.title}>{title}</h3>}
                <h1 style={{color: 'white', width: '100%', textAlign: 'center'}}>{`Updatesss`}</h1>
                {
                    updates && updates.map(({ title, coverImage, slug }) => 
                        <div className={`${styles.update} update`} style={{width: `${100/numColumns}%`}}>
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
            </div>
        </div>
    )
}