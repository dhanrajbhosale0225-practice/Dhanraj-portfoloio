# Software Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture Principles](#architecture-principles)
3. [System Architecture](#system-architecture)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Design Patterns](#design-patterns)
7. [Security Architecture](#security-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Scalability & Performance](#scalability--performance)
10. [Monitoring & Observability](#monitoring--observability)

---

## Overview

### Vision
This portfolio website demonstrates modern full-stack development practices with a focus on:
- **Clean Architecture**: Separation of concerns, modularity, and maintainability
- **Data-Driven Design**: Analytics-ready architecture for future enhancements
- **Developer Experience**: Easy to understand, extend, and maintain
- **Production-Ready**: Security, performance, and scalability built-in

### Technology Stack

#### Frontend (Presentation Layer)
- **Framework**: Next.js 14 (React 18) with App Router
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4 (Utility-first CSS)
- **Animations**: Framer Motion
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **HTTP Client**: Native Fetch API

#### Backend (API Layer)
- **Framework**: FastAPI (Python 3.11+)
- **Validation**: Pydantic 2.5
- **ASGI Server**: Uvicorn
- **Email Service**: SMTP (configurable)

#### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## Architecture Principles

### 1. **Separation of Concerns**
Each layer has a single, well-defined responsibility:
- **Frontend**: User interface and experience
- **Backend**: Business logic and data management
- **Services**: Third-party integrations (email, analytics)

### 2. **API-First Design**
- RESTful API design principles
- Clear contract between frontend and backend
- OpenAPI/Swagger documentation
- Versioned endpoints for future compatibility

### 3. **Type Safety**
- TypeScript on frontend ensures compile-time type checking
- Pydantic on backend provides runtime validation
- Reduces bugs and improves developer experience

### 4. **Modularity & Reusability**
- Component-based architecture (React)
- Reusable UI components library
- Service-oriented backend structure
- DRY (Don't Repeat Yourself) principle

### 5. **Security by Design**
- Input validation at all entry points
- CORS configuration
- Environment-based secrets management
- Rate limiting for contact forms
- XSS and CSRF protection

### 6. **Performance First**
- Next.js Static Site Generation (SSG)
- API response caching strategies
- Lazy loading and code splitting
- Image optimization
- Minimal JavaScript payload

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         End Users                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CDN / Edge Network                            │
│                    (Vercel Edge)                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌──────────────────────────┐
│   Frontend Application    │   │   Backend API Server     │
│   (Next.js 14)            │   │   (FastAPI)              │
│                           │   │                          │
│  ┌─────────────────────┐ │   │  ┌────────────────────┐ │
│  │  App Router         │ │   │  │  API Routes        │ │
│  │  - page.tsx         │ │   │  │  - /api/projects   │ │
│  │  - layout.tsx       │ │   │  │  - /api/contact    │ │
│  └─────────────────────┘ │   │  │  - /api/health     │ │
│                           │   │  └────────────────────┘ │
│  ┌─────────────────────┐ │   │                          │
│  │  Components         │ │   │  ┌────────────────────┐ │
│  │  - UI Components    │ │   │  │  Services          │ │
│  │  - Layout           │ │   │  │  - Email Service   │ │
│  │  - Sections         │ │   │  │  - Validation      │ │
│  └─────────────────────┘ │   │  └────────────────────┘ │
│                           │   │                          │
│  ┌─────────────────────┐ │   │  ┌────────────────────┐ │
│  │  Hooks & Utils      │ │   │  │  Models/Schemas    │ │
│  │  - useTheme         │ │   │  │  - Pydantic Models │ │
│  │  - useIntersection  │ │   │  └────────────────────┘ │
│  └─────────────────────┘ │   │                          │
└───────────────────────────┘   └──────────────────────────┘
                │                           │
                │                           ▼
                │               ┌──────────────────────────┐
                │               │  External Services       │
                │               │  - SMTP Email Server     │
                │               │  - Analytics (Future)    │
                │               └──────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────┐
│                    Browser Storage                             │
│                    - LocalStorage (Theme)                      │
│                    - SessionStorage (State)                    │
└───────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Component Hierarchy

```
app/
├── layout.tsx (Root Layout)
│   └── Providers (Theme, etc.)
│
├── page.tsx (Home Page)
│   ├── Hero Section
│   ├── About Section
│   ├── Projects Section
│   ├── Experience Section
│   ├── Achievements Section
│   └── Contact Section
│
└── projects/
    └── page.tsx (Projects Page)
        └── ProjectsList

components/
├── layout/
│   ├── Navbar (Navigation + Theme Toggle)
│   ├── Footer (Social Links)
│   └── ThemeToggle (Dark/Light Mode)
│
├── sections/
│   ├── Hero (Introduction)
│   ├── About (Personal Info)
│   ├── Projects (Project Cards)
│   ├── Experience (Timeline)
│   ├── Achievements (Highlights)
│   └── Contact (Contact Form)
│
├── ui/
│   ├── Button (Reusable Button)
│   ├── Card (Container Component)
│   ├── Input (Form Input)
│   └── Modal (Overlay)
│
└── animations/
    ├── FadeIn (Scroll Animations)
    └── ParticleBackground (Visual Effects)
```

### Backend Component Architecture

```
app/
├── main.py (FastAPI Application Entry Point)
│   ├── CORS Middleware
│   ├── Router Registration
│   └── Global Exception Handlers
│
├── api/
│   └── routes/
│       ├── projects.py (Project CRUD)
│       └── contact.py (Contact Form)
│
├── core/
│   ├── config.py (Settings Management)
│   └── security.py (Security Utilities)
│
├── models/
│   └── schemas.py (Pydantic Models)
│       ├── Project
│       ├── Experience
│       ├── Achievement
│       ├── Skill
│       └── ContactForm
│
└── services/
    └── email_service.py (Email Integration)
```

---

## Data Flow

### 1. Page Load Flow (SSG - Static Site Generation)

```
User Request → Vercel Edge → Pre-rendered HTML → Browser
                                  ↓
                          Hydration (React)
                                  ↓
                          Interactive Application
```

**Benefits:**
- Instant page loads (served from CDN)
- SEO-friendly (fully rendered HTML)
- No API calls needed for initial render

### 2. API Data Flow (Contact Form Example)

```
User Action (Submit Form)
    ↓
Frontend Validation (TypeScript + HTML5)
    ↓
POST /api/contact
    ↓
Backend Validation (Pydantic)
    ↓
Rate Limiting Check
    ↓
Input Sanitization
    ↓
Email Service
    ↓
SMTP Server
    ↓
Email Delivered
    ↓
Success Response
    ↓
UI Feedback (Success Message)
```

### 3. Project Data Flow

```
Backend API (/api/projects)
    ↓
In-Memory Data Store (PROJECTS list)
    ↓
Pydantic Model Validation
    ↓
JSON Response
    ↓
Frontend Fetch
    ↓
State Management (useState)
    ↓
Component Re-render
    ↓
UI Display
```

**Future Enhancement:** Replace in-memory storage with database (PostgreSQL/MongoDB)

---

## Design Patterns

### Frontend Patterns

#### 1. **Component Composition Pattern**
```typescript
// Atomic Design: Atoms → Molecules → Organisms
<Card>
  <CardHeader>
    <Title />
  </CardHeader>
  <CardBody>
    <Content />
  </CardBody>
</Card>
```

#### 2. **Custom Hooks Pattern**
```typescript
// Encapsulate reusable logic
const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  // Logic for theme switching
  return { theme, toggleTheme };
};
```

#### 3. **Container/Presentational Pattern**
- **Container**: Handles logic and state
- **Presentational**: Pure UI components

#### 4. **Higher-Order Component (HOC) Pattern**
```typescript
// FadeIn animation wrapper
const FadeIn = ({ children }) => {
  // Animation logic
  return <motion.div>{children}</motion.div>;
};
```

### Backend Patterns

#### 1. **Layered Architecture**
```
Routes (API Endpoints)
    ↓
Services (Business Logic)
    ↓
Models (Data Validation)
    ↓
External Services (Email, DB)
```

#### 2. **Dependency Injection**
```python
# Settings injected via Pydantic
settings = Settings()  # Reads from .env
```

#### 3. **Repository Pattern** (Future)
```python
# Abstract data access
class ProjectRepository:
    async def get_all(self) -> List[Project]:
        pass
    async def get_by_id(self, id: int) -> Project:
        pass
```

#### 4. **Service Layer Pattern**
```python
# EmailService handles all email-related logic
class EmailService:
    async def send_contact_email(self, form: ContactForm):
        # SMTP logic
        pass
```

---

## Security Architecture

### Defense in Depth Strategy

#### 1. **Input Validation (Layer 1)**
- **Frontend**: HTML5 validation + TypeScript types
- **Backend**: Pydantic schema validation
- **Example**:
  ```python
  class ContactForm(BaseModel):
      name: str = Field(..., min_length=2, max_length=100)
      email: EmailStr  # Validates email format
      message: str = Field(..., min_length=10, max_length=2000)
  ```

#### 2. **CORS Configuration (Layer 2)**
```python
ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Development
    "https://yourportfolio.vercel.app",  # Production
]
```

#### 3. **Rate Limiting (Layer 3)**
- Prevent abuse of contact form
- Implement at API gateway or application level
- **Recommendation**: Use middleware like `slowapi`

#### 4. **Secrets Management (Layer 4)**
- Environment variables for sensitive data
- Never commit `.env` files
- Use secret management services in production (AWS Secrets Manager, Vercel Environment Variables)

#### 5. **HTTPS Enforcement (Layer 5)**
- All production traffic over HTTPS
- HSTS headers
- Secure cookies

#### 6. **XSS Protection (Layer 6)**
- React escapes output by default
- Content Security Policy (CSP) headers
- Sanitize user input

### Security Checklist
- [x] Input validation on frontend and backend
- [x] CORS configured
- [ ] Rate limiting implemented
- [x] Environment variables for secrets
- [x] HTTPS in production
- [x] XSS protection (React default)
- [ ] CSRF tokens (future if adding auth)
- [ ] SQL injection protection (future with DB)

---

## Deployment Architecture

### Current Deployment Strategy

#### Frontend Deployment (Vercel)
```
GitHub Repository
    ↓
Vercel CI/CD Pipeline
    ↓
Build Process (next build)
    ↓
Static Files + Serverless Functions
    ↓
Vercel Edge Network (Global CDN)
    ↓
End Users
```

**Configuration:**
- Root directory: `frontend/`
- Build command: `npm run build`
- Output directory: `.next`
- Environment variables: `NEXT_PUBLIC_API_URL`

#### Backend Deployment (Railway/Render)
```
GitHub Repository
    ↓
Railway/Render CI/CD
    ↓
Docker Build (or Python runtime)
    ↓
Container Deployment
    ↓
HTTPS Endpoint
    ↓
API Consumers
```

**Configuration:**
- Root directory: `backend/`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment variables: SMTP credentials, ALLOWED_ORIGINS

### Docker Deployment (Alternative)

```
docker-compose.yml
    ↓
Frontend Container (Port 3000) + Backend Container (Port 8000)
    ↓
Nginx Reverse Proxy (Optional)
    ↓
End Users
```

### Deployment Environments

| Environment | Frontend | Backend | Purpose |
|------------|----------|---------|---------|
| **Development** | localhost:3000 | localhost:8000 | Local development |
| **Staging** | staging.vercel.app | staging-api.railway.app | Testing before production |
| **Production** | portfolio.vercel.app | api.railway.app | Live environment |

---

## Scalability & Performance

### Frontend Performance Optimization

#### 1. **Static Site Generation (SSG)**
```typescript
// Pre-render pages at build time
export default function Home() {
  // No API calls needed - data fetched at build time
}
```

#### 2. **Code Splitting**
- Next.js automatically splits code by route
- Lazy loading for heavy components
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
});
```

#### 3. **Image Optimization**
```typescript
import Image from 'next/image';
<Image src="/hero.jpg" width={800} height={600} alt="Hero" />
// Automatic: WebP conversion, lazy loading, responsive sizes
```

#### 4. **Font Optimization**
```typescript
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
// Self-hosted, optimized loading
```

#### 5. **Caching Strategy**
- Static assets cached at CDN edge
- Service Worker for offline support (future)
- API responses cached with SWR/React Query (future)

### Backend Performance Optimization

#### 1. **Async/Await for Non-Blocking I/O**
```python
async def send_email():
    # Non-blocking email sending
    await smtp.send(...)
```

#### 2. **Connection Pooling** (Future with Database)
```python
# Reuse database connections
engine = create_async_engine("postgresql://...", pool_size=20)
```

#### 3. **Caching Layer** (Future)
```python
# Redis for caching API responses
@cache(expire=3600)
async def get_projects():
    return projects
```

#### 4. **Response Compression**
```python
# Gzip compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
```

### Scalability Strategies

#### Horizontal Scaling
```
Load Balancer
    ↓
┌────────┬────────┬────────┐
│ API 1  │ API 2  │ API 3  │  (Multiple backend instances)
└────────┴────────┴────────┘
    ↓
Database (Shared)
```

#### Database Scaling (Future)
- **Read Replicas**: Scale read-heavy operations
- **Sharding**: Partition data across databases
- **Caching**: Redis for frequently accessed data

#### CDN Strategy
- Static assets served from edge locations worldwide
- Reduces latency for global users
- Automatic failover and high availability

---

## Monitoring & Observability

### Metrics to Track

#### 1. **Application Metrics**
- API response times
- Error rates (4xx, 5xx)
- Request throughput
- Active users

#### 2. **Infrastructure Metrics**
- CPU usage
- Memory consumption
- Network I/O
- Container health

#### 3. **Business Metrics**
- Contact form submissions
- Page views (by section)
- Project views
- User engagement (time on site)

### Logging Strategy

#### Structured Logging (Backend)
```python
import logging

logger = logging.getLogger(__name__)
logger.info("Contact form submitted", extra={
    "email": form.email,
    "timestamp": datetime.now(),
    "user_agent": request.headers.get("user-agent")
})
```

#### Log Levels
- **DEBUG**: Detailed development info
- **INFO**: General application flow
- **WARNING**: Unexpected but handled events
- **ERROR**: Runtime errors
- **CRITICAL**: System failures

### Error Tracking

#### Frontend Error Boundary
```typescript
// Catch and log React errors
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error(error, errorInfo);
  }
}
```

#### Backend Exception Handling
```python
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})
```

### Recommended Tools

| Category | Tool | Purpose |
|----------|------|---------|
| **APM** | Sentry | Error tracking & performance |
| **Logging** | Logfire / CloudWatch | Centralized log management |
| **Uptime** | UptimeRobot | Service availability monitoring |
| **Analytics** | Vercel Analytics / Google Analytics | User behavior tracking |
| **Performance** | Lighthouse CI | Frontend performance metrics |

---

## Future Enhancements

### Phase 1: Data Layer
- [ ] Integrate PostgreSQL/MongoDB for data persistence
- [ ] Implement caching with Redis
- [ ] Add database migrations (Alembic for Python)

### Phase 2: Advanced Features
- [ ] User authentication (NextAuth.js)
- [ ] Admin dashboard for content management
- [ ] Blog/articles section with CMS
- [ ] Real-time features (WebSockets)

### Phase 3: Analytics & ML
- [ ] User behavior analytics
- [ ] A/B testing framework
- [ ] Recommendation engine for projects
- [ ] Predictive analytics for visitor insights

### Phase 4: DevOps & Infrastructure
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Automated testing (unit, integration, e2e)
- [ ] Infrastructure as Code (Terraform/Pulumi)

### Phase 5: Advanced Monitoring
- [ ] Distributed tracing (OpenTelemetry)
- [ ] Custom dashboards (Grafana)
- [ ] Alerting system (PagerDuty)
- [ ] Synthetic monitoring

---

## Architecture Decision Records (ADRs)

### ADR-001: Next.js for Frontend
**Decision**: Use Next.js 14 with App Router  
**Rationale**:
- SSG for optimal performance and SEO
- Built-in TypeScript support
- Rich ecosystem and community
- Easy deployment to Vercel
- Excellent developer experience

### ADR-002: FastAPI for Backend
**Decision**: Use FastAPI instead of Django/Flask  
**Rationale**:
- High performance (async/await)
- Automatic API documentation (OpenAPI)
- Modern Python with type hints
- Easy to learn and maintain
- Perfect for API-only backend

### ADR-003: TypeScript for Type Safety
**Decision**: Use TypeScript instead of JavaScript  
**Rationale**:
- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code
- Industry standard for production apps

### ADR-004: Tailwind CSS for Styling
**Decision**: Use Tailwind CSS instead of CSS-in-JS  
**Rationale**:
- Utility-first approach speeds development
- Consistent design system
- Optimized production builds (purging unused CSS)
- Easy to maintain and customize

### ADR-005: In-Memory Data Store (Temporary)
**Decision**: Store portfolio data in Python lists  
**Rationale**:
- Simple for MVP/portfolio showcase
- No database setup complexity
- Fast development iteration
- Easy to migrate to database later

---

## Contributing to Architecture

When making architectural changes:

1. **Propose**: Create an Architecture Decision Record (ADR)
2. **Discuss**: Get feedback from team/community
3. **Document**: Update this document
4. **Implement**: Make changes with tests
5. **Review**: Code review focusing on architectural impact

---

## Conclusion

This architecture is designed to be:
- **Scalable**: Can grow from personal portfolio to enterprise application
- **Maintainable**: Clear separation of concerns and modular design
- **Performant**: Optimized for speed and user experience
- **Secure**: Defense-in-depth security strategy
- **Developer-Friendly**: Easy to understand and contribute to

The architecture demonstrates best practices from data science, technical architecture, and design thinking perspectives, making it suitable for both learning and production use.

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintained By**: Dhanraj Bhosale
