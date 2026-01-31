# Deployment & DevOps Guide

## Table of Contents
1. [Deployment Overview](#deployment-overview)
2. [Local Development](#local-development)
3. [Production Deployment](#production-deployment)
4. [CI/CD Pipeline](#cicd-pipeline)
5. [Environment Configuration](#environment-configuration)
6. [Monitoring & Logging](#monitoring--logging)
7. [Backup & Recovery](#backup--recovery)
8. [Troubleshooting](#troubleshooting)

---

## Deployment Overview

### Deployment Environments

| Environment | Purpose | URL Example |
|------------|---------|-------------|
| **Development** | Local development | http://localhost:3000 |
| **Staging** | Testing before production | https://staging.vercel.app |
| **Production** | Live environment | https://portfolio.com |

### Architecture Components

```
┌─────────────────────────────────────────────┐
│             Production Stack                 │
├─────────────────────────────────────────────┤
│                                              │
│  Frontend (Vercel)                           │
│  ├─ Next.js Application                      │
│  ├─ Global CDN                               │
│  └─ Serverless Functions                     │
│                                              │
│  Backend (Railway/Render)                    │
│  ├─ FastAPI Server                           │
│  ├─ Container Runtime                        │
│  └─ HTTPS Endpoint                           │
│                                              │
│  External Services                           │
│  ├─ Email (SMTP)                             │
│  ├─ Analytics (Optional)                     │
│  └─ Monitoring (Optional)                    │
│                                              │
└─────────────────────────────────────────────┘
```

---

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git
- Code editor (VS Code recommended)

### Setup Steps

#### 1. Clone Repository
```bash
git clone https://github.com/dhanrajbhosale0225-practice/Dhanraj-portfoloio.git
cd Dhanraj-portfoloio
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor

# Run development server
uvicorn app.main:app --reload --port 8000
```

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local

# Run development server
npm run dev
```

#### 4. Docker Setup (Alternative)
```bash
# From project root
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## Production Deployment

### Frontend Deployment (Vercel)

#### Option 1: Vercel Dashboard (Recommended)

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts
# Set root directory: frontend
# Add environment variables when prompted

# Production deployment
vercel --prod
```

#### Vercel Configuration File

Create `vercel.json` in frontend directory:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  }
}
```

---

### Backend Deployment (Railway)

#### Option 1: Railway Dashboard

1. **Sign up** at [railway.app](https://railway.app)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   ```
   Root Directory: backend
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

4. **Environment Variables**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_TO=your-email@gmail.com
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

5. **Generate Domain**
   - Railway auto-generates a domain
   - Or add custom domain

6. **Deploy**
   - Railway auto-deploys on push to main branch

#### Option 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add environment variables
railway variables set SMTP_HOST=smtp.gmail.com
railway variables set SMTP_PORT=587
# ... add other variables

# Deploy
railway up
```

#### Railway Configuration

Create `railway.json` in backend directory:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### Backend Deployment (Render - Alternative)

1. **Sign up** at [render.com](https://render.com)

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure Service**
   ```
   Name: portfolio-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

4. **Environment Variables**
   - Add same variables as Railway

5. **Create Service**
   - Render builds and deploys automatically

Create `render.yaml` in backend directory:
```yaml
services:
  - type: web
    name: portfolio-backend
    env: python
    region: oregon
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: SMTP_HOST
        value: smtp.gmail.com
      - key: SMTP_PORT
        value: 587
      - key: PYTHON_VERSION
        value: 3.11.0
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # Frontend Tests
  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build

  # Backend Tests
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
        cache: 'pip'
        cache-dependency-path: backend/requirements.txt
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest black
    
    - name: Run Black formatter check
      run: black --check app/
    
    - name: Run tests
      run: pytest
    
  # Deploy to Vercel (Frontend)
  deploy-frontend:
    needs: [frontend-test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./frontend
        vercel-args: '--prod'
```

### Setup GitHub Secrets

Add these secrets in GitHub repository settings:
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

---

## Environment Configuration

### Frontend Environment Variables

#### Development (.env.local)
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Production (Vercel)
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Backend Environment Variables

#### Development (.env)
```bash
# Debug mode
DEBUG=true

# CORS allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Email configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@portfolio.com
EMAIL_TO=your-email@gmail.com
```

#### Production (Railway/Render)
```bash
# Debug mode
DEBUG=false

# CORS allowed origins (comma-separated)
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.your-domain.com

# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@gmail.com
```

### Email Setup (Gmail)

1. **Enable 2-Factor Authentication** in Google Account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use App Password** as `SMTP_PASSWORD`

---

## Monitoring & Logging

### Frontend Monitoring

#### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Google Analytics
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Backend Logging

#### Structured Logging
```python
# app/core/logging_config.py
import logging
import sys

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

# app/main.py
from app.core.logging_config import setup_logging

setup_logging()
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up")
```

#### Log Aggregation (Optional)

Use services like:
- **Logfire** (Python-friendly)
- **Datadog**
- **Sentry**

---

## Backup & Recovery

### Data Backup Strategy

#### Current (No Database)
- Data is in code (projects, experience, etc.)
- Backed up via Git repository

#### Future (With Database)
```bash
# PostgreSQL backup
pg_dump -U username -d database_name > backup.sql

# Restore
psql -U username -d database_name < backup.sql

# Automated backups with Railway
# Railway provides automatic daily backups
```

### Disaster Recovery Plan

1. **Code Recovery**: Git repository (GitHub)
2. **Environment Variables**: Documented and backed up securely
3. **Deployment**: Re-deploy from GitHub in minutes
4. **DNS**: Update DNS if provider changes

---

## Troubleshooting

### Common Issues

#### Frontend Build Errors

**Issue**: Build fails on Vercel
```bash
Module not found: Can't resolve 'xyz'
```

**Solution**:
```bash
# Clear npm cache
rm -rf node_modules package-lock.json
npm install

# Check imports for typos
# Ensure all dependencies are in package.json
```

#### Backend Deployment Errors

**Issue**: Application crashes on Railway
```
Address already in use
```

**Solution**:
```python
# Use $PORT environment variable
import os
port = int(os.getenv("PORT", 8000))
uvicorn.run(app, host="0.0.0.0", port=port)
```

#### CORS Errors

**Issue**: Frontend can't reach backend
```
Access to fetch at 'api-url' has been blocked by CORS policy
```

**Solution**:
```python
# Update ALLOWED_ORIGINS in backend config
ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "http://localhost:3000"  # for development
]
```

#### Email Not Sending

**Issue**: Contact form doesn't send emails

**Solution**:
1. Check SMTP credentials are correct
2. Verify app password (not account password)
3. Check logs for SMTP errors
4. Ensure port 587 is not blocked

### Health Check Endpoints

```bash
# Check backend health
curl https://your-backend-url.com/api/health

# Check frontend
curl https://your-frontend.vercel.app
```

---

## Performance Optimization

### Frontend

- ✅ Static Site Generation (SSG)
- ✅ Image optimization with Next.js Image
- ✅ Code splitting by route
- ✅ Font optimization
- ⬜ Service Worker for offline support
- ⬜ Response caching with SWR

### Backend

- ✅ Async/await for non-blocking I/O
- ✅ Response compression
- ⬜ Database connection pooling
- ⬜ Redis caching layer
- ⬜ CDN for API responses

---

## Security Checklist

### Pre-Deployment

- [x] Environment variables not in code
- [x] HTTPS enforced in production
- [x] CORS properly configured
- [x] Input validation on backend
- [x] Secrets management
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] Regular dependency updates

### Post-Deployment

- [ ] Monitor for security vulnerabilities
- [ ] Regular backups
- [ ] SSL certificate renewal (auto with Vercel)
- [ ] Review access logs

---

## Deployment Checklist

### Before Deploying

- [ ] All tests passing
- [ ] Linting passing
- [ ] Environment variables configured
- [ ] Dependencies updated
- [ ] Documentation updated
- [ ] Backup current production

### Deployment

- [ ] Deploy to staging first
- [ ] Test all functionality
- [ ] Check API endpoints
- [ ] Verify email sending
- [ ] Test contact form
- [ ] Check responsiveness
- [ ] Verify SEO meta tags

### After Deployment

- [ ] Monitor logs for errors
- [ ] Test critical paths
- [ ] Check analytics
- [ ] Verify uptime
- [ ] Update status page

---

**Last Updated**: January 2026  
**Maintained By**: Dhanraj Bhosale
