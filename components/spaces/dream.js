import Sky from "../elements/sky"
import Ground from "../elements/ground"
import Image from "next/image"

import dream from '@/public/images/sign/dream.png'

import styles from '@/styles/Home.module.css'

export default function DreamSpace() {
  return (
    <>
        <Sky>
        </Sky>
        <Ground>
            <div className={styles.signcontainer}>
                <Image 
                    src={dream}
                    alt="Stay in the energy of your dreams"
                    className={styles.dreamsign}
                />
            </div>
        </Ground>
    </>
  )
}
