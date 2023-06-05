import { useContext, useEffect } from 'react'
import { AppStateContext } from "@/pages/_app"

export default function Build () {

    const context = useContext(AppStateContext);
    const { appState, setAppState } = context
    const { isBuildMode } = appState

    const toggleBuildMode = () => {
        const newAppState = { ...appState, isBuildMode: !isBuildMode }
        setAppState(newAppState)
        window.sessionStorage.setItem('appState', JSON.stringify(newAppState))
    }

    useEffect(() => {
        const ssIsBuildMode = JSON.parse(window.sessionStorage.getItem('appState')).isBuildMode
        ssIsBuildMode && setIsBuildMode(ssIsBuildMode)
    
      return () => {}
    }, [third])
    

    return (
        <main style={{padding: '1rem'}}>
            <h1>Toggle Build Mode</h1>

            <div>
                <p>Build Mode is: <span>{ isBuildMode ? 'on' : 'off' }</span></p>
            </div>

            <button onClick={() => toggleBuildMode()}>toggle build mode</button>
        </main>
    )
}