import type { LucideIcon } from "lucide-react"

export interface Battalion {
  name: string
  link: string
  icon: LucideIcon
}

export interface BattalionCardProps {
  battalion: Battalion
  index: number
}
