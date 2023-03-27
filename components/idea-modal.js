import utilsStyles from '@/styles/utils.module.css'
import CloseBtn from './close-btn'

export default function IdeaModal({ idea, setIsIdeaModalOpen, modalCoords, ideaImgDimensions, topPosition }) {
    const { title, status, date } = idea
    const { x } = modalCoords
    const closeModal = () => {
        setIsIdeaModalOpen(false)
    }
  return (
    <div className={`${utilsStyles.overlay} ${utilsStyles.ideaoverlay} text-center`} style={{ left: `${x + ideaImgDimensions}px`, top: topPosition }}>
        <CloseBtn closeModalFunction={closeModal} />
        <h4>{title}</h4>
        <div className="flex-horizontal space-between">
            <p>{status}</p>
            <p>{date}</p>
        </div>
    </div>
  )
}
