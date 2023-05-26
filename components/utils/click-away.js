import { useRouter } from "next/router"

export default function ClickAway ({ children, setModalOpenFn }) {

    const router = useRouter()

    const homeElements = ['sky', 'ground']

    const clickAway = () => {
        if(setModalOpenFn){
            console.log('hi')
            setModalOpenFn(false)
        } else {
            router.push('/')
        }
    }

    return (
        <span onClick={(e) => { homeElements.includes(e.target.id) && clickAway() }}>
            { children }
        </span>
    )
}