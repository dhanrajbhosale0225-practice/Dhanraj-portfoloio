# API Design & Data Flow Documentation

## Table of Contents
1. [API Overview](#api-overview)
2. [REST API Design Principles](#rest-api-design-principles)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Request/Response Flow](#requestresponse-flow)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [API Versioning](#api-versioning)
9. [Future Enhancements](#future-enhancements)

---

## API Overview

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-api-domain.com`

### API Prefix
All API endpoints are prefixed with `/api`

### Interactive Documentation
- **Swagger UI**: `/api/docs`
- **ReDoc**: `/api/redoc`

---

## REST API Design Principles

### 1. Resource-Based URLs
- Use nouns, not verbs: `/projects` not `/getProjects`
- Use plural nouns: `/projects` not `/project`
- Hierarchical structure: `/projects/{id}/comments`

### 2. HTTP Methods
- **GET**: Retrieve data (idempotent)
- **POST**: Create new resource
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

### 3. HTTP Status Codes
- **200 OK**: Successful GET request
- **201 Created**: Successful POST request
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Invalid input
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

### 4. Response Format
All responses are in JSON format with consistent structure:

```json
{
  "data": { },
  "message": "Success",
  "timestamp": "2026-01-31T12:00:00Z"
}
```

---

## API Endpoints

### Health & Info

#### Get API Status
```http
GET /
```

**Response:**
```json
{
  "message": "Portfolio API is running",
  "version": "1.0.0"
}
```

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy"
}
```

---

### Profile

#### Get Profile Information
```http
GET /api/profile
```

**Description:** Retrieve personal profile information

**Response:** `200 OK`
```json
{
  "name": "DJ",
  "title": "Data Scientist & Software Engineer",
  "tagline": "Transforming Data into Intelligent Solutions",
  "email": "contact@yourportfolio.com",
  "location": "India",
  "education": {
    "degree": "B.Tech Computer Science Engineering",
    "specialization": "Data Science",
    "university": "UPES University",
    "year": "2024"
  },
  "experience_years": "2+",
  "current_company": "Navikenz",
  "current_role": "Software Engineer (Data Scientist)",
  "social_links": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

---

### Projects

#### Get All Projects
```http
GET /api/projects?category={category}&featured={true|false}
```

**Description:** Retrieve all projects with optional filtering

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "machine-learning", "security")
- `featured` (optional): Filter by featured status (true/false)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "TunnelFury-VPN",
    "description": "A VPN solution focused on security and speed functionality.",
    "long_description": "A VPN implementation project demonstrating network security concepts...",
    "tech_stack": ["Python", "Networking", "Security"],
    "github_url": "https://github.com/Dhanraj10/TunnelFury-VPN",
    "live_url": null,
    "image_url": null,
    "featured": true,
    "category": "security"
  }
]
```

#### Get Featured Projects
```http
GET /api/projects/featured
```

**Description:** Retrieve only featured projects

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "TunnelFury-VPN",
    "featured": true,
    ...
  }
]
```

#### Get Project Categories
```http
GET /api/projects/categories
```

**Description:** Get list of all project categories

**Response:** `200 OK`
```json
{
  "categories": [
    "security",
    "machine-learning",
    "computer-vision",
    "backend"
  ]
}
```

#### Get Project by ID
```http
GET /api/projects/{project_id}
```

**Description:** Retrieve a specific project by ID

**Path Parameters:**
- `project_id` (integer): The project ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "TunnelFury-VPN",
  "description": "A VPN solution focused on security and speed functionality.",
  ...
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "Project not found"
}
```

---

### Achievements

#### Get All Achievements
```http
GET /api/projects/achievements/all
```

**Description:** Retrieve all achievements and milestones

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "🏆 Xethon Hackathon Winner",
    "description": "First place winner at Xethon Hackathon...",
    "date": "2023",
    "icon": "trophy",
    "link": null
  }
]
```

---

### Experience

#### Get All Work Experience
```http
GET /api/projects/experience/all
```

**Description:** Retrieve all work experience entries

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "company": "Navikenz",
    "role": "Software Engineer (Data Scientist)",
    "duration": "2+ years",
    "start_date": "2024",
    "end_date": "Present",
    "description": "Working on enterprise-level data science solutions...",
    "responsibilities": [
      "Developing and deploying machine learning models",
      "Building automated data pipelines"
    ],
    "tech_stack": ["Python", "TensorFlow", "AWS", "Docker"],
    "company_logo": null
  }
]
```

---

### Skills

#### Get All Skills
```http
GET /api/projects/skills/all?category={category}
```

**Description:** Retrieve all skills with optional category filter

**Query Parameters:**
- `category` (optional): Filter by category ("languages", "frameworks", "tools", "databases")

**Response:** `200 OK`
```json
[
  {
    "name": "Python",
    "level": 95,
    "category": "languages"
  },
  {
    "name": "TensorFlow",
    "level": 88,
    "category": "frameworks"
  }
]
```

---

### Education

#### Get Education Details
```http
GET /api/projects/education/all
```

**Description:** Retrieve education information

**Response:** `200 OK`
```json
[
  {
    "degree": "Bachelor of Technology (B.Tech)",
    "institution": "UPES University",
    "specialization": "Computer Science Engineering - Data Science",
    "duration": "2020 - 2024",
    "gpa": null,
    "achievements": [
      "Specialized in Data Science and Machine Learning",
      "Completed capstone project on predictive analytics"
    ]
  }
]
```

---

### Contact

#### Submit Contact Form
```http
POST /api/contact
```

