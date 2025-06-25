# 📸 Image Organization Guide

## 📁 Directory Structure

### `/images/`
- **`atmosphere/`** - Atmospheric landscape photos
- **`hero/`** - Hero section background images
- **`cave-of-machpelah/`** - Cave of Machpelah photos
- **`yatir-forest/`** - Yatir Forest seasonal photos
- **`desert-landscape/`** - General desert landscape photos
- **`timeline/`** - Historical timeline images
- **`brigade-activities/`** ✨ **NEW** - Brigade activities and operations
- **`historical-sites/`** ✨ **NEW** - Archaeological and historical sites
- **`aerial-views/`** ✨ **NEW** - Aerial photography and viewpoints
- **`desert-landscapes/`** ✨ **NEW** - Diverse desert landscapes

## 🎯 Current Carousel Images (10 photos)

### Main Gallery (`CAROUSEL_IMAGES`)
1. **Cave of Machpelah** - `/images/cave-of-machpelah/cave-of-machpelah-1.jpg`
2. **Yatir Forest Spring** - `/images/yatir-forest/yatir-spring.jpg`
3. **Nahal Shafan-Tzalim Meeting** - `/images/brigade-activities/nahal-shafan-tzalim-meeting.jpg`
4. **Yatir Reservoir Aerial** - `/images/aerial-views/yatir-reservoir-aerial.jpg`
5. **Yatir Forest Autumn** - `/images/yatir-forest/yatir-autumn.jpg`
6. **Mitzpe Yair Viewpoint** - `/images/aerial-views/mitzpe-yair-viewpoint.jpg`
7. **Desert Camels Landscape** - `/images/desert-landscapes/desert-camels-landscape.jpg`
8. **Sunset at Shamea** - `/images/desert-landscapes/sunset-shamea.jpg`
9. **DJI Aerial Landscape** - `/images/aerial-views/dji-aerial-landscape.jpg`
10. **Susya Archaeological Site** - `/images/historical-sites/susya-archaeological-site.jpg`

### Hero Section (`HERO_CAROUSEL_IMAGES`)
1. **Cave of Machpelah 1** - `/images/hero/hero-cave-machpelah-1.jpg`
2. **Cave of Machpelah 2** - `/images/hero/hero-cave-machpelah-2.jpg`
3. **Yatir Spring** - `/images/hero/hero-yatir-spring.jpg`
4. **Susya Archaeological Site** - `/images/historical-sites/susya-archaeological-site.jpg`

## 📝 Naming Convention

### ✅ Good Names (English)
- `nahal-shafan-tzalim-meeting.jpg`
- `yatir-reservoir-aerial.jpg`
- `mitzpe-yair-viewpoint.jpg`
- `desert-camels-landscape.jpg`
- `susya-archaeological-site.jpg`

### ❌ Avoid (Hebrew/Special Characters)
- ~~`מפגש נחל שפן עם נחל צאלים צילום עמרן.jpg`~~
- ~~`עותק של מאגר יתיר-אוירי.jpg`~~

## 🔄 File Management

### To Add New Images:
1. **Choose appropriate category folder**
2. **Use descriptive English names**
3. **Update constants in `/constants/images.ts`**
4. **Optimize file size (< 2MB recommended)**

### Categories Guide:
- **`brigade-activities/`** - Unit operations, training, meetings
- **`historical-sites/`** - Archaeological sites, ancient ruins
- **`aerial-views/`** - Drone photos, aerial perspectives, viewpoints
- **`desert-landscapes/`** - Natural desert scenes, wildlife, sunsets

## 🎨 Image Quality Standards
- **Format**: JPG/JPEG preferred
- **Size**: 1920x1080 minimum
- **Quality**: High resolution for hero images
- **Optimization**: Compress for web without quality loss

## 🚀 Recent Updates
- ✅ Organized images into logical categories
- ✅ Renamed all files to English
- ✅ Updated carousel with 10 diverse images
- ✅ Improved indicator alignment in gallery
- ✅ Added new categories for better organization

---

## 🎯 **מבנה התיקיות החדש**

### `/hero/` - תמונות החלק הראשי
- `hero-cave-machpelah-1.jpg` - מערת המכפלה (תמונה ראשונה)
- `hero-cave-machpelah-2.jpg` - מערת המכפלה (תמונה שנייה) 
- `hero-yatir-spring.jpg` - יער יתיר באביב
- `hero-desert-view.jpg` - נוף מדברי מרהיב

### `/cave-of-machpelah/` - תמונות מערת המכפלה
- `cave-of-machpelah-1.jpg` - התמונה הראשונה
- `cave-of-machpelah-2.jpg` - התמונה השנייה

### `/yatir-forest/` - תמונות יער יתיר
- `yatir-spring.jpg` - יער יתיר באביב
- `yatir-autumn.jpg` - יער יתיר בסתיו

### `/desert-landscape/` - נופי מדבר
- `desert-view-1.jpg` - נוף מדבר (תמונה ראשונה)
- `desert-view-2.jpg` - נוף מדבר (תמונה שנייה)

### `/atmosphere/` - תמונות אווירה נוספות
- `carmel-view.jpg` - נוף כרמל

---

## 🔄 **איפה התמונות מופיעות באתר**

### **החלק הראשי (Hero Section)**
קרוסלת תמונות עם 5 תמונות:
1. מערת המכפלה (ראשונה)
2. מערת המכפלה (שנייה)
3. יער יתיר באביב
4. נוף מדברי
5. נוף הרי יהודה (המקורי)

### **סקשן "אודות" (About Section)**
קרוסלה עם 6 תמונות:
- שתי תמונות מערת המכפלה
- שתי תמונות יער יתיר
- שתי תמונות נוף מדבר

### **סקשן "למה אנחנו כאן" (Why We Are Here)**
תמונת רקע: מערת המכפלה

### **Footer**
תמונת רקע: נוף מדבר

---

## 🎨 **פיצ'רים שהופעלו מחדש**

✅ **קרוסלת תמונות אוטומטית** - תמונות מתחלפות כל 6 שניות  
✅ **תצוגה מקדימה בצד** - ניתן לראות ולבחור תמונות  
✅ **מידע על תמונות** - כל תמונה עם תיאור מתאים  
✅ **ניווט במובייל** - חיצים וסמנים למובייל  
✅ **החלקה במובייל** - תמיכה בswipe gestures  
✅ **אפקט פרלקס** - תנועה עדינה של התמונות  

---

## 📝 **הערות חשובות**

- כל השמות הוחלפו לאנגלית לתאימות טובה יותר
- התמונות ממוספרות לזיהוי קל
- התמונות מסודרות לפי קטגוריות לוגיות
- איכות התמונות נשמרה במלואה
- התמונות מותאמות לשימוש ברשת (Web-optimized)

---

**🚀 האתר כעת רץ עם כל התמונות החדשות על `http://localhost:3000`** 