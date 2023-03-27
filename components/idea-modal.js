import utilsStyles from '@/styles/utils.module.css'
import CloseBtn from './close-btn'
import { fetchGraphQL, parseRichText } from '@/utils/contentful'
import { useState, useEffect } from 'react'
import { queries } from '@/utils/query'

export default function IdeaModal({ idea, setIsIdeaModalOpen, modalCoords, ideaImgDimensions, topPosition }) {
    const { title, status, date } = idea
    const { x } = modalCoords
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
    
  return (
    <div className={`${utilsStyles.overlay} ${utilsStyles.ideaoverlay} text-center`} style={{ left: `${x + ideaImgDimensions}px`, top: topPosition }}>
        <CloseBtn closeModalFunction={closeModal} />
        <h3>{title}</h3>
        <div className="flex-horizontal space-between grey-border-bottom">
            <p>{status}</p>
            <p>{date}</p>
        </div>
        <div>
            {
                ideaUpdates ? ideaUpdates.map((update) => 
                        <div key={update.sys.id} className={`${utilsStyles.ideaupdate} grey-border-bottom`}>
                            <h4>{update.title}</h4>
                            <small>{update.date}</small>
                            <div dangerouslySetInnerHTML={{ __html: parseRichText(update.body.json, update.body.links) }} />
                        </div>
                    )
                    :
                    <p>Loading ideas...</p>
            }
        </div>
    </div>
  )
}
