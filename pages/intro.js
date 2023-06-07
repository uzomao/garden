import BuiltPage from "@/components/page-builder/built-page";
import Welcome from "@/components/interactions/welcome";

import { useState } from 'react'

export default function Intro () {

    const [ showWelcome, setShowWelcome ] = useState(true)

    return (
        <>
            <BuiltPage pageTitle='intro' />
            { showWelcome && <Welcome setShowWelcome={setShowWelcome} /> }
        </>
    )
}