export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  image: string
  isHidden?: boolean
}

export interface TimelineProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}
