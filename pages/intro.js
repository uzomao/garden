import React from 'react'
import BuiltPage from '@/components/page-builder/built-page'
import Welcome from "@/components/interactions/welcome";
import Clouds from "@/components/elements/clouds/clouds"

const Intro = ({ showWelcome, setShowWelcome, content }) => {
  return (
    <>
        <BuiltPage pageTitle={'intro'} content={content} />
        { showWelcome && <Welcome setShowWelcome={setShowWelcome} /> }
        <Clouds numClouds={3} />
    </>
  )
}

export default Intro