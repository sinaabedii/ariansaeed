# API Documentation

مستندات کامل API های بک‌اند سایت آریان سعید

## Base URL

```
Development: http://127.0.0.1:8000
Production: https://api.ariansaeed.com
```

## 📨 Contact API

### Submit Contact Form

ارسال فرم تماس با ما

**Endpoint:** `POST /api/contact/`

**Request Body:**
```json
{
  "name": "string",        // required, min 2 chars
  "email": "string",       // required, valid email
  "subject": "string",     // required
  "message": "string"      // required, min 10 chars
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Business Inquiry",
    "message": "I would like to discuss...",
    "created_at": "2024-11-20T12:00:00Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": ["Enter a valid email address."],
    "message": ["Message must be at least 10 characters long."]
  }
}
```

---

## 💼 Careers API

### Get Jobs List

دریافت لیست موقعیت‌های شغلی

**Endpoint:** `GET /api/careers/jobs/`

**Query Parameters:**
- `page` (integer): شماره صفحه (default: 1)
- `department` (string): فیلتر بر اساس دپارتمان
- `employment_type` (string): نوع استخدام (full-time, part-time, contract, internship)
- `location` (string): محل کار
- `search` (string): جستجو در عنوان و توضیحات
- `ordering` (string): مرتب‌سازی (-created_at, views_count, applications_count)

**Example:**
```
GET /api/careers/jobs/?department=AI&location=Tehran&page=1
```

**Response (200 OK):**
```json
{
  "count": 15,
  "next": "http://api.example.com/api/careers/jobs/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Senior Software Engineer",
      "slug": "senior-software-engineer",
      "department": "AI & Engineering",
      "location": "Tehran, Iran",
      "employment_type": "full-time",
      "description": "Join our AI team...",
      "featured": true,
      "views_count": 150,
      "applications_count": 12,
      "created_at": "2024-11-15T10:00:00Z"
    }
  ]
}
```

### Get Job Detail

دریافت جزئیات یک موقعیت شغلی

**Endpoint:** `GET /api/careers/jobs/{id}/`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Senior Software Engineer",
  "slug": "senior-software-engineer",
  "department": "AI & Engineering",
  "location": "Tehran, Iran",
  "employment_type": "full-time",
  "description": "Full description...",
  "requirements": "- 5+ years experience\n- Python expertise",
  "responsibilities": "- Lead development\n- Code review",
  "benefits": "- Competitive salary\n- Health insurance",
  "salary_min": 50000.00,
  "salary_max": 80000.00,
  "salary_currency": "USD",
  "status": "active",
  "featured": true,
  "application_deadline": "2024-12-31",
  "views_count": 150,
  "applications_count": 12,
  "created_at": "2024-11-15T10:00:00Z",
  "updated_at": "2024-11-20T08:30:00Z"
}
```

### Get Featured Jobs

**Endpoint:** `GET /api/careers/jobs/featured/`

### Get Departments List

**Endpoint:** `GET /api/careers/jobs/departments/`

**Response:**
```json
{
  "departments": [
    "AI & Engineering",
    "Marketing",
    "Investment",
    "Construction"
  ]
}
```

### Submit Resume

ارسال رزومه

**Endpoint:** `POST /api/careers/resume/`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `full_name` (string, required): نام کامل
- `email` (string, required): ایمیل
- `phone` (string, required): شماره تلفن
- `position` (string, required): موقعیت مورد نظر
- `location` (string, required): محل سکونت
- `experience` (string, required): سابقه کار (0-1, 1-3, 3-5, 5-10, 10+)
- `cover_letter` (text, optional): متن معرفی
- `resume_file` (file, required): فایل رزومه (PDF, DOC, DOCX - max 10MB)
- `job_id` (integer, optional): شناسه شغل (برای درخواست‌های عمومی اختیاری)

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('full_name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+98 912 345 6789');
formData.append('position', 'Software Engineer');
formData.append('location', 'Tehran, Iran');
formData.append('experience', '3-5');
formData.append('cover_letter', 'I am interested in...');
formData.append('resume_file', fileInput.files[0]);
formData.append('job_id', 1);

fetch('http://127.0.0.1:8000/api/careers/resume/', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Your application has been submitted successfully! We will review your resume and get back to you soon.",
  "data": {
    "id": 5,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+98 912 345 6789",
    "position": "Software Engineer",
    "location": "Tehran, Iran",
    "experience": "3-5",
    "cover_letter": "I am interested in...",
    "resume_file": "http://example.com/media/resumes/2024/11/john_doe_software_engineer.pdf",
    "created_at": "2024-11-20T14:30:00Z"
  }
}
```

---

## 📰 Articles API

### Get Articles List

دریافت لیست مقالات

**Endpoint:** `GET /api/articles/`

