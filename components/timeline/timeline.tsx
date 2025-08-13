"use client"

import { TimelineResponsive } from "./timeline-responsive"
import type { TimelineProps } from "@/types/timeline"

export function Timeline({ items, onItemSelect }: TimelineProps) {
  return <TimelineResponsive items={items} onItemSelect={onItemSelect} />
}
