import Sky from "@/components/elements/sky"
import Ground from "@/components/elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"
import styles from '@/styles/Home.module.css'
import ModalOverlay from '@/components/modal-overlay'
import IdeaModal from "@/components/idea-modal"
import ExpandedSky from "@/components/expanded-sky"

import { formatDate } from '@/utils/helpers.js'
import { cloudTopPositions } from "@/components/elements/clouds"

import CloseBtn from "@/components/close-btn"

import { differenceInMonths, parseJSON } from 'date-fns'

export default function MainSpace({ expandSky }) {

  const [thoughts, setThoughts] = useState(null)
  const [ideas, setIdeas] = useState(null)
  const [ideaUpdates, setIdeaUpdates] = useState(null)

  const [modalState, setModalState] = useState({
    isOpen: false,
    contentSlug: ''
  })

  const changeModalState = (isOpen, slug) => setModalState({ isOpen, contentSlug: slug })

  const [tooltip, setTooltip] = useState({
    isOpen: false,
    coords: {
      x: 0,
      y: 0
    }
  })

  const changeTooltip = (isOpen, coords) => setTooltip({ isOpen, coords })

  const [currentIdea, setCurrentIdea] = useState(null)

  useEffect(() => {
    fetchGraphQL(`{ ${queries.thoughts}, ${queries.ideas}, ${queries.getParentIdea} }`)
      .then((content) => {
        const data = content.data
        setThoughts(data.blogPostCollection.items)
        setIdeas(data.ideaCollection.items)
        setIdeaUpdates(data.ideaUpdateCollection.items)
      })
    return () => { }
  }, [])

  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false)
  const [ideaindex, setIdeaIndex] = useState(0)

  const ideaImgDimensions = 150
  const ideaContainerWidth = 33.3

  const plants = {
    seedling: '🌱',
    mature: '🌳'
  }

  // Generate emoji plants based on the number of updates an idea has
  const generatePlants = (ideaId, plant) => {
    // Get all updates pertaining to an idea
    const updates = ideaUpdates.filter((update) => update.idea.sys.id === ideaId)
    // How many (real) months does it take a seedling to grow into a plant in the garden?
    const maturityPeriod = 1
    if(updates.length > 0){
      // TODO: Determine plant type by how time since the update was created
      const monthsDiff = differenceInMonths(new Date(), parseJSON(updates[0].date))
      return <>
              <span role="img" aria-label="plant emoji" style={{fontSize: '48px'}}>{monthsDiff > maturityPeriod ? plant : plants.seedling}</span>
              <span role="img" aria-label="plant emoji" style={{fontSize: '48px'}}>{monthsDiff > maturityPeriod ? plant : plants.seedling}</span>
              <span role="img" aria-label="plant emoji" style={{fontSize: '48px'}}>{monthsDiff > maturityPeriod ? plant : plants.seedling}</span>
            </>
    }
  }

  const oddRow = 'odd-row'
  const evenRow = 'even-row'

  const getAlignment = (rowType, index) => {
    if(rowType === evenRow){
      if(index % 3 === 0){
        return `flex-end`
      } else if((index-2) % 3 === 0){
        return `flex-start`
      } else {
        return `center`
      }
    } else {
      return `center`
    }
  }

  return (
    <>
      <Sky>
        {
          thoughts && thoughts.map(({ slug, title }, index) =>
            <div className={styles.cloud} key={slug} style={{
              animationDelay: `${index * 10}s`,
              top: `${cloudTopPositions[Math.floor(Math.random() * cloudTopPositions.length)]}px`
            }} onClick={() => {
              changeModalState(true, slug)
            }}>
              <h3 className={styles.title}>{title} <span><br /><small>*click me*</small></span></h3>
              {/* TODO: Get rid of click me text */}
            </div>
          )
        }
      </Sky>
      <Ground>
        <div className={styles.ideas}>
          {/* <div className={`${styles.idea} ${styles.signboardcontainer}`} style={{width: `${ideaContainerWidth}%`}}>
                <NavSignboard />
                </div> */}
          {
            ideas && ideas.map((idea, index) => {
              const { title, imagesCollection, date, sys, plant } = idea
              // determine the row number (columns of 3):
              const rowNum = Math.ceil((index+1)/3)
              const rowType = rowNum % 2 === 0 ? evenRow : oddRow
              return <div key={index} className={`${styles.idea} ${rowType}`} style={{ width: `${ideaContainerWidth}%`, alignItems: getAlignment(rowType, index)}}>
                <div className={styles.soil}
                  onClick={(e) => {
                    changeTooltip(true, { x: e.target.offsetLeft, y: e.target.offsetTop })
                    setCurrentIdea(idea)
                    setIdeaIndex(index)
                  }}
                  style={{
                    height: `${ideaImgDimensions}px`,
                    marginTop: (index+2) % 3 === 0 ? `5em` : '0'
                  }}
                >
                  {generatePlants(sys.id, plant)}
                </div>
                <p>{title}</p>
                <small>{formatDate(date)}</small>
              </div>
            })
          }
        </div>

      </Ground>

      {modalState.isOpen &&
        <ModalOverlay
          postContent={thoughts.filter(({ slug }) => slug === modalState.contentSlug)[0]}
          setModalState={setModalState}
        />
      }
      {
        tooltip && tooltip.isOpen &&
        // TODO: Create a component for this
        <div style={{ top: `${tooltip.coords.y}px`, left: `${tooltip.coords.x + ideaImgDimensions}px` }}
          className={`${styles.tooltip} text-center`}
        >
          <CloseBtn closeModalFunction={setTooltip} />
          <h4>{currentIdea.title}</h4>
          <div className="flex-horizontal space-between">
            <p>{currentIdea.status}</p>
            <p>{formatDate(currentIdea.date)}</p>
          </div>
          <p style={{ maxHeight: '100px', overflowY: 'scroll' }}>{currentIdea.description}</p>
          <div className="flex-horizontal center">
            <button className="default-border-radius" onClick={() => {
              changeTooltip(false, { x: tooltip.coords.x, y: tooltip.coords.y })
              setIsIdeaModalOpen(true)
            }}>Delve deeper</button>
          </div>
        </div>
      }
      {isIdeaModalOpen &&
        <IdeaModal
          positionModalInGarden={!expandSky ? true : false}
          idea={currentIdea}
          setIsIdeaModalOpen={setIsIdeaModalOpen}
          modalCoords={tooltip.coords}
          ideaImgDimensions={ideaImgDimensions}
          topPosition={`${(Math.floor(ideaindex / (Math.floor(100 / ideaContainerWidth)))) * 200}px`}
        />
      }
      {expandSky &&
        <ExpandedSky
          thoughts={thoughts}
          ideas={ideas}
          changeModalState={changeModalState}
          setIsIdeaModalOpen={setIsIdeaModalOpen}
          setCurrentIdea={setCurrentIdea}
        />
      }
    </>
  )
}
