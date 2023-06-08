import styles from '@/styles/signboard.module.css'
// import Link from 'next/link'

import { v4 as uuidv4 } from 'uuid';

import CloseBtn from './close-btn';

export default function NavSignboard({ gardenSpaces, currentSpaceIndex, setCurrentSpaceIndex, setShowSignpost }) {

    const isSignFacingLeft = (signIndex) => {
        return signIndex < currentSpaceIndex ? true : false
    }

    return (
        <div className={styles.container}>
            <CloseBtn closeModalFunction={setShowSignpost} />
            <div className={styles.signpost}>
            {
                gardenSpaces.map(({ name }, index) => {
                    return currentSpaceIndex !== index && <p
                        className={ isSignFacingLeft(index) ? styles['facing-left'] : styles['facing-right'] } 
                        key={uuidv4()}
                        onClick={() => { setCurrentSpaceIndex(index); setShowSignpost(false) }}
                    >
                        {name}
                    </p>
                })
            }
            </div>
        </div>
    )
}
