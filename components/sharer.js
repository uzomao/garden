export default function Sharer() {

    const copyLink = 'Copy link'

    const shareStyles = {
        textDecoration: 'underline',
        cursor: 'pointer'
    }

    const twitterLink = <a href={`https://twitter.com/intent/tweet?text=${window.location.href}`} target='_blank'>Share on Twitter</a>

    const copyURI = () => {

        navigator.clipboard.writeText(window.location.href)

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