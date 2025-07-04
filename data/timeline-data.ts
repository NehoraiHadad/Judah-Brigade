import type { TimelineItem } from "@/types/timeline"
import { TIMELINE_IMAGES } from "@/constants/images"

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "אברהם אבינו",
    date: 'המאה ה-18 לפנה"ס',
    content:
      "אברהם אבינו קונה את מערת המכפלה. 'ויקם השדה ומערת המכפלה אשר בו לאברהם לאחזת קבר מאת בני חת.' זהו תחילת הקשר הנצחי בין עם ישראל לארץ ישראל.",
    image: TIMELINE_IMAGES.ABRAHAM,
  },
  {
    id: 2,
    title: "כלב ועכסה",
    date: 'המאה ה-13 לפנה"ס',
    content:
      "כלב בן יפונה מקבל את חברון לנחלה. עכסה בתו מבקשת מאביה 'גלות מים' - מעיינות המים הדרושים להתיישבות באזור הקשה הזה.",
    image: TIMELINE_IMAGES.CALEB,
  },
  {
    id: 3,
    title: "דוד המלך",
    date: 'סביב 1000 לפנה"ס',
    content:
      "ראשית מלכות דוד בחברון. 'בחברון מלך על יהודה שבע שנים ושישה חדשים ובירושלים מלך שלושים ושלוש שנים על כל ישראל ויהודה.'",
    image: TIMELINE_IMAGES.DAVID,
  },
  {
    id: 4,
    title: "בית שני",
    date: 'המאה ה-5 לפנה"ס עד 70 לספירה',
    content:
      "ימי בית שני - שיבת ציון, בניית המבנה מעל המערה וחורבן חברון. הורדוס בונה את המבנה המרשים מעל מערת המכפלה שעומד עד היום.",
    image: TIMELINE_IMAGES.SECOND_TEMPLE,
  },
  {
    id: 5,
    title: "מרד בר כוכבא",
    date: "132-324 לספירה",
    content:
      "מרד בר כוכבא והתקופה הרומית המאוחרת. עם קטן מורד בעוצמה ובנחישות באימפריה הגדולה והחזקה בעולם - האימפריה הרומית.",
    image: TIMELINE_IMAGES.BAR_KOKHBA,
  },
  {
    id: 6,
    title: "ימי המשנה",
    date: "324-638 לספירה",
    content:
      "ימי המשנה והתלמוד - התקופה הביזנטית. קהילות יהודיות איתנות בדרום הר חברון עם בתי כנסת מפוארים ומסורות עשירות.",
    image: TIMELINE_IMAGES.MISHNAH,
  },
  {
    id: 7,
    title: "התקופה המוסלמית",
    date: "638-1099 לספירה",
    content:
      "התקופה המוסלמית הקדומה. היישוב היהודי ממשיך להתקיים בתחילה, אך עם הזמן הולך ודועך. השמות המקראיים נשמרים בפי הערבים.",
    image: TIMELINE_IMAGES.MUSLIM,
  },
  {
    id: 8,
    title: "התקופה הצלבנית",
    date: "1099-1260 לספירה",
    content:
      "התקופה הצלבנית. הצלבנים בונים כנסייה במערת המכפלה ומצודה צמודה למבנה. הקמרונות שרואים היום הם שרידי הבנייה הצלבנית.",
    image: TIMELINE_IMAGES.CRUSADER,
  },
  {
    id: 9,
    title: "התקופה הממלוכית",
    date: "1260-1517 לספירה",
    content:
      "התקופה הממלוכית. הסולטן בייברס אוסר על כל מי שאינו מוסלמי להכנס למערת המכפלה. יהודים מגיעים רק עד 'המדרגה השביעית'.",
    image: TIMELINE_IMAGES.MAMLUK,
  },
  {
    id: 10,
    title: "התקופה העות'מאנית",
    date: "1517-1918 לספירה",
    content: "התקופה העות'מאנית. מגורשי ספרד מגיעים לחברון ומייסדים את הרובע היהודי. חברון הופכת לאחת מארבע ערי הקודש.",
    image: TIMELINE_IMAGES.OTTOMAN,
  },
  {
    id: 11,
    title: "ימי טרום המדינה",
    date: "1920-1948 המנדט הבריטי",
    content:
      'ימי טרום מדינת ישראל. פרעות תרפ"ט (1929) - טבח נורא בו נרצחו 67 יהודים בחברון. סוף היישוב היהודי הרצוף בחברון.',
    image: TIMELINE_IMAGES.PRE_STATE,
  },
  {
    id: 12,
    title: "ראשית המדינה",
    date: "1948-1967 עד מלחמת ששת הימים",
    content:
      "ימי ראשית המדינה. השטח בשליטה ירדנית. פעולות תגמול: 'כפפות משי', מבצע 'יונתן' ומבצע 'מגרסה' נגד מחבלים שפגעו ביהודים.",
    image: TIMELINE_IMAGES.EARLY_STATE,
  },
  {
    id: 13,
    title: "מלחמת ששת הימים",
    date: "1967 עד היום",
    content: "ממלחמת ששת הימים ועד ימינו. הרב גורן פותח את שערי מערת המכפלה. התיישבות מתחדשת בחברון ובכל מרחב יהודה.",
    image: TIMELINE_IMAGES.SIX_DAY_WAR,
  },
  {
    id: 14,
    title: "סיכום",
    date: "חיילים וחיילות יקרים",
    content:
      "חיילים וחיילות יקרים, במקום בו מספרים ציר ההיסטוריה מתחיל המעשה, נגמרת התאוריה וזמנה מולנו למצוא את המשיכה בנופי ההר, עוצרי הנשימה טסיבת יהודה תמשיך במסורת ותהיה עוד חלק במשכמרת במולדות הגדולה עוד פרק נוסף את אחריה נפקד, נתחבר ונסיר מפקדת טסיבת יהודה.",
    image: TIMELINE_IMAGES.SUMMARY,
  },
  {
    id: 15,
    title: "",
    date: "",
    content: "",
    image: "",
    isHidden: true,
  },
]
