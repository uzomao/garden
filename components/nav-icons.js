import { useState } from 'react';
import styles from '@/styles/nav-icons.module.css'

import { FaExpandAlt } from "react-icons/fa";
import { BsFillSignpostSplitFill } from "react-icons/bs"
import { IoInformation, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

const iconSpacing = '15px'

export default function NavIcons ({ expandSky, setExpandSky, showSignpost, setShowSignpost, showInfo, setShowInfo, playAudio, setPlayAudio }) {

    const renderVolumeIcon = () => {
        const style = { bottom: iconSpacing, right: iconSpacing, fontSize: '32px' }
        const className = styles.icon
        if(playAudio){
            return <IoVolumeMuteOutline style={style}
                className={className}
                onClick={() => setPlayAudio(false)}
            />
        } else {
            return <IoVolumeHighOutline style={style}
                className={className}
                onClick={() => setPlayAudio(true)}
            />
        }
    }
    
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
            { renderVolumeIcon() }
        </div>
    )
}