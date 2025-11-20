# 🚀 راهنمای Deploy در Production

## آماده‌سازی برای Production

### 1. تنظیمات Environment

فایل `.env` برای production:

```env
# Django Settings
DEBUG=False
SECRET_KEY=your-super-secure-random-50-character-secret-key-here
ALLOWED_HOSTS=api.ariansaeed.com,www.ariansaeed.com

# Database (PostgreSQL)
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ariansaeed_production
DB_USER=ariansaeed_user
DB_PASSWORD=very-strong-password-here
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://ariansaeed.com,https://www.ariansaeed.com

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=noreply@ariansaeed.com
EMAIL_HOST_PASSWORD=your-email-app-password
ADMIN_EMAIL=admin@ariansaeed.com

# Media
MEDIA_URL=/media/
MEDIA_ROOT=/var/www/ariansaeed/media/
```

### 2. نصب PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# ایجاد دیتابیس و یوزر
sudo -u postgres psql

CREATE DATABASE ariansaeed_production;
CREATE USER ariansaeed_user WITH PASSWORD 'your-password';
ALTER ROLE ariansaeed_user SET client_encoding TO 'utf8';
ALTER ROLE ariansaeed_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ariansaeed_user SET timezone TO 'Asia/Tehran';
GRANT ALL PRIVILEGES ON DATABASE ariansaeed_production TO ariansaeed_user;
\q
```

### 3. نصب Dependencies

```bash
# ایجاد virtual environment
python3 -m venv venv
source venv/bin/activate

# نصب پکیج‌ها
pip install -r requirements.txt
pip install psycopg2-binary gunicorn
```

### 4. Migration و Static Files

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

---

## Deploy با Gunicorn + Nginx

### 1. تنظیم Gunicorn

ایجاد فایل `gunicorn_config.py`:

```python
# gunicorn_config.py
bind = "127.0.0.1:8000"
workers = 3  # (2 x CPU cores) + 1
worker_class = "sync"
timeout = 120
keepalive = 5
errorlog = "/var/log/gunicorn/error.log"
accesslog = "/var/log/gunicorn/access.log"
loglevel = "info"
```

ایجاد systemd service:

```bash
sudo nano /etc/systemd/system/ariansaeed-backend.service
```

محتوا:

```ini
[Unit]
Description=Arian Saeed Backend (Gunicorn)
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/ariansaeed/backend
Environment="PATH=/var/www/ariansaeed/backend/venv/bin"
ExecStart=/var/www/ariansaeed/backend/venv/bin/gunicorn \
    --config gunicorn_config.py \
    config.wsgi:application

[Install]
WantedBy=multi-user.target
```

فعال‌سازی:

```bash
sudo systemctl start ariansaeed-backend
sudo systemctl enable ariansaeed-backend
sudo systemctl status ariansaeed-backend
```

### 2. تنظیم Nginx

```bash
sudo nano /etc/nginx/sites-available/ariansaeed-api
```

محتوا:

```nginx
upstream ariansaeed_backend {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name api.ariansaeed.com;
    
    client_max_body_size 10M;
    
    # Static files
    location /static/ {
        alias /var/www/ariansaeed/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Media files
    location /media/ {
        alias /var/www/ariansaeed/backend/media/;
        expires 30d;
        add_header Cache-Control "public";
    }
    
    # API
    location / {
        proxy_pass http://ariansaeed_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin "https://ariansaeed.com" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

فعال‌سازی:

```bash
sudo ln -s /etc/nginx/sites-available/ariansaeed-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. SSL با Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.ariansaeed.com
```

Certbot به صورت خودکار Nginx config را برای HTTPS تنظیم می‌کند.

---

## Deploy با Docker (اختیاری)

### Dockerfile

```dockerfile
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create media directory
RUN mkdir -p media/resumes media/articles

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ariansaeed_db
      POSTGRES_USER: ariansaeed_user
      POSTGRES_PASSWORD: your-password
    
  backend:
    build: .
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./media:/app/media
      - ./staticfiles:/app/staticfiles
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db

volumes:
  postgres_data:
```

اجرا:

```bash
docker-compose up -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

---

## پشتیبان‌گیری

### 1. Database Backup

ایجاد اسکریپت backup:

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/var/backups/ariansaeed"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="ariansaeed_production"
DB_USER="ariansaeed_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
PGPASSWORD="your-password" pg_dump -U $DB_USER -h localhost $DB_NAME > "$BACKUP_DIR/db_$DATE.sql"

# Backup media files
tar -czf "$BACKUP_DIR/media_$DATE.tar.gz" /var/www/ariansaeed/backend/media/

# Keep only last 7 days backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

اضافه کردن به crontab:

```bash
crontab -e

# روزانه ساعت 2 صبح
0 2 * * * /path/to/backup.sh
```

---

## Monitoring

### 1. Logs

```bash
# Gunicorn logs
tail -f /var/log/gunicorn/error.log
tail -f /var/log/gunicorn/access.log

# Nginx logs
tail -f /var/nginx/error.log
tail -f /var/nginx/access.log

# Django logs (if configured)
tail -f /var/www/ariansaeed/backend/logs/django.log
```

### 2. System Monitoring

نصب htop:

```bash
sudo apt install htop
htop
```

### 3. Error Tracking (Sentry)

```bash
pip install sentry-sdk
```

در `settings.py`:

```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

if not DEBUG:
    sentry_sdk.init(
        dsn="your-sentry-dsn",
        integrations=[DjangoIntegration()],
        traces_sample_rate=0.1,
    )
```

---

## Security Checklist

- [x] DEBUG=False
- [x] Strong SECRET_KEY
- [x] HTTPS enabled
- [x] CORS properly configured
- [x] Database password strong
- [x] Firewall configured (UFW)
- [x] Regular backups
- [x] Log rotation
- [x] Updates scheduled
- [x] Admin panel only accessible via VPN/IP whitelist

---

## Performance Optimization

### 1. Database Optimization

```python
# در settings.py
DATABASES = {
    'default': {
        ...
        'CONN_MAX_AGE': 600,  # Connection pooling
    }
}
```

### 2. Caching با Redis (اختیاری)

```bash
pip install django-redis
```

```python
# settings.py
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
```

### 3. CDN برای Media Files

از سرویس‌هایی مثل:
- AWS S3 + CloudFront
- Cloudflare
- Arvan Cloud (ایران)

---

## مشکلات متداول

### Permission Errors

```bash
sudo chown -R www-data:www-data /var/www/ariansaeed/backend/media/
sudo chmod -R 755 /var/www/ariansaeed/backend/media/
```

### Gunicorn نمی‌شود راه‌اندازی

```bash
sudo systemctl status ariansaeed-backend
sudo journalctl -u ariansaeed-backend -n 50
```

### Database Connection Error

بررسی PostgreSQL:

```bash
sudo systemctl status postgresql
sudo -u postgres psql -l
```

---

## 🎯 چک‌لیست نهایی

قبل از راه‌اندازی production:

- [ ] Environment variables تنظیم شد
- [ ] PostgreSQL نصب و configure شد
- [ ] Migrations اجرا شد
- [ ] Superuser ساخته شد
- [ ] Static files جمع‌آوری شد
- [ ] Gunicorn service راه‌اندازی شد
- [ ] Nginx configure شد
- [ ] SSL certificate نصب شد
- [ ] CORS درست تنظیم شد
- [ ] Backup script راه‌اندازی شد
- [ ] Monitoring فعال شد
- [ ] تست کامل انجام شد

موفق باشید! 🚀
