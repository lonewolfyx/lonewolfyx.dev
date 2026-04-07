import dayjs from 'dayjs'

export function formatDate(dateString: string, template = 'MMM DD, YYYY') {
    return dayjs(dateString).format(template)
}
