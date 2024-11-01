import { useState, useEffect, useContext } from 'react'
import Sky from "../elements/sky"
import Ground from "../elements/ground"
import { supabase } from '@/utils/supabase'
import Draggable from '../utils/draggable'
import Builder from './builder'
import { updateElementPagePosition, pageElementTypes, updateElementPageSize } from './builder'
import ResizableContent from './resizable-content'
import { AppStateContext } from "@/pages/_app"
import { getResponsiveDimensions } from '@/utils/helpers'

export default function BuiltPage ({ pageTitle, content }) {

    const { appState } = useContext(AppStateContext);
    const { isBuildMode } = appState

    const [ pageElements, setPageElements ] = useState(null)

    const { image, text, embed } = pageElementTypes

    const [ screenSizes, setScreenSizes ] = useState({})

    useEffect(() => { 

        console.log(content);

        const screenWidth = window.outerWidth
        const screenHeight = window.outerHeight

        setScreenSizes({ width: screenWidth, height: screenHeight })

        setPageElements(content ? content : [])

    }, [content])

    const renderPageElement = (content, contentType, elementId, elementPosition, elementSize=undefined) => {

        const responsivePositions = getResponsiveDimensions(elementPosition.x, screenSizes.width, elementPosition.y, screenSizes.height)
        
        const positions = !isBuildMode ? { left: responsivePositions[0], top: responsivePositions[1] } : { left: 0, top: 0 }
        
        let elementStyle;
        if(elementSize){
            const responsiveSizes = getResponsiveDimensions(elementSize.width, screenSizes.width, elementSize.height, screenSizes.height)
            // use responsive sizing to render elements only when not in Build mode. So as to avoid the resized element dimensions being saved to the db
            const [ width, height ] = !isBuildMode ? responsiveSizes : [elementSize.width, elementSize.height]
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
            { isBuildMode && <Builder pageTitle={pageTitle} /> }
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