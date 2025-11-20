# 📑 فهرست کامل فایل‌های پروژه

راهنمای کامل تمام فایل‌ها و پوشه‌های بک‌اند

## 📁 ساختار کلی

```
backend/
├── 📄 مستندات و تنظیمات
├── 📦 config/ (تنظیمات Django)
├── 🎨 apps/ (Django Applications)
├── 📂 media/ (فایل‌های آپلود شده)
└── 🧪 تست‌ها
```

---

## 📄 مستندات (شروع از اینجا!)

| فایل | توضیح | اولویت |
|------|-------|--------|
| **QUICKSTART.md** | 🚀 شروع سریع در 5 دقیقه | ⭐⭐⭐ |
| **README.md** | 📖 مستندات کامل انگلیسی | ⭐⭐⭐ |
| **SETUP.md** | 🇮🇷 راهنمای فارسی راه‌اندازی | ⭐⭐⭐ |
| **API_DOCUMENTATION.md** | 📡 مستندات کامل API ها | ⭐⭐ |
| **FRONTEND_INTEGRATION.md** | 🔌 راهنمای اتصال فرانت | ⭐⭐ |
| **DEPLOYMENT.md** | 🚀 راهنمای دیپلوی Production | ⭐ |
| **SUMMARY.md** | 📝 خلاصه کامل پروژه | ⭐⭐ |
| **INDEX.md** | 📑 این فایل - راهنمای کلی | ⭐ |

---

## ⚙️ تنظیمات پروژه

| فایل | کاربرد |
|------|--------|
| `requirements.txt` | لیست تمام پکیج‌های Python |
| `.env.example` | نمونه فایل Environment Variables |
| `.env` | تنظیمات محیطی (خودتان بسازید) |
| `.gitignore` | فایل‌های ignore شده در Git |
| `manage.py` | CLI اصلی Django |
| `pytest.ini` | تنظیمات تست |
| `.flake8` | تنظیمات Linter |
| `pyproject.toml` | تنظیمات Black و isort |

---

## 📦 config/ - تنظیمات اصلی Django

```
config/
├── __init__.py
├── settings.py      → تنظیمات کامل Django
├── urls.py          → URL routing اصلی
├── wsgi.py          → WSGI config برای Production
└── asgi.py          → ASGI config برای async
```

**settings.py شامل:**
- ✅ Database config (SQLite/PostgreSQL)
- ✅ REST Framework settings
- ✅ CORS configuration
- ✅ Email settings
- ✅ File upload settings
- ✅ Security settings
- ✅ API documentation config

---

## 🎨 apps/ - Django Applications

### 1️⃣ apps/contact/ - مدیریت تماس با ما

```
contact/
├── __init__.py
├── apps.py          → تنظیمات App
├── models.py        → Model: ContactMessage
├── serializers.py   → REST Serializers
├── views.py         → API Views
├── admin.py         → پنل ادمین
├── urls.py          → URL routing
└── tests.py         → تست‌های Unit
```

**Features:**
- ✅ ذخیره پیام‌های تماس
- ✅ مدیریت وضعیت (New/Read/Replied/Archived)
- ✅ ارسال ایمیل به ادمین
- ✅ ذخیره IP و User Agent

**API Endpoint:**
- `POST /api/contact/`

---

### 2️⃣ apps/careers/ - مدیریت استخدام

```
careers/
├── __init__.py
├── apps.py          → تنظیمات App
├── models.py        → Models: Job, Resume
├── serializers.py   → Job & Resume serializers
├── views.py         → ViewSets با filtering
├── admin.py         → پنل ادمین حرفه‌ای
├── urls.py          → URL routing
└── tests.py         → تست‌های Unit
```

**Models:**
- `Job` - موقعیت‌های شغلی
- `Resume` - رزومه‌های دریافتی

**Features:**
- ✅ مدیریت کامل Jobs
- ✅ آپلود فایل رزومه (PDF/DOC/DOCX)
- ✅ Filtering & Search
- ✅ Featured jobs
- ✅ ارسال ایمیل به متقاضی و HR
- ✅ امتیازدهی و یادداشت‌گیری

**API Endpoints:**
- `GET /api/careers/jobs/`
- `GET /api/careers/jobs/{id}/`
- `GET /api/careers/jobs/featured/`
- `GET /api/careers/jobs/departments/`
- `POST /api/careers/resume/`

---

### 3️⃣ apps/articles/ - سیستم مقالات و اخبار