**Description:** Submit a contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Inquiry",
  "message": "I would like to discuss a potential collaboration opportunity..."
}
```

**Validation Rules:**
- `name`: 2-100 characters
- `email`: Valid email format
- `subject`: 5-200 characters
- `message`: 10-2000 characters

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

**Error Response:** `422 Unprocessable Entity`
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## Data Models

### Project
```python
class Project(BaseModel):
    id: int
    title: str
    description: str
    long_description: Optional[str] = None
    tech_stack: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    category: str = "other"
```

### Achievement
```python
class Achievement(BaseModel):
    id: int
    title: str
    description: str
    date: str
    icon: str = "trophy"
    link: Optional[str] = None
```

### Experience
```python
class Experience(BaseModel):
    id: int
    company: str
    role: str
    duration: str
    start_date: str
    end_date: Optional[str] = "Present"
    description: str
    responsibilities: List[str]
    tech_stack: List[str]
    company_logo: Optional[str] = None
```

### Skill
```python
class Skill(BaseModel):
    name: str
    level: int  # 1-100
    category: str  # "languages", "frameworks", "tools", "databases"
```

### Education
```python
class Education(BaseModel):
    degree: str
    institution: str
    specialization: str
    duration: str
    gpa: Optional[str] = None
    achievements: List[str] = []
```

### ContactForm
```python
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
```

---

## Request/Response Flow

### Successful Request Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │ 1. HTTP Request
     ▼
┌─────────────────┐
│  FastAPI App    │
└────┬────────────┘
     │ 2. Route Matching
     ▼
┌─────────────────┐
│  Middleware     │
│  - CORS Check   │
└────┬────────────┘
     │ 3. Middleware Processing
     ▼
┌─────────────────┐
│  Route Handler  │
└────┬────────────┘
     │ 4. Input Validation (Pydantic)
     ▼
┌─────────────────┐
│  Business Logic │
│  (Service Layer)│
└────┬────────────┘
     │ 5. Data Processing
     ▼
┌─────────────────┐
│  Data Source    │
│  (In-memory)    │
└────┬────────────┘
     │ 6. Data Retrieval
     ▼
┌─────────────────┐
│  Response       │
│  Serialization  │
└────┬────────────┘
     │ 7. JSON Response
     ▼
┌──────────┐
│  Client  │
└──────────┘
```

### Error Handling Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │ Invalid Request
     ▼
┌─────────────────┐
│  Input          │
│  Validation     │
│  (Pydantic)     │
└────┬────────────┘
     │ Validation Error
     ▼
┌─────────────────┐
│  Exception      │
│  Handler        │
└────┬────────────┘
     │ Format Error
     ▼
┌─────────────────┐
│  422 Response   │
│  with Details   │
└────┬────────────┘
     │
     ▼
┌──────────┐
│  Client  │
└──────────┘
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "detail": "Error message or array of validation errors"
}
```

### Validation Errors (422)
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    },
    {
      "loc": ["body", "message"],
      "msg": "ensure this value has at least 10 characters",
      "type": "value_error.any_str.min_length"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "detail": "Project not found"
}
```

### Server Error (500)
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

### Contact Form Rate Limiting

**Strategy:** Prevent spam and abuse

**Implementation (Future):**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/contact")
@limiter.limit("5/hour")  # 5 submissions per hour per IP
async def submit_contact_form(form: ContactForm):
    ...
```

**Rate Limit Response (429):**
```json
{
  "detail": "Rate limit exceeded. Try again later."
}
```

---

## API Versioning

### Current Version: v1 (Implicit)

All endpoints are currently version 1 (no explicit version in URL).

### Future Versioning Strategy

When breaking changes are needed:

**Option 1: URL Versioning**
```
/api/v1/projects  (current)
/api/v2/projects  (new version)
```

**Option 2: Header Versioning**
```http
GET /api/projects
Accept: application/vnd.api.v2+json
```

---

## Future Enhancements

### 1. Pagination
```http
GET /api/projects?page=1&per_page=10
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 50,
    "pages": 5
  }
}
```

### 2. Sorting
```http
GET /api/projects?sort_by=title&order=asc
```

### 3. Filtering
```http
GET /api/projects?tech_stack=Python&featured=true
```

### 4. Search
```http
GET /api/projects/search?q=machine+learning
```

### 5. Authentication
```http
POST /api/auth/login
Authorization: Bearer <token>
```

### 6. HATEOAS (Hypermedia)
```json
{
  "id": 1,
  "title": "Project",
  "_links": {
    "self": "/api/projects/1",
    "comments": "/api/projects/1/comments"
  }
}
```

---

## API Usage Examples

### JavaScript (Frontend)

```javascript
// Get all projects
const response = await fetch('http://localhost:8000/api/projects');
const projects = await response.json();

// Get project by ID
const project = await fetch('http://localhost:8000/api/projects/1');
const data = await project.json();

// Submit contact form
const formData = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Inquiry",
  message: "Hello, I would like to connect..."
};

const response = await fetch('http://localhost:8000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

const result = await response.json();
console.log(result.message);
```

### Python

```python
import requests

# Get all projects
response = requests.get('http://localhost:8000/api/projects')
projects = response.json()

# Get featured projects
response = requests.get('http://localhost:8000/api/projects/featured')
featured = response.json()

# Submit contact form
form_data = {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello, I would like to connect..."
}

response = requests.post(
    'http://localhost:8000/api/contact',
    json=form_data
)

result = response.json()
print(result['message'])
```

### cURL

```bash
# Get all projects
curl http://localhost:8000/api/projects

# Get project by ID
curl http://localhost:8000/api/projects/1

# Submit contact form
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello, I would like to connect..."
  }'
```

---

## API Testing

### Using Swagger UI
1. Navigate to `http://localhost:8000/api/docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

### Using Postman
1. Import OpenAPI spec from `/api/docs`
2. Create requests for each endpoint
3. Save as collection for reuse

---

**Last Updated**: January 2026  
**Version**: 1.0.0
