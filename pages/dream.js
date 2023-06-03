import Sky from "@/components/elements/sky"
import Ground from "@/components/elements/ground"
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
            <article className="paragraph position-element">
                <p>How to stay in the energy of your dreams</p>
                <ul>
                    <li>Define</li>
                    <li>Align</li>
                    <li>Overcome</li>
                    <li>Remain</li>
                    <li>Repeat</li>
                </ul>
            </article>
        </Ground>
    </>
  )
}
