import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ja')
dayjs.extend(relativeTime)

export const fromNow = (date: Date) => {
  return dayjs(date).fromNow()
}

export const now = () => {
  return dayjs()
}
