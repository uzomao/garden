import styles from '@/styles/nav-icons.module.css'

import { FaExpandAlt } from "react-icons/fa";
import { BsFillSignpostSplitFill, BsCloudRainHeavy } from "react-icons/bs"

const iconSpacing = '15px'

export default function NavIcons ({ expandSky, setExpandSky, showSignpost, setShowSignpost }) {
    return (
        <div className={styles.container}>
            <FaExpandAlt style={{ top: iconSpacing, right: iconSpacing }} 
                className={styles.icon} 
                onClick={() => setExpandSky(!expandSky)} 
            />
            <BsFillSignpostSplitFill style={{ bottom: iconSpacing, left: iconSpacing, fontSize: '32px' }}
                className={styles.icon}
                onClick={() => setShowSignpost(!showSignpost)}
            />
            <a href='/#updates'>
                <BsCloudRainHeavy style={{ top: iconSpacing, left: iconSpacing, fontSize: '32px' }}
                    className={styles.icon}
                />
            </a>
        </div>
    )
}