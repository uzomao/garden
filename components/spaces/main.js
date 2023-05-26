import Sky from "../elements/sky"
import Ground from "../elements/ground"

import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { useState, useEffect } from "react"
import styles from '@/styles/Home.module.css'
import Image from "next/image"
import defaultImg from '@/public/images/default.jpg'
import ModalOverlay from '@/components/modal-overlay'
import IdeaModal from "@/components/idea-modal"
import ExpandedSky from "../expanded-sky"

import { formatDate, contentTypes } from '@/utils/helpers.js'

export default function MainSpace({ expandSky }) {

  const [thoughts, setThoughts] = useState(null)
  const [ideas, setIdeas] = useState(null)

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
    fetchGraphQL(`{ ${queries.thoughts}, ${queries.ideas} }`)
      .then((content) => {
        const data = content.data
        setThoughts(data.blogPostCollection.items)
        setIdeas(data.ideaCollection.items)
      })
      return () => {}
  }, [])

  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false)
  const [ ideaindex, setIdeaIndex ] = useState(0)

  const cloudTopPositions = [10,20,30,40,50,60,70]

  const ideaImgDimensions = 150
  const ideaContainerWidth = 33.3

  const cloud = 'cloud'
  
  return (
    <>
        <Sky>
            {
              thoughts && thoughts.map(({slug, title}, index) => 
                  <div className={styles.cloud} key={slug} style={{
                      animationDelay: `${index*10}s`,
                      top: `${cloudTopPositions[Math.floor(Math.random()*cloudTopPositions.length)]}px`
                    }} onClick={() => {
                      changeModalState(true, slug)
                    }}>
                    <h3 className={styles.title}>{title}</h3>
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
                    const { title, imagesCollection, date } = idea
                    const image = imagesCollection.items[0]
                    return <div key={index} className={styles.idea} style={{width: `${ideaContainerWidth}%`}}>
                    <Image 
                        src={ image ? image.url : defaultImg } 
                        alt={ image ? image.fileName : "default image" }
                        width={ideaImgDimensions} 
                        height={ideaImgDimensions} 
                        
                        onClick={ (e) => { 
                          changeTooltip(true, { x: e.target.x, y: e.target.y }) 
                          setCurrentIdea(idea)
                          setIdeaIndex(index)
                        }}
                    />
                    <p>{title}</p>
                    <small>{formatDate(date)}</small>
                    </div>
                })
                }
            </div>
            
        </Ground>

        { modalState.isOpen && 
            <ModalOverlay 
                postContent={thoughts.filter(({ slug }) => slug === modalState.contentSlug)[0]} 
                setModalState={setModalState}
            /> 
        }
        {
            tooltip.isOpen &&
                // TODO: Create a component for this
                <div style={{ top: `${tooltip.coords.y - (ideaImgDimensions/2)}px`, left: `${tooltip.coords.x + ideaImgDimensions}px` }} 
                    className={`${styles.tooltip} text-center`}
                >
                <h4>{currentIdea.title}</h4>
                <div className="flex-horizontal space-between">
                    <p>{currentIdea.status}</p>
                    <p>{formatDate(currentIdea.date)}</p>
                </div>
                <p style={{maxHeight: '100px', overflowY: 'scroll'}}>{currentIdea.description}</p>
                <div className="flex-horizontal center">
                    <button className="default-border-radius" onClick={ () => {
                    changeTooltip(false, { x: tooltip.coords.x, y: tooltip.coords.y })
                    setIsIdeaModalOpen(true)
                    }}>Delve deeper</button>
                </div>
            </div>
        }
        { isIdeaModalOpen && 
            <IdeaModal 
                positionModalInGarden={!expandSky ? true : false}
                idea={currentIdea} 
                setIsIdeaModalOpen={setIsIdeaModalOpen} 
                modalCoords={tooltip.coords}
                ideaImgDimensions={ideaImgDimensions}
                topPosition={`${(Math.floor(ideaindex/(Math.floor(100/ideaContainerWidth)))) * 200}px`}
            /> 
        }
        { expandSky && 
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
