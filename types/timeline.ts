export interface TimelineItem {
  id: number
  title: string
  fullTitle: string
  date: string
  content: string
  isHidden?: boolean
}

export interface TimelineProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}
