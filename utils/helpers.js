import { format, parseISO } from 'date-fns'

const formatDate = (date) => {
    return format(parseISO(date), 'LLLL do, yyyy')
}

const contentTypes = {
    thoughts: 'thoughts',
    ideas: 'ideas',
    updates: 'updates'
}

/* 
* Hardcoded dimensions based on my laptop screen
* TODO: Find a way to not have this be hardcoded
*/
const defaultPageWidth = 1366
const defaultPageHeight = 689

// A function to scale element sizes and positions relative to screen size
// Can be used for both positioning and sizing
const getResponsiveDimensions = (elementWidth, screenWidth, elementHeight, screenHeight) => {
    let formattedElementWidth;
    let formattedElementHeight;
    if(typeof(elementWidth) === 'string'){
        formattedElementWidth = Number(elementWidth.split('px')[0])
    } else {
        formattedElementWidth = elementWidth
    }

    if(typeof(elementHeight) === 'string'){
        formattedElementHeight = Number(elementHeight.split('px')[0])
    } else {
        formattedElementHeight = elementHeight
    }

    const responsiveWidth = (screenWidth * formattedElementWidth) / defaultPageWidth
    const responsiveHeight = (screenHeight * formattedElementHeight) / defaultPageHeight

    return [ responsiveWidth, responsiveHeight ]
}

const queryDatasources = {
    gardenContentful: 'GARDEN',
    portfolioContentful: 'PORTFOLIO'
}

export { formatDate, contentTypes, getResponsiveDimensions, queryDatasources }