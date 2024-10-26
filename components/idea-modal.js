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
    const { slug, title, status, date, description } = idea

    const closeModal = () => {
        setIsIdeaModalOpen(false)
    }

    const [ ideaUpdates, setIdeaUpdates ] = useState(null)
    // id of the idea passed as a prop to this component
    const ideaId = idea.sys.id

    const [expandedUpdates, setExpandedUpdates] = useState([]); // Array to track expanded updates

    const toggleBodySection = (id) => {
        setExpandedUpdates((prevExpanded) => 
            prevExpanded.includes(id) 
                ? prevExpanded.filter(updateId => updateId !== id) // Remove from expanded if already expanded
                : [...prevExpanded, id] // Add to expanded if not expanded
        );
    };

    useEffect(() => {
        fetchGraphQL(`{ ${queries.ideaUpdates} }`)
            .then((content) => {
                const ideaUpdatesCollection = content.data.ideaUpdateCollection.items
                setIdeaUpdates(ideaUpdatesCollection.filter(({ idea: referenceIdea }) => referenceIdea.sys.id == ideaId )) //idea.sys.id = id of the idea that the update references
            })
    }, [])

    const modalClassName = positionModalInGarden ? `idea-modal-overlay idea-overlay text-left` : `idea-modal-overlay text-left`
    
  return (
    <ClickAway setModalOpenFn={setIsIdeaModalOpen}>
        <div className={modalClassName} style={{top: `${window.scrollY}px` }}>
            { setIsIdeaModalOpen ? <CloseBtn closeModalFunction={closeModal} /> : <CloseBtn /> }
            <h1 className='text-center'>{title}</h1>
            <div className="grey-border-bottom">
                <p>{status}</p>
                <p>First seeded: {formatDate(date)}</p>
            </div>
            <div>
                <p className='padding-md'>{description}</p>
            </div>
            <div>
                <h2>Updates</h2>
                {
                    ideaUpdates ? ideaUpdates.map((update) => 
                            <div key={update.sys.id} className='idea-update'>
                                <div className='header-section grey-border-bottom' onClick={() => toggleBodySection(update.sys.id)}>
                                    <h4 className='caret'>{expandedUpdates.includes(update.sys.id) ? 'v' : '>'}</h4>
                                    <div>
                                        <h3 style={{margin: 0}}>{update.title}</h3>
                                        <small>{formatDate(update.date)}</small>
                                    </div>
                                </div>
                                {expandedUpdates.includes(update.sys.id) && ( // Conditionally render body-section
                                    <div
                                        className='body-section grey-border-bottom'
                                        dangerouslySetInnerHTML={{ __html: parseRichText(update.body.json, update.body.links) }}
                                    />
                                )}
                            </div>
                        )
                        :
                        <p>Loading ideas...</p>
                }
                {/* <Reactions contentId={slug} />
                <Comment slug={slug} title={title} /> */}
                <Sharer contentType={contentTypes.ideas} slug={slug} />
            </div>
        </div>
    </ClickAway>
  )
}
