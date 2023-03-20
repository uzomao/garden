import utilStyles from '@/styles/utils.module.css'
import { parseRichText } from '@/utils/contentful'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ModalOverlay({ postContent, setModalState }) {
    const router = useRouter()

    return (
        <div className={utilStyles.overlay}>
            <div className={utilStyles.close}>
                {
                    setModalState ?
                        <small onClick={() => {
                            setModalState({isOpen: false, contentSlug: ''})
                            router.push(`/`, undefined, { shallow: true })
                        }} className={utilStyles.closeBtn}>close</small>
                        :
                        <Link href='/'>
                            <small className={utilStyles.closeBtn}>close</small>
                        </Link>
                }
            </div>
            <h2>{postContent.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: parseRichText(postContent.body.json) }} />
        </div>
    )
}
