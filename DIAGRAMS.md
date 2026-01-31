# System Architecture Diagrams

This document provides visual representations of the portfolio website architecture.

---

## Table of Contents
1. [System Context Diagram](#system-context-diagram)
2. [Container Diagram](#container-diagram)
3. [Component Diagram](#component-diagram)
4. [Deployment Diagram](#deployment-diagram)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Sequence Diagrams](#sequence-diagrams)

---

## System Context Diagram

Shows the big picture of the portfolio system and how it interacts with external systems and users.

```
                         ┌──────────────────┐
                         │   Web Browsers   │
                         │  (End Users)     │
                         └────────┬─────────┘
                                  │
                                  │ HTTPS
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                  │
         │           Portfolio Website System               │
         │                                                  │
         │  ┌──────────────┐         ┌─────────────────┐  │
         │  │   Frontend   │ ◄────► │    Backend      │  │
         │  │  (Next.js)   │   API  │   (FastAPI)     │  │
         │  └──────────────┘         └────────┬────────┘  │
         │                                    │            │
         └────────────────────────────────────┼────────────┘
                                              │
                     ┌────────────────────────┴─────────────────────┐
                     │                        │                     │
                     ▼                        ▼                     ▼
            ┌──────────────┐        ┌──────────────┐     ┌──────────────┐
            │ SMTP Server  │        │   CDN        │     │  Analytics   │
            │  (Gmail)     │        │  (Vercel)    │     │  (Optional)  │
            └──────────────┘        └──────────────┘     └──────────────┘
```

---

## Container Diagram

Shows the high-level technical building blocks of the system.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Portfolio Website                              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  Frontend Application (Container 1)                            │   │
│  ├────────────────────────────────────────────────────────────────┤   │
│  │  Technology: Next.js 14, React 18, TypeScript                  │   │
│  │  Deployment: Vercel (Global CDN)                               │   │
│  │                                                                 │   │
│  │  Responsibilities:                                              │   │
│  │  • User interface rendering                                    │   │
│  │  • Client-side routing (App Router)                            │   │
│  │  • Static Site Generation (SSG)                                │   │
│  │  • API consumption                                              │   │
│  │  • Theme management (dark/light mode)                          │   │
│  └─────────────────────────┬───────────────────────────────────────┘   │
│                            │                                            │
│                            │ REST API (JSON over HTTPS)                 │
│                            │                                            │
│  ┌─────────────────────────▼───────────────────────────────────────┐   │
│  │  Backend API (Container 2)                                      │   │
│  ├────────────────────────────────────────────────────────────────┤   │
│  │  Technology: FastAPI, Python 3.11, Pydantic                    │   │
│  │  Deployment: Railway/Render (Container)                        │   │
│  │                                                                 │   │
│  │  Responsibilities:                                              │   │
│  │  • RESTful API endpoints                                       │   │
│  │  • Business logic                                               │   │
│  │  • Data validation                                              │   │
│  │  • Email service integration                                    │   │
│  │  • CORS management                                              │   │
│  └─────────────────────────┬───────────────────────────────────────┘   │
│                            │                                            │
│                            │ SMTP                                       │
│                            │                                            │
│  ┌─────────────────────────▼───────────────────────────────────────┐   │
│  │  Email Service (External System)                               │   │
│  ├────────────────────────────────────────────────────────────────┤   │
│  │  Provider: Gmail SMTP, SendGrid, etc.                          │   │
│  │                                                                 │   │
│  │  Purpose:                                                       │   │
│  │  • Send contact form emails                                     │   │
│  │  • Notification delivery                                        │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Component Diagram

### Frontend Components

```
┌──────────────────────────────────────────────────────────────────┐
│                   Frontend Application                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  App Router (Next.js 14)                                │    │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐        │    │
│  │  │ Home   │  │Projects│  │ About  │  │Contact │        │    │
│  │  │ page.tsx│  │ page  │  │ page   │  │ page   │        │    │
│  │  └────────┘  └────────┘  └────────┘  └────────┘        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Components                                              │    │
│  │                                                           │    │
│  │  Layout Components          UI Components                │    │
│  │  ├─ Navbar                  ├─ Button                    │    │
│  │  ├─ Footer                  ├─ Card                      │    │
│  │  └─ ThemeToggle             ├─ Input                     │    │
│  │                             └─ Modal                     │    │
│  │  Section Components         Animation Components         │    │
│  │  ├─ Hero                    ├─ FadeIn                    │    │
│  │  ├─ About                   └─ ParticleBackground        │    │
│  │  ├─ Projects                                             │    │
│  │  ├─ Experience                                           │    │
│  │  ├─ Achievements                                         │    │
│  │  └─ Contact                                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Custom Hooks                                            │    │
│  │  ├─ useTheme() - Theme management                        │    │
│  │  ├─ useIntersectionObserver() - Scroll animations       │    │
│  │  └─ useMediaQuery() - Responsive utilities              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  API Client                                              │    │
│  │  • Fetch wrapper for API calls                          │    │
│  │  • Error handling                                        │    │
│  │  • Request/response interceptors                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Backend Components

```
┌──────────────────────────────────────────────────────────────────┐
│                    Backend API Application                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  FastAPI Application (main.py)                           │    │
│  │  • CORS Middleware                                       │    │
│  │  • Router Registration                                   │    │
│  │  • Exception Handlers                                    │    │
│  │  • OpenAPI Documentation                                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  API Routes                                              │    │
│  │                                                           │    │
│  │  /api/profile      - Get profile information            │    │
│  │  /api/projects/*   - Project CRUD operations            │    │
│  │  /api/contact      - Contact form submission            │    │
│  │  /api/health       - Health check                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Business Logic Layer                                    │    │
│  │                                                           │    │
│  │  Projects Service                                        │    │
│  │  • Filter projects by category                          │    │
│  │  • Get featured projects                                │    │
│  │  • Project search                                        │    │
│  │                                                           │    │
│  │  Contact Service                                         │    │
│  │  • Form validation                                       │    │
│  │  • Email sending                                         │    │
│  │  • Rate limiting                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Data Models (Pydantic)                                  │    │
│  │  • Project                                               │    │
│  │  • Experience                                            │    │
│  │  • Achievement                                           │    │
│  │  • Skill                                                 │    │
│  │  • Education                                             │    │
│  │  • ContactForm                                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Configuration & Security                                │    │
│  │  • Settings (Environment Variables)                     │    │
│  │  • CORS Configuration                                    │    │
│  │  • Input Sanitization                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Deployment Diagram

### Production Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                           Internet                                    │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                │ HTTPS (443)
                                │
        ┌───────────────────────┴────────────────────────┐
        │                       │                        │
        ▼                       ▼                        ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ Vercel Edge  │        │ Vercel Edge  │        │ Vercel Edge  │
│   (USA)      │        │   (Europe)   │        │   (Asia)     │
└──────┬───────┘        └──────┬───────┘        └──────┬───────┘
       │                       │                       │
       └───────────────────────┴───────────────────────┘
                               │
                    Frontend (Next.js App)
                    - Static Assets (HTML, CSS, JS)
                    - Serverless Functions
                    - Edge Functions
                               │
                               │ API Calls (HTTPS)
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Railway/Render      │
                    │  Container Platform  │
                    ├──────────────────────┤
                    │                      │
                    │  ┌────────────────┐ │
                    │  │ Docker         │ │
                    │  │ Container      │ │
                    │  ├────────────────┤ │
                    │  │ FastAPI App    │ │
                    │  │ + Uvicorn      │ │
                    │  └────────────────┘ │
                    │                      │
                    └──────────┬───────────┘
                               │
                               │ SMTP (587)
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Gmail SMTP         │
                    │   Email Service      │
                    └──────────────────────┘
```

### Docker Deployment (Alternative)

```
┌────────────────────────────────────────────────────────┐
│               Docker Host Machine                       │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Docker Network (bridge)                        │  │
│  │                                                  │  │
│  │  ┌───────────────┐      ┌──────────────────┐   │  │
│  │  │  Frontend     │      │  Backend         │   │  │
│  │  │  Container    │◄────►│  Container       │   │  │
│  │  ├───────────────┤      ├──────────────────┤   │  │
│  │  │ Next.js       │      │ FastAPI          │   │  │
│  │  │ Port: 3000    │      │ Port: 8000       │   │  │
│  │  └───────────────┘      └──────────────────┘   │  │
│  │                                                  │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Docker Compose orchestrates both containers           │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### Contact Form Submission Flow

```
┌──────┐                                                    ┌──────┐
│User  │                                                    │Email │
│      │                                                    │Inbox │
└───┬──┘                                                    └───▲──┘
    │                                                           │
    │ 1. Fill form                                              │
    │                                                           │
    ▼                                                           │
┌────────────┐                                                 │
│  Frontend  │                                                 │
│  (React)   │                                                 │
└────┬───────┘                                                 │
     │                                                          │
     │ 2. Client-side validation                               │
     │                                                          │
     │ 3. POST /api/contact                                    │
     │                                                          │
     ▼                                                          │
┌────────────┐                                                 │
│  Backend   │                                                 │
│  (FastAPI) │                                                 │
└────┬───────┘                                                 │
     │                                                          │
     │ 4. Server-side validation (Pydantic)                    │
     │                                                          │
     │ 5. Sanitize input                                       │
     │                                                          │
     │ 6. Check rate limit                                     │
     │                                                          │
     ▼                                                          │
┌────────────┐                                                 │
│   Email    │                                                 │
│  Service   │                                                 │
└────┬───────┘                                                 │
     │                                                          │
     │ 7. Send via SMTP                                        │
     │                                                          │
     └──────────────────────────────────────────────────────────┘
     
     8. Response to user
     
     ┌──────┐
     │User  │ ← "Message sent successfully!"
     └──────┘
```

### Project View Flow

```
User Request
     │
     ▼
┌─────────────┐
│  Browser    │
└─────┬───────┘
      │
      │ GET /projects
      │
      ▼
┌─────────────┐
│  Vercel CDN │ ← Pre-rendered HTML (SSG)
└─────┬───────┘
      │
      │ Return cached HTML
      │
      ▼
┌─────────────┐
│  Browser    │
│  (Hydration)│
└─────┬───────┘
      │
      │ (Optional) Fetch fresh data
      │
      ▼
┌─────────────┐
│  Backend API│
│  /api/projects
└─────┬───────┘
      │
      │ Return JSON
      │
      ▼
┌─────────────┐
│  Browser    │ → Display projects
└─────────────┘
```

---

## Sequence Diagrams

### User Visits Homepage

```
User         CDN          Frontend      Backend
 │            │              │            │
 │  GET /     │              │            │
 ├───────────►│              │            │
 │            │              │            │
 │            │ Pre-rendered │            │
 │            │     HTML     │            │
 │◄───────────┤              │            │
 │            │              │            │
 │  Render    │              │            │
 │  (React    │              │            │
 │  Hydration)│              │            │
 │            │              │            │
 │            │   (Optional) │            │
 │            │   GET /api/  │            │
 │            │   profile    │            │
 │            ├──────────────┼───────────►│
 │            │              │            │
 │            │              │   Profile  │
 │            │              │    Data    │
 │            │◄─────────────┼────────────┤
 │            │              │            │
 │  Updated   │              │            │
 │   UI       │              │            │
 │◄───────────┤              │            │
 │            │              │            │
```

### Contact Form Submission

```
User      Frontend    Backend    EmailService    Email
 │          │           │            │             │
 │  Fill    │           │            │             │
 │  Form    │           │            │             │
 ├─────────►│           │            │             │
 │          │           │            │             │
 │  Submit  │           │            │             │
 ├─────────►│           │            │             │
 │          │           │            │             │
 │          │ Validate  │            │             │
 │          │           │            │             │
 │          │ POST      │            │             │
 │          │ /contact  │            │             │
 │          ├──────────►│            │             │
 │          │           │            │             │
 │          │           │ Validate   │             │
 │          │           │ (Pydantic) │             │
 │          │           │            │             │
 │          │           │ Send Email │             │
 │          │           ├───────────►│             │
 │          │           │            │             │
 │          │           │            │ SMTP Send   │
 │          │           │            ├────────────►│
 │          │           │            │             │
 │          │           │            │   Success   │
 │          │           │◄───────────┼─────────────┤
 │          │           │            │             │
 │          │  Success  │            │             │
 │          │  Response │            │             │
 │          │◄──────────┤            │             │
 │          │           │            │             │
 │  Success │           │            │             │
 │  Message │           │            │             │
 │◄─────────┤           │            │             │
 │          │           │            │             │
```

---

## Technology Stack Visualization

```
┌────────────────────────────────────────────────────────────────┐
│                    Technology Stack                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Presentation Layer                                      │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Next.js 14 │ React 18 │ TypeScript 5 │ Tailwind CSS 3  │ │
│  │  Framer Motion │ Lucide Icons                            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  API Layer                                               │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  FastAPI │ Pydantic 2 │ Python 3.11                      │ │
│  │  Uvicorn (ASGI Server)                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Infrastructure Layer                                    │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Docker │ Docker Compose                                 │ │
│  │  Vercel (Frontend) │ Railway/Render (Backend)            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  External Services                                       │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Gmail SMTP │ Vercel Analytics (Optional)                │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Future Architecture (With Database)

```
┌──────────────────────────────────────────────────────────────────┐
│                    Enhanced Architecture                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend (Next.js)                                              │
│       ↕                                                           │
│  Backend API (FastAPI)                                           │
│       ↕                                                           │
│  ┌─────────────────┬──────────────────┬─────────────────────┐   │
│  │                 │                  │                     │   │
│  ▼                 ▼                  ▼                     ▼   │
│ PostgreSQL       Redis             S3/Object           Analytics │
│ (Data Store)   (Cache Layer)       Storage            (Metrics)  │
│  - Projects      - API Cache      - Images              - Events │
│  - Users         - Sessions       - Files               - Logs   │
│  - Analytics     - Rate Limits    - Resumes                      │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

**Last Updated**: January 2026  
**Maintained By**: Dhanraj Bhosale
