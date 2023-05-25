import styles from '@/styles/signboard.module.css'
// import Link from 'next/link'

import { v4 as uuidv4 } from 'uuid';

export default function NavSignboard({ signs }) {
  return (
    <div className={styles.container}>
        <div className={styles.signpost}>
        {
            signs.map(({ text, navigateToId }) => 
                <a href={`#${navigateToId}`} className={styles['facing-left']} key={uuidv4()}>
                    {text}
                </a>
            )
        }
        </div>
    </div>
  )
}
