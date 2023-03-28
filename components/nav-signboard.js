import signboardStyles from '@/styles/signboard.module.css'
import Link from 'next/link'

export default function NavSignboard() {
  return (
    <ul id={signboardStyles.signboard} className={signboardStyles.signboard}>
        <li className={signboardStyles.sign}>
            <Link href='/'>Learn</Link>
        </li>
        <li className={signboardStyles.sign}>
            <Link href='/'>Dream</Link>
        </li>
        <li className={signboardStyles.sign}>
            <Link href='/'>Rest</Link>
        </li>
        <li className={signboardStyles.sign}>
            <Link href='/'>Explore</Link>
        </li>
        <li className={signboardStyles.sign}>
            <Link href='/'>Dispatch</Link>
        </li>
    </ul>
  )
}
