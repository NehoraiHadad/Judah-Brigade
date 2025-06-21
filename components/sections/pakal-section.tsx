import { SectionTitle } from "@/components/ui/section-title"
import { BattalionCard } from "@/components/ui/battalion-card"
import { battalions } from "@/data/battalion-data"

const CONTENT = {
  PAKAL: {
    TITLE: 'מה זה פק"ל שקשוקה?',
    DESCRIPTION:
      'פק"ל שקשוקה הוא המערך החינוכי המיוחד של החטיבה, שמחבר בין הלוחמים לבין ההיסטוריה והמורשת של עם ישראל באזור יהודה ושומרון. כאן תמצאו חומרים, סיפורים ופעילויות שיעשירו את הידע שלכם.',
  },
}

export function PakalSection() {
  return (
    <section id="pakal" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
          <SectionTitle className="text-teal-800">{CONTENT.PAKAL.TITLE}</SectionTitle>
          <p className="text-lg sm:text-xl lg:text-2xl text-teal-600 max-w-4xl mx-auto leading-relaxed font-medium text-center">
            {CONTENT.PAKAL.DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {battalions.map((battalion, index) => (
            <BattalionCard key={index} battalion={battalion} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
