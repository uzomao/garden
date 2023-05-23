import styles from '@/styles/nav-icons.module.css'

import { FaExpandAlt } from "react-icons/fa";
import { BsFillSignpostSplitFill } from "react-icons/bs"

const iconSpacing = '15px'

export default function NavIcons ({ expandSky, setExpandSky, showSignpost, setShowSignpost }) {
    return (
        <div className={styles.container}>
            <FaExpandAlt style={{ top: iconSpacing, right: iconSpacing }} 
                className={styles.icon} 
                onClick={() => setExpandSky(!expandSky)} 
            />
            <BsFillSignpostSplitFill style={{ bottom: iconSpacing, left: iconSpacing, fontSize: '28px' }}
                className={styles.icon}
                onClick={() => setShowSignpost(!showSignpost)}
            />
        </div>
    )
}