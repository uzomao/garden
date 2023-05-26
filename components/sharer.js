import { useState, useEffect } from 'react'

export default function Sharer({ contentType, slug }) {

    const [ pageLink, setPageLink ] = useState(null)

    useEffect(() => { 
        setPageLink(`${window.location.origin}/${contentType}/${slug}`)
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
        <div style={{marginTop: `2.5em`}}>
            Share: 
            <p onClick={() => copyURI()} style={shareStyles} id='copy-link'>{copyLink}</p>
            <p>{twitterLink}</p>
        </div>
    )
}