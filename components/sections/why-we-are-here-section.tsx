import Image from "next/image"

const IMAGES = {
  WHY_WE_ARE_HERE_BACKGROUND: "/placeholder.svg?height=800&width=1200",
}

const CONTENT = {
  WHY_WE_ARE_HERE: {
    TITLE: "למה אנחנו כאן?",
    PARAGRAPHS: [
      "אנחנו כאן בגלל אברהם אבינו שהלך לפי קול ה' אל הארץ אשר יראנו, ובחר דווקא בחברון כמקום מגוריו.",
      "אנחנו כאן בגלל דוד המלך שמלך בחברון שבע שנים ושם הניח את היסודות לממלכת ישראל הגדולה.",
      "אנחנו כאן בגלל אלפי השנים של חיבור עמוק בין עם ישראל לבין האדמה הזאת, המורשת הזאת, הזהות הזאת.",
      "אנחנו כאן כי זה הבית שלנו, וזו האחריות שלנו לשמור עליו ולהעביר אותו לדורות הבאים.",
    ],
  },
}

export function WhyWeAreHereSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-teal-800 to-teal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={IMAGES.WHY_WE_ARE_HERE_BACKGROUND || "/placeholder.svg"}
          alt="נוף מדבר יהודה"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-amber-100">{CONTENT.WHY_WE_ARE_HERE.TITLE}</h2>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-right">
          {CONTENT.WHY_WE_ARE_HERE.PARAGRAPHS.map((paragraph, index) => (
            <p
              key={index}
              className={`opacity-90 hover:opacity-100 transition-opacity duration-500 ${
                index === CONTENT.WHY_WE_ARE_HERE.PARAGRAPHS.length - 1 ? "text-amber-200 font-semibold" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
