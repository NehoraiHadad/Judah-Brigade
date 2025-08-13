"use client"

import { TimelineResponsive } from "./timeline-responsive"

export function Timeline({ onItemSelect }: { onItemSelect: (item: any) => void }) {
  return <TimelineResponsive onItemSelect={onItemSelect} />
}
