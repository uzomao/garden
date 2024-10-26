import '@/styles/globals.css'
import '@/styles/utils.scss'
import { createContext, useState } from "react";

export const AppStateContext = createContext();

export default function App({ Component, pageProps }) {
  
  const [ appState, setAppState ] = useState({ 
    isBuildMode: false,
    currentVisitor: null
  })

  return <AppStateContext.Provider value={{ appState, setAppState }}>
            <Component {...pageProps} />
          </AppStateContext.Provider>
}
