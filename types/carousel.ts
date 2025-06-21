export interface CarouselProps {
  images: string[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onIndexChange: (index: number) => void
}
