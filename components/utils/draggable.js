import React, { useRef, useEffect } from 'react';
import styles from '@/styles/utils/draggable.module.css'

const Draggable = ({ children, updateElementPagePosition, elementId, setInitialPosition, position }) => {
  const draggableRef = useRef(null);
  const containerRef = useRef(null);
  let offsetX, offsetY, isDragging = false;

  // Function to start dragging
  const startDrag = (event) => {
    isDragging = true;
    offsetX = event.clientX - draggableRef.current.getBoundingClientRect().left;
    offsetY = event.clientY - draggableRef.current.getBoundingClientRect().top;

    console.log(draggableRef.current.children[0])

    containerRef.current.classList.remove(styles['drag-inactive'])
    containerRef.current.className += ` ${styles['drag-active']}`
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

    // TODO: Doing this check everytime the mouse moves, is there a more efficient way?
    if(draggableRef.current.classList.contains(styles['initial-position'])){

      draggableRef.current.classList.remove(styles['initial-position'])

    }
  };

  // Function to stop dragging
  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    containerRef.current.className += ` ${styles['drag-inactive']}`
    containerRef.current.classList.remove(styles['drag-active'])

    console.log([draggableRef.current.style.left, draggableRef.current.style.top])
    updateElementPagePosition([draggableRef.current.style.left, draggableRef.current.style.top], elementId)
  };

  const className = setInitialPosition ? `${styles.draggable} ${styles['initial-position']}` : styles.draggable

  return (
    <div className={`${styles['drag-active']}`} ref={containerRef}>
      <div
          ref={draggableRef}
          className={className}
          onMouseDown={startDrag}
          onMouseMove={drag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={ position ? { left: position.x, top: position.y } : {} }
      >
        { children }
      </div>
    </div>
  );
};

export default Draggable;
