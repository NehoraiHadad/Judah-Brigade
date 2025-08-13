"use client"

import { KeywordsBand } from "@/components/ui/keywords-band"
import { CONTENT } from "@/data"

export function ValuesBandSection() {
  return (
    <section aria-label="ערכי החטיבה">
      <KeywordsBand
        topLine={CONTENT.VALUES_BAND.TOP_LINE}
        bottomLine={CONTENT.VALUES_BAND.BOTTOM_LINE}
      />
    </section>
  )
}


