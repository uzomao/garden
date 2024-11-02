import styles from '@/styles/signboard.module.css'
// import Link from 'next/link'

import { v4 as uuidv4 } from 'uuid';

import CloseBtn from '../close-btn';

export default function NavSignboard({ gardenSpaces, currentSpaceIndex, setCurrentSpaceIndex, setShowSignpost }) {

    const isSignFacingLeft = (signIndex) => {
        return signIndex < currentSpaceIndex ? true : false
    }

    return (
        <div className={styles.container}>
            <div style={{position: 'absolute', top: '10px', right: '15px'}}>
                <CloseBtn closeModalFunction={setShowSignpost} />
            </div>
            <div className={styles.signpost}>
            {
                gardenSpaces.map(({ name }, index) => {
                    if(currentSpaceIndex !== index){
                        return <div
                            className={ isSignFacingLeft(index) ? `${styles.sign} ${styles['facing-left']}` : `${styles.sign} ${styles['facing-right']}` } 
                            key={uuidv4()}
                            onClick={() => { setCurrentSpaceIndex(index); setShowSignpost(false) }}
                        >
                            <p>{name}</p>
                        </div>
                    } else {
                        return <>
                                <i style={{marginBottom: '-25px', fontSize: '13px', color: 'red'}} className='text-center'>You are here</i>
                                <div style={{margin: 0}} className={`${styles.sign} ${styles['sign-center']}`}>
                                    <p>{gardenSpaces[index].name}</p>
                                </div>
                            </>
                    }
                })
            }
            </div>
        </div>
    )
}
