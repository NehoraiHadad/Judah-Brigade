"use client"

import Image from "next/image"
import { CONTENT } from "@/data"

export function ImageGallerySection() {
  const { IMAGES } = CONTENT.IMAGE_GALLERY

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {IMAGES.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
