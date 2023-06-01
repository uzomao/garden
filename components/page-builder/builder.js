import { useState } from 'react'
import styles from '@/styles/build.module.css'
import { supabase } from '@/utils/supabase'
import CloseBtn from '../close-btn'
import { v4 as uuidv4 } from 'uuid';
import Draggable from '../utils/draggable';

export const updateElementPagePosition = async (elementCoords, elementId) => {
    const { data, error } = await supabase
        .from('page builder')
        .update({ element_position: {x: elementCoords[0], y: elementCoords[1]} })
        .eq('element_id', elementId)
        if(error) console.log(error)
        else {
            console.log('element position updated', data)
        }
}

export const pageElementTypes = {
    image: 'image',
    text: 'text',
    embed: 'embed'
}

export default function Builder ({ pageTitle }) {

    const [ showBuildOptions, setShowBuildOptions ] = useState(false)
    const [ isFormOpen, setIsFormOpen ] = useState(false)
    const [ formContentType, setFormContentType ] = useState(null)
    const [ newPageElement, setNewPageElement ] = useState(null)

    const openForm = (contentType) => {
        setIsFormOpen(true)
        setFormContentType(contentType)
    }

    const { text, image, embed } = pageElementTypes

    const submitForm = async (event) => {
        event.preventDefault()
        const contentField = document.getElementById('content')
        const elementId = `${formContentType}_${uuidv4()}`
        
        const { data, error } = await supabase
            .from('page builder')
            .insert([
                { 
                    page: pageTitle,
                    content_type: formContentType,
                    content: contentField.value,
                    element_id: elementId,
                    element_position: {x: 0, y: 0}
                },
            ])
            if(error) console.log(error)
            else {
                const element = createDraggableElement(formContentType, contentField.value, elementId)
                contentField.value = ''
                setIsFormOpen(false)
                setNewPageElement(element)
            }
    }

    const createDraggableElement = (formContentType, content, elementId) => {
        let contentHtml;
        switch (formContentType) {
            case text:
                contentHtml = <p id={elementId} className='page-element page-text'>{content}</p>
            case image:
                contentHtml = <img id={elementId} src={content} className='page-element' />
            case embed:
                return
            default:
                break;
        }
        return  <Draggable updateElementPagePosition={updateElementPagePosition} elementId={elementId} setInitialPosition={true}>
                    { contentHtml }           
                </Draggable>
    }

    const getInputBoxForContentType = (contentType) => {
        switch (contentType) {
            case image:
                return <input type="text" id="content" placeholder="link to hosted image url" />
            case text:
                return <input type="textarea" id="content" />
            case embed:
                return <input type="text" id="content" placeholder="https://" />
            default:
                return <input type="textarea" id="content" />
        }
    }

    return (
        <>
            <div className={styles.builder}>
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
            </div>
        { newPageElement && newPageElement }
        </>
    )

}