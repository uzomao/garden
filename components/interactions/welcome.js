import styles from '@/styles/interactions/welcome.module.css'
import utilStyles from '@/styles/utils.module.css'
import CloseBtn from '../close-btn'
import { AppStateContext } from "@/pages/_app"
import { useContext } from 'react'

export default function Welcome ({ setShowWelcome }) {

    const { setAppState } = useContext(AppStateContext)

    const submitForm = () => {
        const name = document.getElementById('name').value
        const currentVisitor = { name }
        if(name !== ''){
            window.localStorage.setItem('currentVisitor', JSON.stringify(currentVisitor))
            setAppState((prevState) => ({
                ...prevState,
                currentVisitor
            }));
            setShowWelcome(false)
        } else {
            alert('a name is a roadmap to destiny...')
        }
    }

    return (
        <div className={`${utilStyles.overlay} ${styles.container}`}>
            <CloseBtn closeModalFunction={setShowWelcome} />
            <h3>Welcome to the garden friend</h3>
            <p>Let's get to know each other</p>
            <br />
            <div className={styles['form-group']}>
                <p>What's your name</p>
                <input type="text" id="name" />
            </div>
            <p>Choose an avatar</p>
            <button onClick={() => submitForm()}>Let's go</button>
            {/* avatar */}
        </div>
    )
}