import styles from '@/styles/signboard.module.css'
// import Link from 'next/link'

import { v4 as uuidv4 } from 'uuid';

export default function NavSignboard({ signs, spaceIds, currentSpaceId }) {

    const currentSpaceIndex = spaceIds.indexOf(currentSpaceId)

    const isSignFacingLeft = (signIndex) => {
        return signIndex < currentSpaceIndex ? true : false
    }
    
    const otherSpaceSigns = [...signs.slice(0, currentSpaceIndex), ...signs.slice(currentSpaceIndex + 1)]

    return (
        <div className={styles.container}>
            <div className={styles.signpost}>
            {
                otherSpaceSigns.map(({ text, navigateToId }, index) => 
                    <a href={`#${navigateToId}`} 
                        className={ isSignFacingLeft(index) ? styles['facing-left'] : styles['facing-right'] } 
                        key={uuidv4()}
                    >
                        {text}
                    </a>
                )
            }
            </div>
        </div>
    )
}
