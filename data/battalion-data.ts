import type { Battalion } from "@/types/battalion"
import { Building2, Landmark, Castle, Mountain } from "lucide-react"

export const battalions: Battalion[] = [
  {
    name: "גזרת העיר",
    link: "/pdf/city-sector-pakal.pdf",
    icon: Building2,
  },
  {
    name: "גזרת עוטף חברון",
    link: "/pdf/hebron-envelope-pakal.pdf",
    icon: Landmark,
  },
  {
    name: "גזרת מצדות יהודה",
    link: "/pdf/judah-fortresses-pakal.pdf",
    icon: Castle,
  },
  {
    name: "גזרת עותניאל",
    link: "/pdf/otniel-sector-pakal.pdf",
    icon: Mountain,
  },
]
