export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  image: string
}

export interface TimelineProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}
