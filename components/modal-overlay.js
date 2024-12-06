import utilStyles from '@/styles/utils.module.css'
import { parseRichText } from '@/utils/contentful'
import CloseBtn from './close-btn'
import { formatDate } from '@/utils/helpers'
import Sharer from './sharer'
import Comment from './comment'
import Reactions from './reactions'
import { contentTypes } from '@/utils/helpers'
import ClickAway from './utils/click-away'

import Image from 'next/image'

export default function ModalOverlay({ postContent, setModalState, contentType }) {
    console.log(postContent);
    

    let closeModal;
    if(setModalState){
        closeModal = () => {
            setModalState({isOpen: false, contentSlug: ''})
        }
    }

    const { slug, title, coverImage } = postContent

    return (
        <ClickAway>
            <div className={utilStyles.overlay}>
                <div className={utilStyles.close}>
                    <CloseBtn closeModalFunction={closeModal} />
                </div>
                {coverImage && <Image 
                        src={ coverImage.url } 
                        alt={ coverImage.fileName }
                        width={250} 
                        height={250}
                    />
                }
                <h2>{postContent.title}</h2>
                { contentType === contentTypes.updates && <p className={utilStyles.tag}>{postContent.tag}</p>}
                <p>{formatDate(postContent.date)}</p>
                <br />
                <div dangerouslySetInnerHTML={{ __html: parseRichText(postContent.body.json, postContent.body.links) }} className='text-content' />
                
                <Reactions contentId={slug} />
                <Comment slug={slug} title={title} />
                <Sharer contentType={!contentType ? contentTypes.thoughts : contentType} slug={slug} />
            </div>
        </ClickAway>
    )
}
