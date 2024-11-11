import Head from "next/head"
import Layout from "@/components/layout"

import { useState, useEffect, useContext, useRef } from 'react'

import IntroSpace from "@/pages/intro"
import CommunitySpace from "@/pages/community"
import ProjectsSpace from "@/pages/projects"
import UpdatesSpace from "@/pages/updates";

import NavIcons from "@/components/nav-icons";
import Info from "@/components/modals/info"
import ExpandedSky from "@/components/expanded-sky"

import { ImArrowRight, ImArrowLeft } from "react-icons/im";

import NavModal from "@/components/modals/nav-modal";

import { AppStateContext } from "@/pages/_app"

import Sky from "@/components/elements/sky"
import Clouds from "@/components/elements/clouds/clouds"

import { fetchSpaceContent, getContentFromSupabase, spaceKeys } from "@/data/fetchContent"
import { queryDatasources } from "@/utils/helpers"

export default function Home() {

  const [ expandSky, setExpandSky ] = useState(false)
  const [ showSignpost, setShowSignpost ] = useState(false)
  const [ showInfo, setShowInfo ] = useState(false)
  const [ playAudio, setPlayAudio ] = useState(false)

  const [ currentSpaceIndex, setCurrentSpaceIndex ] = useState(0)

  const [ showWelcome, setShowWelcome ] = useState(true)
  const [ spaceContent, setSpaceContent ] = useState({})

  const projectsContent = {projects: spaceContent.projects, portfolio: spaceContent.portfolio, projectUpdates: spaceContent.projectUpdates}
  const { updates, seeds } = spaceContent

  const [ cachedUpdateTitles, setCachedUpdateTitles ] = useState([])

  const _handleUpdatesCache = (updates) => {
    // Filter out updates that are already in the cache by title
    const newUpdates = updates.filter(update => !cachedUpdateTitles.includes(update.title));
    return [...spaceContent.projectUpdates, ...newUpdates];
  };

  const cacheProjectUpdates = (updates) => {
    setSpaceContent((prevContent) => ({
      ...prevContent,
      [spaceKeys.projectUpdates]: spaceKeys.projectUpdates in spaceContent
        ? _handleUpdatesCache(updates)
        : updates
    }));
  
    // Add only new update titles to cachedUpdateTitles
    const newTitles = updates
      .map(update => update.title)
      .filter(title => !cachedUpdateTitles.includes(title));
  
    setCachedUpdateTitles([...cachedUpdateTitles, ...newTitles]);
  };

  const filterBuiltPageContent = (pageTitle) => spaceContent.builtPage && spaceContent.builtPage.filter(({ page }) => page === pageTitle)

  const gardenSpaces = [
    {name: 'intro', component: <IntroSpace showWelcome={showWelcome} setShowWelcome={setShowWelcome} content={filterBuiltPageContent('intro')} />},
    {name: 'projects', component: <ProjectsSpace content={projectsContent} cacheProjectUpdates={cacheProjectUpdates} />, spaceTitle: 'Projects'}, 
    {name: 'updates', component: <UpdatesSpace content={updates} />, spaceTitle: 'Updates'},
    {name: 'community', component: <CommunitySpace content={seeds} />, spaceTitle: 'Community'},
  ]

  const layoutContainerWidth = 100

  const renderNavArrows = () => {
    // TODO: change url with space changes
    const prev = <button onClick={() => setCurrentSpaceIndex(currentSpaceIndex - 1)}><ImArrowLeft /></button>
    const next = <button onClick={() => setCurrentSpaceIndex(currentSpaceIndex + 1)}><ImArrowRight /></button>

    const margin = 1
    const style = {
      display: 'flex',
      justifyContent: currentSpaceIndex > 0 && currentSpaceIndex < gardenSpaces.length ? 'space-between' : 'flex-end',
      position: 'absolute',
      margin: `0 ${margin}%`,
      width: `${layoutContainerWidth - (margin*2)}%`,
      top: '50%',
      // zIndex: '9999'
    }

    if(currentSpaceIndex === 0){ return <div style={style}>{next}</div> }
    else if(currentSpaceIndex === gardenSpaces.length -1 ){ return <div style={style}>{prev}</div> }
    else return <div style={style}>{prev}{next}</div>
  }

  const { setAppState } = useContext(AppStateContext)

  useEffect(() => {
    const currentVisitor = JSON.parse(window.localStorage.getItem('currentVisitor'))
    
    //Set the current visitor in app-wide state on component mount
    if(currentVisitor){
      setAppState((prevState) => ({
        ...prevState,
        currentVisitor
      }));
    } else {
      setShowWelcome(true)
    }

    return () => {}
  }, [])

  // Effect for mobile responsiveness
  useEffect(() => {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;

      if (isMobile && isPortrait) {
        alert('Hey! You may enjoy the garden more if you rotate your phone and refresh');
      }
  }, []);

  const audioRef = useRef(null)
  // Initialize audio element on mount
  useEffect(() => {
    audioRef.current = new Audio('/sounds/garden.mov');
    audioRef.current.loop = true; // Set audio to loop
  }, []);

  // Play or pause the sound when `isPlaying` state changes
  useEffect(() => {
    if (audioRef.current) {
      if (playAudio) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playAudio]);

  const fetchData = async (spaceKey, dataSource) => {
    try {
      const content = await fetchSpaceContent(spaceKey, dataSource);
      setSpaceContent((prevContent) => ({
        ...prevContent,
        [spaceKey]: content, // Add new content under the specified spaceKey
      }));
    } catch (error) {
      console.error("Failed to fetch project space content:", error);
    }
  };

  const fetchSupabaseData = async (spaceKey, tableName) => {
    try {
      const data = await getContentFromSupabase(tableName);
      setSpaceContent((prevContent) => ({
        ...prevContent,
        [spaceKey]: data,
      }));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    }
  };

  useEffect(() => {
    // Fetch data needed across all garden spaces
    fetchData(spaceKeys.projects);
    fetchData(spaceKeys.portfolio, queryDatasources.portfolioContentful)
    fetchData(spaceKeys.thoughts)
    fetchData(spaceKeys.updates)

    // Args: key for content object and name of table on Supabase
    fetchSupabaseData(spaceKeys.seeds, 'thoughts')
    // fetch data for all built pages i.e pages being dynamically constructed from database data (e.g current intro page)
    fetchSupabaseData('builtPage', 'page builder')
  }, [])

  const currentSpace = gardenSpaces[currentSpaceIndex]

  return (
    <>
    {/* TODO: Create Head/SEO component */}
      <Head>
        <title>uzomas.garden</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌻</text></svg>"></link>
      </Head>
      <Layout containerWidth={layoutContainerWidth}>
        { currentSpace.spaceTitle && 
          <h1 style={{color: 'white', width: '100%', textAlign: 'center', position: 'absolute'}}>{currentSpace.spaceTitle}</h1>
        }

        <>
          <Sky>
            <Clouds numClouds={3} content={spaceContent.thoughts} />
          </Sky>
          {/* CRITICAL: Use the gardenSpaces array above to render the garden space currently shown */}
          {/* TODO: Wrap this in a single Ground component to avoid using this component across spaces */}
          { currentSpace.component }
        </>

        <NavIcons expandSky={expandSky} setExpandSky={setExpandSky} 
          showSignpost={showSignpost} setShowSignpost={setShowSignpost}
          showInfo={showInfo} setShowInfo={setShowInfo}
          playAudio={playAudio} setPlayAudio={setPlayAudio}
        />
        { 
          showSignpost && 
            <NavModal 
              gardenSpaces={gardenSpaces}
              currentSpaceIndex={currentSpaceIndex}
              setCurrentSpaceIndex={setCurrentSpaceIndex}
              setShowSignpost={setShowSignpost}
            />
        }
        {
          showInfo && <Info closeFn={setShowInfo} />
        }
        { renderNavArrows() }
        {expandSky &&
          <ExpandedSky
            content={{thoughts: spaceContent.thoughts, projects: spaceContent.projects, updates: updates}}
          />
        }
      </Layout>
    </>
  )
}
