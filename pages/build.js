// This is a copy of the index page with Build Mode enabled

import { useContext, useEffect } from 'react'
import { AppStateContext } from '@/pages/_app'

import Index from "@/pages/index"

export default function Build () {

    const { appState, setAppState } = useContext(AppStateContext);

    useEffect(() => {
        setAppState({ ...appState, isBuildMode: true })
        
      return () => {}
    }, [])

    return (
        <Index />
    )
}