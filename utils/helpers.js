import { format, parseISO } from 'date-fns'

const formatDate = (date) => {
    return format(parseISO(date), 'LLLL do, yyyy')
}

const contentTypes = {
    thoughts: 'thoughts',
    ideas: 'ideas'
}

export { formatDate, contentTypes }