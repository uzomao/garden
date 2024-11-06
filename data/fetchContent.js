import { fetchGraphQL } from "@/utils/contentful"
import { queries } from '@/utils/query'
import { supabase } from '@/utils/supabase'

// Because space key variable names are also used in index.js, I'm placing them in this array variable to ensure consistency
const spaceKeys = {
    projects: 'projects',
    portfolio: 'portfolio',
    thoughts: 'thoughts',
    updates: 'updates',
    seeds: 'seeds',
    projectUpdates: 'projectUpdates'
}

const mapQueriesToSpace = {
    [spaceKeys.projects]: `{ ${queries.ideas}, ${queries.getParentIdea} }`,
    [spaceKeys.portfolio]: `{ ${queries.portfolioVisuals}, ${queries.portfolioTech} }`,
    [spaceKeys.thoughts]: `{ ${queries.thoughts} }`,
    [spaceKeys.updates]: `{ ${queries.updates} }`,
}


const fetchSpaceContent = async (spaceKey, dataSource) => {
    const content = !dataSource ? 
                        await fetchGraphQL(mapQueriesToSpace[spaceKey]) : 
                        await fetchGraphQL(mapQueriesToSpace[spaceKey], {}, dataSource)
    return content.data
}

const getContentFromSupabase = async (tableName) => {
    let { data, error } = await supabase
    .from(tableName)
    .select('*')
    if(error){console.log(error)}
    else {
        return data
    }
}

export { fetchSpaceContent, getContentFromSupabase, spaceKeys }