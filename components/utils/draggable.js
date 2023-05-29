import React, { useRef, useEffect } from 'react';
import styles from '@/styles/utils/draggable.module.css'

const Draggable = ({ children }) => {
  const draggableRef = useRef(null);
  const containerRef = useRef(null);
  let offsetX, offsetY, isDragging = false;

  // Function to start dragging
  const startDrag = (event) => {
    isDragging = true;
    offsetX = event.clientX - draggableRef.current.getBoundingClientRect().left;
    offsetY = event.clientY - draggableRef.current.getBoundingClientRect().top;
  };

  // Function to drag the element
  const drag = (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const container = event.currentTarget.parentElement;
    const containerRect = container.getBoundingClientRect();

    const x = event.clientX - containerRect.left - offsetX;
    const y = event.clientY - containerRect.top - offsetY;

    draggableRef.current.style.left = `${x}px`;
    draggableRef.current.style.top = `${y}px`;
  };

  // Function to stop dragging
  const stopDrag = () => {
    isDragging = false;

    containerRef.current.classList += ` ${styles['drag-inactive']}`
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
          ref={draggableRef}
          className={styles.draggable}
          onMouseDown={startDrag}
          onMouseMove={drag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
      >
          { children }
      </div>
    </div>
  );
};

export default Draggable;
