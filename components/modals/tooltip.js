import React from 'react'
import CloseBtn from '../close-btn'
import { formatDate } from '@/utils/helpers'

const Tooltip = ({ data, closeTooltip, dimensions}) => {

    const { coords, content } = data

  return (
    <div style={{ top: `${coords.y}px`, left: `${coords.x + dimensions}px` }} className="tooltip text-left">
        <CloseBtn closeModalFunction={closeTooltip} />
        <h4>{content.prompt}</h4>
        <div>
            <p style={{margin: 0}}>by {content.name}</p>
            <p style={{margin: 0}}>{formatDate(content.date)}</p>
        </div>
        <p style={{ maxHeight: '100px', overflowY: 'scroll' }}>{content.response}</p>
        <div className="flex-horizontal center">
            <button className="default-border-radius" onClick={() => {}}></button>
        </div>
    </div>
  )
}

export default Tooltip