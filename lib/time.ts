export type ReadableTimeDiff =
  | 'Today'
  | 'Yesterday'
  | 'This Week'
  | 'Last Week'
  | 'Last 30 days'
  | 'Older'

export const timeSince = (timestamp: number): ReadableTimeDiff => {
  const msDiff = new Date().valueOf() - timestamp
  if (msDiff < 1000 * 60 * 60 * 24) {
    return 'Today'
  } else if (msDiff < 1000 * 60 * 60 * 24 * 2) {
    return 'Yesterday'
  } else if (msDiff < 1000 * 60 * 60 * 24 * 7) {
    return 'This Week'
  } else if (msDiff < 1000 * 60 * 60 * 24 * 14) {
    return 'Last Week'
  } else if (msDiff < 1000 * 60 * 60 * 24 * 30) {
    return 'Last 30 days'
  }
  return 'Older'
}
