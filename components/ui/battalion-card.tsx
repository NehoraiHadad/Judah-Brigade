import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { BattalionCardProps } from "@/types/battalion"

export function BattalionCard({ battalion, index }: BattalionCardProps) {
  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-amber-300 bg-gradient-to-br from-white to-stone-50 hover:from-amber-50 hover:to-white transform hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col justify-between">
        <div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg sm:text-xl">{index + 1}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-teal-800 group-hover:text-teal-900 transition-colors">
            {battalion.name}
          </h3>
        </div>
        <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          לכניסה
        </Button>
      </CardContent>
    </Card>
  )
}
