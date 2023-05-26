import styles from '@/styles/signboard.module.css'
// import Link from 'next/link'

import { v4 as uuidv4 } from 'uuid';

export default function NavSignboard({ signs, spaceIds, currentSpaceId, setCurrentSpaceId }) {

    const currentSpaceIndex = spaceIds.indexOf(currentSpaceId)

    const isSignFacingLeft = (signIndex) => {
        return signIndex < currentSpaceIndex ? true : false
    }

    return (
        <div className={styles.container}>
            <div className={styles.signpost}>
            {
                signs.map(({ text, navigateToId }, index) => {
                    return currentSpaceIndex !== index && <a href={`#${navigateToId}`} 
                        className={ isSignFacingLeft(index) ? styles['facing-left'] : styles['facing-right'] } 
                        key={uuidv4()}
                        onClick={() => setCurrentSpaceId(spaceIds[index])}
                    >
                        {text}
                    </a>
                })
            }
            </div>
        </div>
    )
}
