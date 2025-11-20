# Arian Saeed Industrial Group - Backend API

Django REST Framework backend for the Arian Saeed Industrial Group website.

## 📋 Features

- **Contact Management**: Handle contact form submissions
- **Careers Management**: Job listings and resume submissions with file upload
- **Articles & News**: Blog/news system with categories, likes, and views tracking
- **Django Admin Panel**: Full-featured admin interface for content management
- **REST API**: Clean RESTful API with filtering, search, and pagination
- **File Upload**: Support for resume and image uploads
- **Email Notifications**: Automatic email notifications for submissions

## 🚀 Tech Stack

- **Framework**: Django 4.2.7
- **API**: Django REST Framework 3.14.0
- **Database**: PostgreSQL (configurable)
- **Image Processing**: Pillow
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **CORS**: django-cors-headers

## 📦 Installation

### 1. Clone and Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=ariansaeed_db
DB_USER=postgres
DB_PASSWORD=your-password
# ... other settings
```

### 4. Database Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

Server will start at: `http://127.0.0.1:8000`

## 📚 API Endpoints

### Contact API

- `POST /api/contact/` - Submit contact form

**Example Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Business Inquiry",
  "message": "I would like to discuss..."
}
```

### Careers API

**Jobs:**
- `GET /api/careers/jobs/` - List all active jobs
- `GET /api/careers/jobs/{id}/` - Get job details
- `GET /api/careers/jobs/featured/` - Get featured jobs
- `GET /api/careers/jobs/departments/` - Get list of departments

**Filtering & Search:**
- `GET /api/careers/jobs/?department=AI&location=Tehran`
- `GET /api/careers/jobs/?search=engineer`

**Resume Submission:**
- `POST /api/careers/resume/` - Submit resume (multipart/form-data)

**Example Request:**
```javascript
const formData = new FormData();
formData.append('full_name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+98 912 345 6789');
formData.append('position', 'Software Engineer');
formData.append('location', 'Tehran');
formData.append('experience', '3-5');
formData.append('cover_letter', 'I am interested...');
formData.append('resume_file', fileInput.files[0]);
formData.append('job_id', 1); // Optional

fetch('/api/careers/resume/', {
  method: 'POST',
  body: formData
});
```

### Articles API

**Articles:**
- `GET /api/articles/` - List all published articles (paginated)
- `GET /api/articles/{id}/` - Get article details
- `GET /api/articles/featured/` - Get featured articles
- `GET /api/articles/popular/` - Get most viewed articles
- `GET /api/articles/trending/` - Get trending articles
- `POST /api/articles/{id}/like/` - Like an article
- `POST /api/articles/{id}/view/` - Track article view
- `GET /api/articles/by-category/?slug=automotive` - Filter by category

**Categories:**
- `GET /api/articles/categories/` - List all categories

**Filtering & Search:**
- `GET /api/articles/?category=1&featured=true`
- `GET /api/articles/?search=BYD`
- `GET /api/articles/?ordering=-views_count`

## 🔐 Admin Panel

Access the admin panel at: `http://127.0.0.1:8000/admin/`

### Features:

**Contact Messages:**
- View all contact submissions
- Mark as read/replied/archived
- Filter by status and date
- Search functionality

**Jobs Management:**
- Create/edit/delete job listings
- Mark jobs as active/paused/closed
- Mark jobs as featured
- Track applications count

**Resume Management:**
- View all applications
- Filter by status, experience, department
- Mark as reviewing/shortlisted/interviewed/rejected/hired
- Rate candidates
- Download resumes
- Add recruiter notes

**Articles Management:**
- Create/edit/delete articles
- Rich text editor for content
- Image upload
- SEO fields (meta description, keywords)
- Publish scheduling
- Mark as featured
- Track views and likes

**Categories:**
- Manage article categories
- Set display order

## 📖 API Documentation

Interactive API documentation (Swagger UI):
- `http://127.0.0.1:8000/api/docs/`

OpenAPI Schema:
- `http://127.0.0.1:8000/api/schema/`

## 🗂️ Project Structure

```
backend/
├── config/                 # Project configuration
│   ├── settings.py        # Django settings
│   ├── urls.py           # Main URL routing
│   ├── wsgi.py           # WSGI config
│   └── asgi.py           # ASGI config
├── apps/                  # Django apps
│   ├── contact/          # Contact form app
│   │   ├── models.py     # ContactMessage model
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── urls.py
│   ├── careers/          # Careers app
│   │   ├── models.py     # Job, Resume models
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── urls.py
│   └── articles/         # Articles/Blog app
│       ├── models.py     # Article, Category models
│       ├── serializers.py
│       ├── views.py
│       ├── admin.py
│       └── urls.py
├── media/                # Uploaded files
│   ├── resumes/         # Resume uploads
│   └── articles/        # Article images
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## 🧪 Testing

Run tests:
```bash
pytest
```

## 📝 Code Quality

Format code with Black:
```bash
black .
```

Sort imports:
```bash
isort .
```

Lint with Flake8:
```bash
flake8
```

## 🚀 Production Deployment

### 1. Update Settings

Set these in `.env`:
```env
DEBUG=False
SECRET_KEY=your-super-secure-random-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### 2. Collect Static Files

```bash
python manage.py collectstatic
```

### 3. Run with Gunicorn

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### 4. Setup Nginx

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/backend/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Configuration

### Database

Default: SQLite (for development)

For PostgreSQL (recommended for production):

```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ariansaeed_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### Email

Configure email backend in `.env`:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### CORS

Update allowed origins in `.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 📞 Support

For issues or questions, contact the development team.

## 📄 License

Proprietary - Arian Saeed Industrial Group Inc.
