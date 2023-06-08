import BuiltPage from "@/components/page-builder/built-page";
import Welcome from "@/components/interactions/welcome";
import Clouds from "@/components/elements/clouds"

export default function Intro ({ showWelcome, setShowWelcome }) {

    return (
        <>
            <BuiltPage pageTitle='intro' />
            { showWelcome && <Welcome setShowWelcome={setShowWelcome} /> }
            <Clouds numClouds={3} />
        </>
    )
}