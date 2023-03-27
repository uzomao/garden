import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'

export default function CloseBtn({ closeModalFunction }) {

  return (
    <div className={utilStyles.close}>
        {
            closeModalFunction ?
                <small onClick={() => {
                    closeModalFunction()
                }} className={utilStyles.closeBtn}>close</small>
                :
                <Link href='/'>
                    <small className={utilStyles.closeBtn}>close</small>
                </Link>
        }
    </div>
  )
}
