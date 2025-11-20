# ⚡ Quick Start Guide

شروع سریع با بک‌اند Django در 5 دقیقه!

## 🚀 راه‌اندازی فوری

### گام 1: محیط مجازی (30 ثانیه)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

### گام 2: نصب پکیج‌ها (2 دقیقه)

```bash
pip install -r requirements.txt
```

### گام 3: تنظیمات (30 ثانیه)

```bash
copy .env.example .env
```

برای تست سریع، از SQLite استفاده کنید (نیازی به تغییر `.env` نیست).

### گام 4: دیتابیس (1 دقیقه)

```bash
python manage.py migrate
python manage.py createsuperuser
```

اطلاعات superuser:
- Username: `admin`
- Email: `admin@ariansaeed.com`
- Password: دلخواه (برای تست: `admin123`)

### گام 5: اجرا! (10 ثانیه)

```bash
python manage.py runserver
```

## ✅ تست کنید

### 1. پنل ادمین
🔗 http://127.0.0.1:8000/admin/

ورود با username و password ساخته شده

**کارهایی که می‌توانید انجام دهید:**
- ➕ اضافه کردن Job های نمونه
- 📝 ایجاد Category ها (Automotive, Agriculture, etc.)
- 📰 نوشتن Article های نمونه
- 📊 مشاهده Contact Messages

### 2. API Documentation
🔗 http://127.0.0.1:8000/api/docs/

مستندات تعاملی Swagger - تمام API ها را تست کنید

### 3. تست API ها

**Contact Form:**
```bash
curl -X POST http://127.0.0.1:8000/api/contact/ ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"This is a test message\"}"
```

**Get Jobs:**
```bash
curl http://127.0.0.1:8000/api/careers/jobs/
```

**Get Articles:**
```bash
curl http://127.0.0.1:8000/api/articles/
```

## 📂 ساختار URL ها

```
Admin Panel:
├── /admin/                          → پنل مدیریت

API Documentation:
├── /api/docs/                       → Swagger UI
├── /api/schema/                     → OpenAPI Schema

Contact API:
├── POST /api/contact/              → ارسال پیام تماس

Careers API:
├── GET  /api/careers/jobs/         → لیست شغل‌ها
├── GET  /api/careers/jobs/{id}/    → جزئیات شغل
├── GET  /api/careers/jobs/featured/ → شغل‌های ویژه
├── POST /api/careers/resume/       → ارسال رزومه

Articles API:
├── GET  /api/articles/             → لیست مقالات
├── GET  /api/articles/{id}/        → جزئیات مقاله
├── GET  /api/articles/featured/    → مقالات ویژه
├── GET  /api/articles/popular/     → پربازدیدترین
├── POST /api/articles/{id}/like/   → لایک مقاله
├── POST /api/articles/{id}/view/   → ثبت بازدید
└── GET  /api/articles/categories/  → دسته‌بندی‌ها
```

## 💡 نکات سریع

### داده‌های نمونه اضافه کنید

1. وارد Admin Panel شوید
2. در **Articles** → **Categories** چند دسته بسازید:
   - Automotive
   - Agriculture
   - Events
   - Wood Industry
   
3. در **Articles** چند مقاله نمونه اضافه کنید
4. در **Careers** → **Jobs** چند موقعیت شغلی ایجاد کنید

### تست File Upload

برای تست آپلود رزومه از Swagger UI استفاده کنید:
1. برو به http://127.0.0.1:8000/api/docs/
2. پیدا کن `POST /api/careers/resume/`
3. کلیک کن روی "Try it out"
4. فیلدها رو پر کن و یک PDF آپلود کن
5. "Execute" کن!

### فیلتر و جستجو

```bash
# فیلتر Jobs بر اساس دپارتمان
curl "http://127.0.0.1:8000/api/careers/jobs/?department=Engineering"

# جستجو در Articles
curl "http://127.0.0.1:8000/api/articles/?search=BYD"

# مرتب‌سازی بر اساس بازدید
curl "http://127.0.0.1:8000/api/articles/?ordering=-views_count"
```

## 🔧 دستورات مفید

```bash
# ساخت migration جدید
python manage.py makemigrations

# اجرای migration ها
python manage.py migrate

# ایجاد superuser جدید
python manage.py createsuperuser

# باز کردن Django shell
python manage.py shell

# اجرای تست‌ها
pytest

# چک کردن مشکلات
python manage.py check

# پاک کردن دیتابیس و شروع از نو
del db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## 🐛 مشکلات متداول

### خطا: "No module named 'rest_framework'"
```bash
pip install -r requirements.txt
```

### خطا: "CSRF verification failed"
از Swagger UI یا Postman استفاده کنید، یا CSRF token اضافه کنید.

### خطا: Port in use
```bash
# اجرا روی پورت دیگر
python manage.py runserver 8080
```

### رزومه آپلود نمی‌شود
- بررسی کنید پوشه `media` وجود دارد
- حداکثر سایز فایل: 10MB
- فرمت‌های مجاز: PDF, DOC, DOCX

## 📚 مستندات کامل

برای اطلاعات بیشتر:
- 📖 [README.md](README.md) - مستندات کامل
- 🇮🇷 [SETUP.md](SETUP.md) - راهنمای فارسی
- 🔌 [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) - اتصال فرانت
- 📡 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - مستندات API
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - راهنمای دیپلوی
- 📝 [SUMMARY.md](SUMMARY.md) - خلاصه پروژه

## 🎯 مراحل بعدی

1. ✅ بک‌اند آماده است
2. 📊 داده‌های نمونه اضافه کنید
3. 🧪 API ها را تست کنید
4. 🔗 فرانت را متصل کنید (راهنما: `FRONTEND_INTEGRATION.md`)
5. 🚀 دیپلوی کنید (راهنما: `DEPLOYMENT.md`)

---

**موفق باشید! 🚀**

برای سوالات یا مشکلات، به مستندات کامل مراجعه کنید.
