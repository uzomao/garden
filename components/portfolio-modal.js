import React from 'react'
import utilsStyles from '@/styles/utils.module.css'
import ClickAway from './utils/click-away'
import CloseBtn from './close-btn'
import Image from 'next/image'

const PortfolioModal = ({ portfolio, setIsPortfolioModalOpen }) => {

  const closeModal = () => {
    setIsPortfolioModalOpen(false)
  }

  const sortPortfolioByYearDescending = (portfolio) => {
    return portfolio.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  const linkToPortfolio = "https://uzomaorji.com/visuals"

  return (
    <ClickAway>
        <div className={utilsStyles.overlay}>
            <div className={utilsStyles.close}>
                <CloseBtn closeModalFunction={closeModal} />
            </div>
            <h2>Visual Portfolio</h2>
            <p>A collection of my visual artworks over the years</p>
            <p>See in more detail at <a href={linkToPortfolio} target="_blank">https://uzomaorji.com/visuals</a></p>
            <br />
            <div>
              {
                portfolio.map(({ title, category, slug, year, imagesCollection: images }) => 
                  <div id={title} className={utilsStyles['portfolio-list-item']}>
                    { images && <Image 
                                    src={images.items[0].url} 
                                    alt={images.items[0].title}
                                    width={200}
                                    height={150} 
                                /> }
                    <div className={utilsStyles['portfolio-list-item-data']}>
                      <h4>{title}</h4>
                      <div className={utilsStyles['portfolio-list-metadata']}>
                        <p>year: {year}</p>
                        <p>category: {category}</p>
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