import dayjs from 'dayjs'

export const formatDate = (dateString: string, template = 'MMM DD, YYYY') => {
    return dayjs(dateString).format(template)
}
