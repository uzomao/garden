import signboardStyles from '@/styles/signboard.module.css'
import Link from 'next/link'

export default function NavSignboard() {
  return (
    <ul id={signboardStyles.signboard} class={signboardStyles.signboard}>
        <li class={signboardStyles.sign}>
            <a href="#enjoyment" id="enjoyment-sign">Enjoyment</a>
        </li>
        <li class={signboardStyles.sign}>
            <a href="#">Work</a>
        </li>
        <li class={signboardStyles.sign}>
            <a href="#">Fits</a>
        </li>
        <li class={signboardStyles.sign}>
            <a href="#">Dispatch</a>
        </li>
        <li class={signboardStyles.sign}>
            <a href="#">Peeps</a>
        </li>
    </ul>
  )
}
