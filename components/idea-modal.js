import CloseBtn from './close-btn'
import { fetchGraphQL, parseRichText } from '@/utils/contentful'
import { useState, useEffect, useCallback } from 'react'
import { queries } from '@/utils/query'
import { formatDate, contentTypes } from '@/utils/helpers'

import Sharer from './sharer'
import Comment from './comment'
import Reactions from './reactions'

import ClickAway from './utils/click-away'

import { FaCaretDown, FaCaretRight } from "react-icons/fa";

export default function IdeaModal({ positionModalInGarden, idea, setIsIdeaModalOpen, cacheProjectUpdates, content }) {
    
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

    const QUERY_LIMIT = 10

    useEffect(() => {
        if(content){
            const ideaUpdates = content.filter((update) => update.idea.title === title)
            if(ideaUpdates.length > 0){
                setIdeaUpdates(ideaUpdates)
            } else {
                fetchContent()
            }
        } else {
            fetchContent()
        }
        
    }, [])

    const fetchContent = useCallback(() => {
        // TODO: Add provision for "Load more" to circumvent query limit
        fetchGraphQL(queries.ideaUpdates, { ideaId: idea.sys.id, limit: QUERY_LIMIT })
            .then((content) => { 
                const updates = content.data.ideaUpdateCollection.items;
                setIdeaUpdates(updates);
                cacheProjectUpdates(updates);
            });
    }, [idea.sys.id]);

    const modalClassName = positionModalInGarden ? `idea-modal-overlay idea-overlay text-left` : `idea-modal-overlay text-left`
    
  return (
    <ClickAway setModalOpenFn={setIsIdeaModalOpen}>
        <div className={modalClassName} style={{top: window ? `${window.scrollY}px` : `` }}>
            { setIsIdeaModalOpen ? <CloseBtn closeModalFunction={closeModal} /> : <CloseBtn /> }
            <h1 className='text-center'>{title}</h1>
            <div className="grey-border-bottom">
                <p>{status}</p>
                <p>First seeded: {formatDate(date)}</p>
            </div>
            <div>
                <p className='padding-md'>{description}</p>
            </div>
            <div className='idea-updates'>
                <h2>Project Updates</h2>
                {
                    ideaUpdates ? ideaUpdates.map((update) => 
                            <div key={update.sys.id} className='idea-update'>
                                <div className='header-section grey-border-bottom' onClick={() => toggleBodySection(update.sys.id)}>
                                    <h4 className='caret'>{expandedUpdates.includes(update.sys.id) ? <FaCaretDown /> : <FaCaretRight />}</h4>
                                    <div>
                                        <h3 style={{margin: 0}} className='heading'>{update.title}</h3>
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
