interface TimelineArrowProps {
  direction: "horizontal-left" | "horizontal-right" | "vertical-down"
  className?: string
}

export function TimelineArrow({ direction, className = "" }: TimelineArrowProps) {
  const getArrowPath = () => {
    switch (direction) {
      case "horizontal-left":
        return "M0 9h72l-6-6v4h-66v4h66v4l6-6z"
      case "horizontal-right":
        return "M80 9h-72l6-6v4h66v4h-66v4l-6-6z"
      case "vertical-down":
        return "M9 0v32l-4-6h3v-26h2v26h3l-4 6v-32z"
      default:
        return ""
    }
  }

  const getViewBox = () => {
    return direction === "vertical-down" ? "0 0 20 40" : "0 0 80 20"
  }

  const getSize = () => {
    return direction === "vertical-down" ? { width: "20", height: "40" } : { width: "80", height: "20" }
  }

  const size = getSize()

  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox={getViewBox()}
      className={`text-gold-600 drop-shadow-lg ${className}`}
      fill="currentColor"
    >
      <path d={getArrowPath()} />
    </svg>
  )
}
