import { useState, useEffect } from 'react'
import Sky from "../elements/sky"
import Ground from "../elements/ground"
import styles from '@/styles/build.module.css'
import CloseBtn from '../close-btn'
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/utils/supabase'
import Draggable from '../utils/draggable'

export default function Intro () {

    const [ showBuildOptions, setShowBuildOptions ] = useState(false)
    const [ isFormOpen, setIsFormOpen ] = useState(false)
    const [ formContentType, setFormContentType ] = useState(null)
    const [ newPageElement, setNewPageElement ] = useState(null)

    const { image, text, embed } = {
        image: 'image',
        text: 'text',
        embed: 'embed'
    }

    const openForm = (contentType) => {
        setIsFormOpen(true)
        setFormContentType(contentType)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const content = document.getElementById('content').value
        
        // const { data, error } = await supabase
        //     .from('page builder')
        //     .insert([
        //         { 
        //             page: 'intro',
        //             content_type: formContentType,
        //             content,
        //             element_id: `${formContentType}_${uuidv4()}`
        //         },
        //     ])
        //     if(error) console.log(error)
        //     else {
        //         const element = createElementOnScreen(formContentType, content)
        //         setNewPageElement(element)
        //     }

        const element = createElementOnScreen(formContentType, content)
        setNewPageElement(element)
    }

    const createElementOnScreen = (formContentType, content) => {
        switch (formContentType) {
            case text:
                return <Draggable>
                            {content}
                        </Draggable>
            case image:
                return
            case embed:
                return
            default:
                break;
        }
    }

    const getInputBoxForContentType = (contentType) => {
        switch (contentType) {
            case image:
                return <input type="file" id="content" />
            case text:
                return <input type="textarea" id="content" />
            case embed:
                return <input type="text" id="content" placeholder="https://" />
            default:
                return <input type="textarea" id="content" />
        }
    }

    // manage content dragging

    return (
        <>
            <Sky>
                <h1 style={{color: 'white'}}>Intro Space</h1>
                {
                    isFormOpen ?
                        <div className={styles.form}>
                            <CloseBtn closeModalFunction={setIsFormOpen} />
                            { getInputBoxForContentType(formContentType) }
                            <button onClick={(event) => submitForm(event)}>upload</button>
                        </div>
                        :
                        showBuildOptions ?
                            <div className={styles['build-options']}>
                                <CloseBtn closeModalFunction={setShowBuildOptions} />
                                <div className={styles.options}>
                                    <div onClick={() => openForm(image)}>
                                        <span>🖼️</span>
                                        <p>Image</p>
                                    </div>
                                    <div onClick={() => openForm(text)}>
                                        <span>🇹</span>
                                        <p>Text</p>
                                    </div>
                                    <div onClick={() => openForm(embed)}>
                                        <span>📥</span>
                                        <p>Embed</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <button onClick={() => setShowBuildOptions(true)}>Build</button>
                }
            </Sky>
            <Ground />
            { newPageElement && newPageElement }
        </>
    )

}