```
articles/
├── __init__.py
├── apps.py          → تنظیمات App
├── models.py        → Models: Article, Category, Like, View
├── serializers.py   → List & Detail serializers
├── views.py         → ViewSets با Actions
├── admin.py         → مدیریت محتوا
├── urls.py          → URL routing
└── tests.py         → تست‌های Unit
```

**Models:**
- `Category` - دسته‌بندی مقالات
- `Article` - مقالات/اخبار
- `ArticleLike` - سیستم لایک
- `ArticleView` - ردیابی بازدید

**Features:**
- ✅ سیستم دسته‌بندی
- ✅ آپلود تصویر
- ✅ Featured articles
- ✅ Like & View tracking
- ✅ Related articles
- ✅ محاسبه خودکار زمان مطالعه
- ✅ فیلدهای SEO
- ✅ Tags system

**API Endpoints:**
- `GET /api/articles/`
- `GET /api/articles/{id}/`
- `GET /api/articles/featured/`
- `GET /api/articles/popular/`
- `GET /api/articles/trending/`
- `POST /api/articles/{id}/like/`
- `POST /api/articles/{id}/view/`
- `GET /api/articles/categories/`

---

## 📂 media/ - فایل‌های آپلود شده

```
media/
├── resumes/         → فایل‌های رزومه
│   └── YYYY/MM/     → سازماندهی بر اساس تاریخ
└── articles/        → تصاویر مقالات
    └── YYYY/MM/     → سازماندهی بر اساس تاریخ
```

**نکته:** این پوشه به صورت خودکار ساخته می‌شود.

---

## 🧪 تست‌ها

هر App شامل `tests.py` با تست‌های کامل:

- ✅ **Contact Tests**: تست ارسال پیام، validation
- ✅ **Careers Tests**: تست Jobs API، آپلود رزومه
- ✅ **Articles Tests**: تست CRUD، Like، View tracking

**اجرای تست‌ها:**
```bash
pytest
pytest apps/contact/tests.py
pytest -v
```

---

## 🗺️ نقشه راه یادگیری

### مبتدی - شروع اینجا 👇

1. **QUICKSTART.md** - راه‌اندازی سریع (5 دقیقه)
2. پنل ادمین را باز کنید و داده نمونه اضافه کنید
3. **API_DOCUMENTATION.md** - آشنایی با API ها
4. Swagger UI را امتحان کنید (`/api/docs/`)

### متوسط - بعد از راه‌اندازی 👇

1. **SETUP.md** - راه‌اندازی کامل با تنظیمات
2. **FRONTEND_INTEGRATION.md** - اتصال به Next.js
3. کد Models را مطالعه کنید
4. تست‌ها را اجرا کنید

### پیشرفته - آماده Production 👇

1. **DEPLOYMENT.md** - راهنمای دیپلوی
2. **SUMMARY.md** - درک معماری کامل
3. Security checklist را بررسی کنید
4. Performance optimization

---

## 🎯 دسترسی سریع

### مستندات به زبان فارسی 🇮🇷
- ⚡ [QUICKSTART.md](QUICKSTART.md)
- 📖 [SETUP.md](SETUP.md)
- 📝 [SUMMARY.md](SUMMARY.md)

### مستندات فنی 🔧
- 📡 [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- 🔌 [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md)

### کد منبع 💻
- ⚙️ [config/settings.py](config/settings.py)
- 📨 [apps/contact/models.py](apps/contact/models.py)
- 💼 [apps/careers/models.py](apps/careers/models.py)
- 📰 [apps/articles/models.py](apps/articles/models.py)

---

## 🔍 یافتن چیزی خاص

**می‌خواهید...**

- ✅ **شروع سریع کنید؟** → [QUICKSTART.md](QUICKSTART.md)
- ✅ **API ها را تست کنید؟** → http://127.0.0.1:8000/api/docs/
- ✅ **فرانت متصل کنید؟** → [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
- ✅ **دیپلوی کنید؟** → [DEPLOYMENT.md](DEPLOYMENT.md)
- ✅ **معماری را بدانید؟** → [SUMMARY.md](SUMMARY.md)
- ✅ **تست بنویسید؟** → `apps/*/tests.py`

---

## 📞 پشتیبانی

برای سوالات یا مشکلات:
1. مستندات مربوطه را بررسی کنید
2. Error logs را چک کنید
3. تست‌ها را اجرا کنید

---

**همه چیز آماده است! 🎉**

از [QUICKSTART.md](QUICKSTART.md) شروع کنید و در 5 دقیقه بک‌اند را راه‌اندازی کنید.
