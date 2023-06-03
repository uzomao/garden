import React, { useRef, useEffect } from 'react';
import styles from '@/styles/utils/resizable-image.module.css'
import { pageElementTypes } from './builder';

export default function ResizableContent ({ contentType, id, src, alt, style, updateElementPageSize, elementId }){

    let resizeTimer;
    const debounceDelay = 500;

    const handleResize = (width, height, elementId) => {
        updateElementPageSize([width, height], elementId);
        // Perform actions or update UI after the resize action is completed
    };

    const debouncedResize = (width, height, elementId) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResize(width, height, elementId);
        }, debounceDelay);
    };

    const resizableContainerRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
            const { width, height } = entry.contentRect;
            debouncedResize(width, height, elementId);
        }
    });

    resizeObserver.observe(resizableContainerRef.current);

    return () => {
        resizeObserver.disconnect();
    };
    }, []);


    const { width, height, left, top } = style

    return (
        <div className={styles.container} ref={resizableContainerRef} style={{width, height}}>
            {
                contentType === pageElementTypes.image ?
                    <img
                        id={id}
                        className={`${styles.image} page-element`}
                        src={src}
                        alt={alt}
                        style={{top, left}}
                    />
                    :
                    <iframe
                        id={id}
                        className={`${styles.image} page-element`}
                        src={src}
                        style={{top, left}}
                    />
            }
        </div>
    )
}