**Query Parameters:**
- `page` (integer): شماره صفحه
- `category` (integer): فیلتر بر اساس دسته‌بندی
- `featured` (boolean): فقط مقالات ویژه
- `search` (string): جستجو در عنوان و محتوا
- `ordering` (string): مرتب‌سازی (-publish_date, -views_count, -likes_count)

**Example:**
```
GET /api/articles/?category=1&page=1&ordering=-views_count
```

**Response (200 OK):**
```json
{
  "count": 50,
  "next": "http://api.example.com/api/articles/?page=2",
  "previous": null,
  "results": [
    {
      "id": 101,
      "title": "Opening of the First Dedicated BYD Showroom in Iran",
      "slug": "opening-first-byd-showroom-iran",
      "excerpt": "Arian Saeed Group and Arian Leila opened...",
      "category": 1,
      "category_name": "Automotive",
      "author": "Editorial Team",
      "publish_date": "2024-11-18T10:00:00Z",
      "image_url": "http://example.com/media/articles/2024/11/byd-showroom.jpg",
      "views_count": 2150,
      "likes_count": 132,
      "read_time": 4,
      "featured": true
    }
  ]
}
```

### Get Article Detail

**Endpoint:** `GET /api/articles/{id}/`

**Response (200 OK):**
```json
{
  "id": 101,
  "title": "Opening of the First Dedicated BYD Showroom in Iran",
  "slug": "opening-first-byd-showroom-iran",
  "excerpt": "Short summary...",
  "content": "Full article content...",
  "category": 1,
  "category_name": "Automotive",
  "category_slug": "automotive",
  "author": "Editorial Team",
  "publish_date": "2024-11-18T10:00:00Z",
  "image_url": "http://example.com/media/articles/2024/11/byd-showroom.jpg",
  "views_count": 2150,
  "likes_count": 132,
  "read_time": 4,
  "featured": true,
  "tags_list": ["BYD", "Automotive", "Iran"],
  "related_articles": [...],
  "created_at": "2024-11-15T09:00:00Z",
  "updated_at": "2024-11-20T11:00:00Z"
}
```

### Get Featured Articles

**Endpoint:** `GET /api/articles/featured/`

### Get Popular Articles

**Endpoint:** `GET /api/articles/popular/`

### Get Trending Articles

**Endpoint:** `GET /api/articles/trending/`

### Get Articles by Category

**Endpoint:** `GET /api/articles/by-category/?slug=automotive`

### Like Article

لایک کردن مقاله

**Endpoint:** `POST /api/articles/{id}/like/`

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Article liked successfully",
  "likes_count": 133
}
```

**Response (400 Bad Request) - Already Liked:**
```json
{
  "success": false,
  "message": "You have already liked this article",
  "likes_count": 132
}
```

### Track Article View

ثبت بازدید مقاله

**Endpoint:** `POST /api/articles/{id}/view/`

**Response (201 Created):**
```json
{
  "success": true,
  "message": "View recorded",
  "views_count": 2151
}
```

### Get Categories

**Endpoint:** `GET /api/articles/categories/`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Automotive",
    "slug": "automotive",
    "description": "News about automotive industry",
    "articles_count": 5
  },
  {
    "id": 2,
    "name": "Agriculture",
    "slug": "agriculture",
    "description": "Agricultural innovations",
    "articles_count": 3
  }
]
```

---

## 🔐 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## 📊 Pagination

تمام لیست‌ها به صورت Paginated برگردانده می‌شوند:

```json
{
  "count": 100,           // تعداد کل آیتم‌ها
  "next": "url",          // URL صفحه بعدی (null اگر وجود نداشته باشد)
  "previous": "url",      // URL صفحه قبلی (null اگر وجود نداشته باشد)
  "results": [...]        // آرایه نتایج
}
```

**Default Page Size:** 12 items per page

---

## 🔍 Filtering & Search

### Filtering
```
GET /api/careers/jobs/?department=AI&employment_type=full-time
```

### Search
```
GET /api/articles/?search=BYD+showroom
```

### Ordering
```
GET /api/articles/?ordering=-views_count
GET /api/articles/?ordering=publish_date
```

Multiple ordering:
```
GET /api/articles/?ordering=-featured,-publish_date
```

---

## 🚀 Rate Limiting

Currently no rate limiting is implemented. Will be added in future updates.

---

## 📝 Notes

- همه تاریخ‌ها در فرمت ISO 8601 (UTC) هستند
- فایل‌های آپلودی باید از طریق `multipart/form-data` ارسال شوند
- حداکثر حجم فایل رزومه: 10MB
- فرمت‌های مجاز رزومه: PDF, DOC, DOCX
- فرمت‌های مجاز تصویر مقالات: JPG, JPEG, PNG, WEBP
