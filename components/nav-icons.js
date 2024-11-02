import { useState } from 'react';
import styles from '@/styles/nav-icons.module.css'

import { FaExpandAlt } from "react-icons/fa";
import { BsFillSignpostSplitFill } from "react-icons/bs"
import { IoInformation } from "react-icons/io5";

const iconSpacing = '15px'

export default function NavIcons ({ expandSky, setExpandSky, showSignpost, setShowSignpost, showInfo, setShowInfo }) {
    
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
            <IoInformation style={{ top: iconSpacing, left: iconSpacing, fontSize: '32px' }}
                className={styles.icon}
                onClick={() => setShowInfo(!showInfo)}
            />
        </div>
    )
}