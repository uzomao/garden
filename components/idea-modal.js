import utilsStyles from '@/styles/utils.module.css'
import CloseBtn from './close-btn'
import { fetchGraphQL, parseRichText } from '@/utils/contentful'
import { useState, useEffect } from 'react'
import { queries } from '@/utils/query'
import { formatDate, contentTypes } from '@/utils/helpers'

import Sharer from './sharer'
import Comment from './comment'
import Reactions from './reactions'

import ClickAway from './utils/click-away'

export default function IdeaModal({ positionModalInGarden, idea, setIsIdeaModalOpen, modalCoords, ideaImgDimensions, topPosition }) {
    const { slug, title, status, date } = idea

    const closeModal = () => {
        setIsIdeaModalOpen(false)
    }

    const [ ideaUpdates, setIdeaUpdates ] = useState(null)
    // id of the idea passed as a prop to this component
    const ideaId = idea.sys.id

    useEffect(() => {
        fetchGraphQL(`{ ${queries.ideaUpdates} }`)
            .then((content) => {
                const ideaUpdatesCollection = content.data.ideaUpdateCollection.items
                setIdeaUpdates(ideaUpdatesCollection.filter(({ idea: referenceIdea }) => referenceIdea.sys.id == ideaId )) //idea.sys.id = id of the idea that the update references
            })
    }, [])

    const modalClassName = positionModalInGarden ? `${utilsStyles.overlay} ${utilsStyles.ideaoverlay} text-center` : `${utilsStyles.overlay} text-center`
    
  return (
    <ClickAway setModalOpenFn={setIsIdeaModalOpen}>
        <div className={modalClassName} style={ positionModalInGarden ? { left: `${modalCoords.x + ideaImgDimensions}px`, top: topPosition } : {} }>
            { setIsIdeaModalOpen ? <CloseBtn closeModalFunction={closeModal} /> : <CloseBtn /> }
            <h3>{title}</h3>
            <div className="flex-horizontal space-between grey-border-bottom">
                <p>{status}</p>
                <p>{formatDate(date)}</p>
            </div>
            <div>
                {
                    ideaUpdates ? ideaUpdates.map((update) => 
                            <div key={update.sys.id} className={`${utilsStyles.ideaupdate} grey-border-bottom`}>
                                <h4>{update.title}</h4>
                                <small>{formatDate(update.date)}</small>
                                <div dangerouslySetInnerHTML={{ __html: parseRichText(update.body.json, update.body.links) }} />
                            </div>
                        )
                        :
                        <p>Loading ideas...</p>
                }
                <Reactions contentId={slug} />
                <Comment slug={slug} title={title} />
                <Sharer contentType={contentTypes.ideas} slug={slug} />
            </div>
        </div>
    </ClickAway>
  )
}
