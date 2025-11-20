# راهنمای راه‌اندازی بک‌اند (فارسی)

## 🚀 نصب و راه‌اندازی سریع

### مرحله 1: ایجاد محیط مجازی

```bash
cd backend

# ایجاد محیط مجازی
python -m venv venv

# فعال‌سازی محیط مجازی (Windows)
venv\Scripts\activate

# فعال‌سازی محیط مجازی (Linux/Mac)
# source venv/bin/activate
```

### مرحله 2: نصب پکیج‌ها

```bash
pip install -r requirements.txt
```

### مرحله 3: تنظیمات محیط

فایل `.env` را از روی `.env.example` کپی کنید و تنظیمات خود را وارد کنید:

```bash
copy .env.example .env
```

محتوای `.env`:
```env
DEBUG=True
SECRET_KEY=django-insecure-please-change-this-in-production
ALLOWED_HOSTS=localhost,127.0.0.1

# برای استفاده از SQLite (پیش‌فرض - برای تست):
# نیازی به تنظیمات دیتابیس نیست

# برای استفاده از PostgreSQL:
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ariansaeed_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# تنظیمات ایمیل (اختیاری)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=admin@ariansaeed.com
```

### مرحله 4: اجرای Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### مرحله 5: ایجاد سوپریوزر (ادمین)

```bash
python manage.py createsuperuser
```

اطلاعات خواسته شده را وارد کنید:
- Username: admin
- Email: admin@ariansaeed.com
- Password: (رمز عبور دلخواه)

### مرحله 6: اجرای سرور

```bash
python manage.py runserver
```

سرور در آدرس `http://127.0.0.1:8000` اجرا خواهد شد.

## ✅ تست API

### پنل ادمین
- آدرس: http://127.0.0.1:8000/admin/
- با یوزرنیم و پسورد ساخته شده وارد شوید

### مستندات API (Swagger)
- آدرس: http://127.0.0.1:8000/api/docs/

### تست اندپوینت‌ها

**تست Contact Form:**
```bash
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "علی احمدی",
    "email": "ali@example.com",
    "subject": "استعلام همکاری",
    "message": "سلام، می‌خواهم در مورد همکاری با شرکت صحبت کنم"
  }'
```

**تست دریافت لیست Job ها:**
```bash
curl http://127.0.0.1:8000/api/careers/jobs/
```

**تست دریافت مقالات:**
```bash
curl http://127.0.0.1:8000/api/articles/
```

## 📊 داده‌های نمونه (اختیاری)

برای راحتی تست، می‌توانید داده‌های نمونه اضافه کنید:

1. وارد پنل ادمین شوید
2. در بخش **Careers** چند Job اضافه کنید
3. در بخش **Articles** -> **Categories** چند دسته‌بندی بسازید:
   - Automotive
   - Agriculture  
   - Events
   - Wood Industry
4. در بخش **Articles** چند مقاله نمونه اضافه کنید

## 🔧 مشکلات متداول

### خطای Database Connection

اگر از PostgreSQL استفاده می‌کنید:
```bash
# نصب PostgreSQL در سیستم
# ایجاد دیتابیس
psql -U postgres
CREATE DATABASE ariansaeed_db;
```

### خطای CORS

اگر فرانت روی پورت دیگری اجرا می‌شود، آن را به `CORS_ALLOWED_ORIGINS` اضافه کنید:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### خطای Media Files

اطمینان حاصل کنید که پوشه media وجود دارد:
```bash
mkdir media
mkdir media\resumes
mkdir media\articles
```

## 📱 دستورات مفید

```bash
# ساخت migration جدید
python manage.py makemigrations

# اجرای migration
python manage.py migrate

# ایجاد سوپریوزر
python manage.py createsuperuser

# جمع‌آوری فایل‌های استاتیک
python manage.py collectstatic

# اجرای سرور
python manage.py runserver

# اجرای سرور روی پورت دیگر
python manage.py runserver 8080

# باز کردن شل Django
python manage.py shell

# مشاهده لیست URL ها
python manage.py show_urls
```

## 🎯 گام‌های بعدی

1. ✅ نصب و راه‌اندازی بک‌اند
2. ✅ تست API ها از طریق Swagger
3. ✅ اضافه کردن داده‌های نمونه از پنل ادمین
4. 📝 اتصال فرانت به بک‌اند (مرحله بعدی)
5. 🚀 دیپلوی پروژه (مرحله بعدی)

## 💡 نکات مهم

- هرگز `DEBUG=True` را در production نگذارید
- `SECRET_KEY` را در production تغییر دهید
- از PostgreSQL برای production استفاده کنید (نه SQLite)
- برای آپلود فایل‌های بزرگ، سرویس ابری مثل S3 استفاده کنید
- Email settings را برای ارسال نوتیفیکیشن تنظیم کنید
