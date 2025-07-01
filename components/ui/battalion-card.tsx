import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { BattalionCardProps } from "@/types/battalion"

export function BattalionCard({ battalion, index }: BattalionCardProps) {
  const Icon = battalion.icon

  return (
    <Link
      href={battalion.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none"
    >
      <Card
        className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-amber-300 bg-gradient-to-br from-white to-stone-50 hover:from-amber-50 hover:to-white transform hover:-translate-y-2 animate-fade-in-up overflow-hidden"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col justify-center space-y-4">
          <div className="flex justify-center">
            <Icon 
              size={48} 
              strokeWidth={1.5} 
              className="text-teal-600 group-hover:text-amber-600 group-hover:scale-110 transition-all duration-300" 
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-teal-800 group-hover:text-teal-900 transition-colors leading-tight">
            {battalion.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
