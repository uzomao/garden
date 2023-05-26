import utilStyles from '@/styles/utils.module.css'
import { parseRichText } from '@/utils/contentful'
import CloseBtn from './close-btn'
import { formatDate } from '@/utils/helpers'
import Sharer from './sharer'
import Comment from './comment'
import Reactions from './reactions'
import { contentTypes } from '@/utils/helpers'

export default function ModalOverlay({ postContent, setModalState }) {

    let closeModal;
    if(setModalState){
        closeModal = () => {
            setModalState({isOpen: false, contentSlug: ''})
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
            
            <Reactions contentId={postContent.slug} />
            <Comment postContent={postContent} />
            <Sharer contentType={contentTypes.thoughts} slug={postContent.slug} />
        </div>
    )
}
