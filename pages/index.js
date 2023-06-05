import Head from "next/head"
import Layout from "@/components/layout"

import { useState } from 'react'

import IntroSpace from "@/pages/intro"
import MainSpace from "@/pages/main"
import DreamSpace from "@/pages/dream"
import UpdatesSpace from "@/pages/updates";

import NavIcons from "@/components/nav-icons";

import NavSignboard from "@/components/nav-signboard";

export default function Home() {

  const [ expandSky, setExpandSky ] = useState(false)
  const [ showSignpost, setShowSignpost ] = useState(false)

  // TODO: Don't just use main, check for the current id from the url
  const [ currentSpaceIndex, setCurrentSpaceIndex ] = useState(0)

  const gardenSpaces = [
    {name: 'intro', component: <IntroSpace/>},
    {name: 'main', component: <MainSpace expandSky={expandSky}/>}, 
    {name: 'updates', component: <UpdatesSpace/>},
    {name: 'dream', component: <DreamSpace/>}
  ]

  const layoutContainerWidth = 125

  const renderNavSigns = () => {
    const prev = <button onClick={() => setCurrentSpaceIndex(currentSpaceIndex - 1)}>Go to previous space</button>
    const next = <button onClick={() => setCurrentSpaceIndex(currentSpaceIndex + 1)}>Go to next space</button>

    const style = {
      display: 'flex',
      justifyContent: currentSpaceIndex > 0 && currentSpaceIndex < gardenSpaces.length ? 'space-between' : 'flex-end',
      position: 'absolute',
      width: `${layoutContainerWidth}%`,
      top: '50%',
      zIndex: '9999'
    }

    if(currentSpaceIndex === 0){ return <div style={style}>{next}</div> }
    else if(currentSpaceIndex === gardenSpaces.length -1 ){ return <div style={style}>{prev}</div> }
    else return <div style={style}>{prev}{next}</div>
  }

  return (
    <>
      <Head>
        <title>uzomas.garden</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout containerWidth={layoutContainerWidth}>
        { gardenSpaces[currentSpaceIndex].component }
        <NavIcons expandSky={expandSky} setExpandSky={setExpandSky} 
          showSignpost={showSignpost} setShowSignpost={setShowSignpost}
        />
        { 
          showSignpost && 
            <NavSignboard 
              gardenSpaces={gardenSpaces}
              currentSpaceIndex={currentSpaceIndex}
              setCurrentSpaceIndex={setCurrentSpaceIndex}
              setShowSignpost={setShowSignpost}
            />
        }
        { renderNavSigns() }
      </Layout>
    </>
  )
}
