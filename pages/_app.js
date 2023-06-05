import '@/styles/globals.css'
import { createContext, useState } from "react";

export const AppStateContext = createContext();

export default function App({ Component, pageProps }) {
  
  const [ appState, setAppState ] = useState({ isBuildMode: false })

  return <AppStateContext.Provider value={{ appState, setAppState }}>
            <Component {...pageProps} />
          </AppStateContext.Provider>
}
