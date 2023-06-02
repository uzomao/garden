import React, { useEffect } from 'react';
import styles from '@/styles/utils/resizable-image.module.css'

export default function ResizableImage ({ id, src, alt, style, updateElementPageSize, elementId }){

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            setTimeout(() => {
                updateElementPageSize([width, height], elementId)
                // Perform actions or update UI after the resize action is completed
            }, 500);
        }
    });

    useEffect(() => {
        const resizableContainer = document.getElementById('resizable-container')

        resizeObserver.observe(resizableContainer);
    
      return () => {}
    }, [])

    const { width, height, left, top } = style

    return (
        <div className={styles.container} id='resizable-container' style={{width, height}}>
            <img
                id={id}
                className={`${styles.image} page-element`}
                src={src}
                alt={alt}
                style={{top, left}}
            />
        </div>
    )
}