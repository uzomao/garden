import { useState, useEffect } from 'react'
import { contentTypes } from '@/utils/helpers'

export default function Sharer({ contentType, slug, id, isInline }) {

    const [ pageLink, setPageLink ] = useState(null)

    useEffect(() => {
        if(contentType === contentTypes.ideaUpdate){
            setPageLink(`${window.location.origin}/${contentTypes.projects}/${slug}/${id}`)
        } else {
            setPageLink(`${window.location.origin}/${contentType}/${slug}`)
        }
    }, [])
    

    const copyLink = 'Copy link'

    const shareStyles = {
        textDecoration: 'underline',
        cursor: 'pointer'
    }

    const twitterLink = <a href={`https://twitter.com/intent/tweet?text=${pageLink}`} target='_blank'>Share on Twitter</a>

    const copyURI = () => {

        navigator.clipboard.writeText(pageLink)

        const copyLinkDiv = document.getElementById('copy-link')

        copyLinkDiv.style.textDecoration = 'none'
        copyLinkDiv.innerText = 'link copied to clipboard!'
        
        setTimeout(() => {
            copyLinkDiv.innerText = copyLink
            copyLinkDiv.style.textDecoration = 'underline'
        }, 3000);
    }

    return (
        <div style={{marginTop: `2.5em`, display: isInline ? 'flex' : 'block', alignItems: 'center'}}>
            <p style={{marginRight: `1rem`}}>Share:</p>
            <p onClick={() => copyURI()} style={shareStyles} id='copy-link'>{copyLink}</p>
            { !isInline && <p>{twitterLink}</p> }
        </div>
    )
}