import styles from '@/styles/nav-icons.module.css'

import { FaExpandAlt } from "react-icons/fa";

const iconSpacing = '15px'

export default function NavIcons ({ expandSky, setExpandSky }) {
    return (
        <div className={styles.container}>
            <FaExpandAlt style={{ top: iconSpacing, right: iconSpacing }} 
                className={styles.icon} 
                onClick={() => setExpandSky(!expandSky)} 
            />
        </div>
    )
}