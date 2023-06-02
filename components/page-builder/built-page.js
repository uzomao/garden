import { useState, useEffect, useRef } from 'react'
import Sky from "../elements/sky"
import Ground from "../elements/ground"
import { supabase } from '@/utils/supabase'
import Draggable from '../utils/draggable'
import Builder from './builder'
import { updateElementPagePosition, pageElementTypes, updateElementPageSize } from './builder'
import ResizableImage from './resizable-image'

export default function BuiltPage ({ pageTitle }) {

    const [ pageElements, setPageElements ] = useState(null)
    const [ isBuildMode, setIsBuildMode ] = useState(false)

    const { image, text, embed } = pageElementTypes

    const contentRef = useState(null)

    const getPageElements = async () => {

        let { data, error } = await supabase
        .from('page builder')
        .select('*')
        .eq('page', pageTitle)
        if(error) console.log(error)
        else {
            console.log(data)
            setPageElements(data)
        }

    }

    useEffect(() => { 
        getPageElements()
    }, [])

    const renderPageElement = (content, contentType, elementId, elementPosition, elementSize=undefined) => {
        const positions = !isBuildMode ? {left: elementPosition.x, top: elementPosition.y} : { left: 0, top: 0 }
        switch (contentType) {
            case text:
                return <p id={elementId} style={positions} className='page-element page-text'>{content}</p>
            case image:
                const { width, height } = elementSize
                const elementStyle = {width, height, ...positions}
                return isBuildMode ? <ResizableImage id={elementId} src={content} 
                                        style={elementStyle} alt='' 
                                        updateElementPageSize={updateElementPageSize} elementId={elementId} /> 
                                    : <img id={elementId} src={content} style={elementStyle} className='page-element' />
            case embed:
                return
            default:
                break;
        }
    }

    return (
        <>
            <Sky>
                <h1 style={{color: 'white'}}>{`${pageTitle} Space`}</h1>
                <Builder pageTitle={pageTitle} />
            </Sky>
            <Ground />
            {
                pageElements && pageElements.map(({ content, content_type, element_id, element_position, element_size }) => 
                    !isBuildMode ? 
                        renderPageElement(content, content_type, element_id, element_position, element_size)
                        :
                        <Draggable updateElementPagePosition={updateElementPagePosition} elementId={element_id} setInitialPosition={false} position={element_position}>
                            { renderPageElement(content, content_type, element_id, element_position, element_size) }
                        </Draggable>
                )
            }
        </>
    )

}