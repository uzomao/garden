export default function Sharer() {

    const copyLink = 'Copy link'

    const shareStyles = {
        textDecoration: 'underline',
        cursor: 'pointer'
    }

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
        <p>Share: <span onClick={() => copyURI()} style={shareStyles} id='copy-link'>{copyLink}</span></p>
    )
}