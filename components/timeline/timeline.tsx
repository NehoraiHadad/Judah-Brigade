import { TimelineDesktop } from "./timeline-desktop"
import { TimelineTablet } from "./timeline-tablet"
import { TimelineMobile } from "./timeline-mobile"
import type { TimelineProps } from "@/types/timeline"

export function Timeline({ items, onItemSelect }: TimelineProps) {
  return (
    <>
      <TimelineDesktop items={items} onItemSelect={onItemSelect} />
      <TimelineTablet items={items} onItemSelect={onItemSelect} />
      <TimelineMobile items={items} onItemSelect={onItemSelect} />
    </>
  )
}
