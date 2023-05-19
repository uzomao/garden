import utilStyles from '@/styles/utils.module.css'
import { parseRichText } from '@/utils/contentful'
import { useRouter } from 'next/router'
import CloseBtn from './close-btn'
import { formatDate } from '@/utils/helpers'

export default function ModalOverlay({ postContent, setModalState }) {
    const router = useRouter()

    let closeModal;
    if(setModalState){
        closeModal = () => {
            setModalState({isOpen: false, contentSlug: ''})
            router.push(`/`, undefined, { shallow: true })
        }
    }

    return (
        <div className={utilStyles.overlay}>
            <div className={utilStyles.close}>
                <CloseBtn closeModalFunction={closeModal} />
            </div>
            <h2>{postContent.title}</h2>
            <p>{formatDate(postContent.publishDate)}</p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: parseRichText(postContent.body.json) }} />
        </div>
    )
}
