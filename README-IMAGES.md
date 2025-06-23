# 📸 מדריך להעלאת תמונות לחלק הראשי

## 🎯 איך להעלות תמונות חדשות לחלק הראשי של האתר?

### 1. **מיקום התמונות**
העלה את התמונות החדשות לתיקייה:
```
be-shvil-1/public/images/hero/
```

### 2. **פורמטים נתמכים**
- PNG (מומלץ לאיכות גבוהה)
- JPG/JPEG (מומלץ לקבצים קטנים יותר)
- WebP (מומלץ לביצועים מיטביים)

### 3. **גדלים מומלצים**
- רוחב: 1920px ומעלה
- גובה: 1080px ומעלה
- יחס גובה-רוחב: 16:9 (מומלץ)

### 4. **שמות קבצים**
השתמש בשמות ברורים באנגלית, למשל:
- `hero-landscape-1.jpg`
- `judah-mountains-2.png`
- `historical-site-3.jpg`

### 5. **עדכון הקוד**
לאחר העלאת התמונות, ערוך את הקובץ:
```
be-shvil-1/constants/images.ts
```

והחלף את:
```typescript
export const HERO_CAROUSEL_IMAGES = [
  "/images/military-landscape.png",
] as const
```

ב:
```typescript
export const HERO_CAROUSEL_IMAGES = [
  "/images/hero/hero-landscape-1.jpg",
  "/images/hero/judah-mountains-2.png",
  "/images/hero/historical-site-3.jpg",
  // הוסף עוד תמונות לפי הצורך
] as const
```

### 6. **הוספת מידע על התמונות**
ערוך את הקבצים:
- `be-shvil-1/components/ui/image-info-display.tsx`
- `be-shvil-1/components/ui/mobile-image-info.tsx`

והוסף מידע על כל תמונה במערך `IMAGE_INFO`.

## 🔄 שחזור הפיצ'רים המתקדמים

לאחר העלאת התמונות, אם תרצה להחזיר את הפיצ'רים המתקדמים:

1. **קרוסלת תמונות אוטומטית** ✅ כבר מוכן
2. **תצוגה מקדימה בצד** - צריך להסיר הערה מהקוד
3. **מידע על תמונות** - צריך להסיר הערה מהקוד
4. **ניווט במובייל** - צריך להסיר הערה מהקוד

## 📞 צור קשר
אם תצטרך עזרה בהעלאת התמונות או עדכון הקוד, פשוט בקש! 