import React from 'react'
import utilsStyles from '@/styles/utils.module.css'
import ClickAway from './utils/click-away'
import CloseBtn from './close-btn'
import Image from 'next/image'

import { sortPortfolioByYearDescending } from '@/utils/helpers'

const PortfolioModal = ({ portfolio, portfolioModalState, setPortfolioModalState }) => {

  const closeModal = () => {
    setPortfolioModalState({
      portfolioType: '',
      isOpen: false
    })
  }

  const isVisualPortfolio = portfolioModalState.portfolioType === 'visual'

  sortPortfolioByYearDescending(portfolio)

  const linkToPortfolio = `https://uzomaorji.com/${isVisualPortfolio ? 'visual' : 'tech'}`

  const details = {
    visuals: {
      title: 'Visual Portfolio',
      description: 'A collection of my visual artworks over the years',
    },
    tech: {
      title: 'Tech Portfolio',
      description: 'A collection of experiments in art and technology'
    }
  }

  const currentModalDetails = isVisualPortfolio ? details.visuals : details.tech

  return (
    <ClickAway>
        <div className={utilsStyles.overlay}>
            <div className={utilsStyles.close}>
                <CloseBtn closeModalFunction={closeModal} />
            </div>
            <h2>{currentModalDetails.title}</h2>
            <p>{currentModalDetails.description}</p>
            <p>See in more detail at <a href={linkToPortfolio} target="_blank">{linkToPortfolio}</a></p>
            <br />
            <div>
              {
                portfolio.map(({ title, category, slug, year, dateCompleted, description, imagesCollection: images, imageCollection: imagesTech }) => 
                  <div id={title} className={utilsStyles['portfolio-list-item']}>
                    { images && <Image 
                                    src={images.items[0].url} 
                                    alt={images.items[0].title}
                                    width={200}
                                    height={150} 
                                /> 
                    }
                    { imagesTech && <Image 
                                    src={imagesTech.items[0].url} 
                                    alt={imagesTech.items[0].title}
                                    width={200}
                                    height={150} 
                                /> 
                    }
                    <div className={utilsStyles['portfolio-list-item-data']}>
                      <h4>{title}</h4>
                      <div className={utilsStyles['portfolio-list-metadata']}>
                        <p>{isVisualPortfolio ? `year: ${year}` : dateCompleted.split('-')[0]}</p>
                        <p>{isVisualPortfolio ? `category: ${category}` : description}</p>
                      </div>
                      <a href={`${linkToPortfolio}/${slug}`} target="_blank">see project</a>
                    </div>
                  </div>
                )
              }
            </div>
        </div>
    </ClickAway>
  )
}

export default PortfolioModal