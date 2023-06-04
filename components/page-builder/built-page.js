import { useState, useEffect, useRef } from 'react'
import Sky from "../elements/sky"
import Ground from "../elements/ground"
import { supabase } from '@/utils/supabase'
import Draggable from '../utils/draggable'
import Builder from './builder'
import { updateElementPagePosition, pageElementTypes, updateElementPageSize } from './builder'
import ResizableContent from './resizable-content'

export default function BuiltPage ({ pageTitle }) {

    const [ pageElements, setPageElements ] = useState(null)
    const [ isBuildMode, setIsBuildMode ] = useState(true)

    const { image, text, embed } = pageElementTypes

    const getPageElements = async () => {

        let { data, error } = await supabase
        .from('page builder')
        .select('*')
        .eq('page', pageTitle)
        if(error) console.log(error)
        else {
            setPageElements(data)
        }

    }

    useEffect(() => { 
        getPageElements()
    }, [])

    const renderPageElement = (content, contentType, elementId, elementPosition, elementSize=undefined) => {
        const positions = !isBuildMode ? {left: elementPosition.x, top: elementPosition.y} : { left: 0, top: 0 }

        let elementStyle;
        if(elementSize){
            const { width, height } = elementSize
            elementStyle = {width, height, ...positions}
        }

        switch (contentType) {
            case text:
                return <p id={elementId} style={positions} className='page-element page-text'>{content}</p>
            case image:
                return isBuildMode ? <ResizableContent contentType={image} id={elementId} src={content} 
                                        style={elementStyle} alt='' 
                                        updateElementPageSize={updateElementPageSize} elementId={elementId} /> 
                                    : <img id={elementId} src={content} style={elementStyle} className='page-element' />
            case embed:
                return isBuildMode ? <ResizableContent contentType={embed} id={elementId} src={content} 
                                        style={elementStyle} alt='' 
                                        updateElementPageSize={updateElementPageSize} elementId={elementId} /> 
                                    : <iframe id={elementId} src={content} style={elementStyle} className='page-element' />
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