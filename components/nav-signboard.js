import signboardStyles from '@/styles/signboard.module.css'
import Link from 'next/link'

export default function NavSignboard() {
  return (
    <ul id={signboardStyles.signboard} className={signboardStyles.signboard}>
        <li className={signboardStyles.sign}>
            <a href="#enjoyment" id="enjoyment-sign">Enjoyment</a>
        </li>
        <li className={signboardStyles.sign}>
            <a href="#">Work</a>
        </li>
        <li className={signboardStyles.sign}>
            <a href="#">Fits</a>
        </li>
        <li className={signboardStyles.sign}>
            <a href="#">Dispatch</a>
        </li>
        <li className={signboardStyles.sign}>
            <a href="#">Peeps</a>
        </li>
    </ul>
  )
}
