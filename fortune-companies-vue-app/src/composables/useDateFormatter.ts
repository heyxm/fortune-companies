import parseDate from 'date-fns/parse'
import format from 'date-fns/format'

export function useDateFormatter() {
  const formatDate = (
    value: string,
    dateFormat: string = 'DD MMM YYYY hh:mm aa',
  ) => {
    const date = parseDate(value)
    return format(date, dateFormat) + ' ' + '(GMT' + format(date, 'Z') + ')'
  }

  return { formatDate }
}
