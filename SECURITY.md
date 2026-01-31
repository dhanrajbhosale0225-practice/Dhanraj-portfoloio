# Security Best Practices

## Table of Contents
1. [Security Overview](#security-overview)
2. [Input Validation](#input-validation)
3. [Authentication & Authorization](#authentication--authorization)
4. [Data Protection](#data-protection)
5. [API Security](#api-security)
6. [Infrastructure Security](#infrastructure-security)
7. [Code Security](#code-security)
8. [Monitoring & Incident Response](#monitoring--incident-response)

---

## Security Overview

### Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimum necessary access rights
3. **Fail Securely**: Default to secure state on errors
4. **Security by Design**: Built-in from the start
5. **Keep It Simple**: Complexity is the enemy of security

### Threat Model

#### Assets to Protect
- User contact information (name, email, message)
- Email credentials (SMTP)
- API endpoints
- Source code
- Environment variables

#### Potential Threats
- **Injection Attacks**: SQL injection, XSS, command injection
- **DDoS**: Denial of service attacks
- **Data Breaches**: Unauthorized access to sensitive data
- **CSRF**: Cross-Site Request Forgery
- **Man-in-the-Middle**: Intercepting communications

---

## Input Validation

### Frontend Validation (First Layer)

#### HTML5 Validation
```typescript
// Contact form with built-in validation
<input
  type="email"
  name="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  minLength={5}
  maxLength={100}
/>
```

#### TypeScript Type Safety
```typescript
interface ContactFormData {
  name: string;      // Type-safe at compile time
  email: string;
  subject: string;
  message: string;
}

// Validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Backend Validation (Second Layer)

#### Pydantic Validation
```python
from pydantic import BaseModel, EmailStr, Field, validator

class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr  # Validates email format
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    
    @validator('name', 'subject', 'message')
    def sanitize_input(cls, v):
        # Remove potentially dangerous characters
        import re
        # Remove HTML tags
        v = re.sub(r'<[^>]+>', '', v)
        # Remove script tags
        v = re.sub(r'<script.*?</script>', '', v, flags=re.DOTALL)
        return v.strip()
```

### Input Sanitization

#### XSS Prevention
```python
import html

def sanitize_html(text: str) -> str:
    """Escape HTML special characters"""
    return html.escape(text)

# Example usage
safe_message = sanitize_html(form.message)
```

#### SQL Injection Prevention
```python
# ✅ Good: Parameterized queries (when using database)
cursor.execute("SELECT * FROM users WHERE email = ?", (email,))

# ❌ Bad: String concatenation
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

---

## Authentication & Authorization

### Future Implementation (Currently not needed)

#### JWT-Based Authentication
```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# JWT token generation
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

#### Protected Routes
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def verify_token(credentials: HTTPBearer = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )

@app.get("/api/admin/projects")
async def get_admin_projects(token_data = Depends(verify_token)):
    # Protected endpoint
    return {"projects": [...]}
```

---

## Data Protection

### Secrets Management

#### Environment Variables
```bash
# ❌ Bad: Hardcoded secrets
SMTP_PASSWORD = "mypassword123"

# ✅ Good: Environment variables
import os
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
```

#### .env File Security
```bash
# Always in .gitignore
.env
.env.local
.env.*.local

# Provide .env.example template
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-here
```

#### Production Secrets
- **Vercel**: Use Vercel Environment Variables (encrypted)
- **Railway**: Use Railway Variables (encrypted)
- **AWS**: Use AWS Secrets Manager
- **Azure**: Use Azure Key Vault

### Data Encryption

#### In Transit
```python
# HTTPS enforced
# All communication encrypted with TLS 1.2+

# Vercel and Railway provide automatic HTTPS
```

#### At Rest (Future with Database)
```python
# Encrypt sensitive fields before storing
from cryptography.fernet import Fernet

key = os.getenv("ENCRYPTION_KEY").encode()
cipher = Fernet(key)

# Encrypt
encrypted_data = cipher.encrypt(data.encode())

# Decrypt
decrypted_data = cipher.decrypt(encrypted_data).decode()
```

---

## API Security

### CORS Configuration

#### Current Implementation
```python
from fastapi.middleware.cors import CORSMiddleware

# Restrictive CORS policy
ALLOWED_ORIGINS = [
    "http://localhost:3000",           # Development
    "https://yourportfolio.vercel.app", # Production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Specific origins only
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Only needed methods
    allow_headers=["*"],
)
```

### Rate Limiting

#### Implementation with slowapi
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/contact")
@limiter.limit("5/hour")  # 5 requests per hour per IP
async def submit_contact(request: Request, form: ContactForm):
    # Handle contact form
    pass
```

### API Security Headers

```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# Restrict allowed hosts
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["yourdomain.com", "*.yourdomain.com"]
)

# Security headers
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response
```

### HTTPS Enforcement

```python
# Redirect HTTP to HTTPS
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

if os.getenv("ENV") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)
```

---

## Infrastructure Security

### Docker Security

#### Minimal Base Image
```dockerfile
# ✅ Use specific version and minimal image
FROM python:3.11-slim

# ❌ Avoid
FROM python:latest
```

#### Non-Root User
```dockerfile
# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Run as non-root
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Security Scanning
```bash
# Scan Docker images for vulnerabilities
docker scan portfolio-backend:latest
```

### Network Security

#### Firewall Rules
```bash
# Allow only necessary ports
# Port 443 (HTTPS) - Yes
# Port 80 (HTTP) - Redirect to 443
# Port 22 (SSH) - Only from specific IPs
# All other ports - Blocked
```

#### DDoS Protection
- Use Cloudflare (free tier) for DDoS protection
- Rate limiting at API gateway
- CDN for static assets

---

## Code Security

### Dependency Management

#### Regular Updates
```bash
# Frontend
npm audit
npm audit fix

# Backend
pip install safety
safety check

# Automated updates with Dependabot (GitHub)
```

#### Lock Files
```bash
# ✅ Commit lock files
package-lock.json  # Frontend
requirements.txt   # Backend (with pinned versions)

# Pin versions in requirements.txt
fastapi==0.109.0  # ✅ Good
fastapi>=0.109.0  # ⚠️ Can break
fastapi           # ❌ Bad
```

### Code Review Checklist

- [ ] No hardcoded secrets
- [ ] Input validation on all user inputs
- [ ] SQL queries parameterized (if using DB)
- [ ] Error messages don't leak sensitive info
- [ ] Authentication on protected routes
- [ ] HTTPS enforced in production
- [ ] Dependencies up to date
- [ ] No known vulnerabilities

### Static Analysis

#### Frontend (ESLint)
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error"
  }
}
```

#### Backend (Bandit)
```bash
# Install Bandit
pip install bandit

# Scan for security issues
bandit -r app/

# Example output
# Issue: [B105:hardcoded_password_string]
# Severity: Low   Confidence: Medium
```

---

## Monitoring & Incident Response

### Security Monitoring

#### Logging Security Events
```python
import logging

logger = logging.getLogger(__name__)

@app.post("/api/contact")
async def submit_contact(form: ContactForm, request: Request):
    # Log security-relevant events
    logger.info(
        "Contact form submission",
        extra={
            "email": form.email,
            "ip": request.client.host,
            "user_agent": request.headers.get("user-agent")
        }
    )
    
    # Detect suspicious activity
    if is_suspicious(form):
        logger.warning(
            "Suspicious contact form submission detected",
            extra={"email": form.email, "ip": request.client.host}
        )
```

#### Failed Authentication Attempts (Future)
```python
@app.post("/api/auth/login")
async def login(credentials: LoginForm, request: Request):
    if not verify_password(credentials.password, user.password_hash):
        logger.warning(
            "Failed login attempt",
            extra={
                "username": credentials.username,
                "ip": request.client.host
            }
        )
        # Rate limit failed attempts
        # Block IP after X failed attempts
```

### Incident Response Plan

#### 1. Detection
- Monitor logs for anomalies
- Set up alerts for:
  - Unusual traffic patterns
  - Multiple failed authentications
  - Error rate spikes
  - Slow response times

#### 2. Containment
```bash
# Immediately block malicious IPs
# Update firewall rules
# Disable compromised accounts
# Rotate compromised credentials
```

#### 3. Eradication
```bash
# Patch vulnerabilities
# Update dependencies
# Review and fix security gaps
```

#### 4. Recovery
```bash
# Restore from backups if needed
# Verify system integrity
# Gradually restore services
```

#### 5. Post-Incident Review
- Document the incident
- Identify root cause
- Update security measures
- Train team on lessons learned

---

## Security Checklist

### Development
- [x] Input validation on all forms
- [x] Type safety with TypeScript/Pydantic
- [x] Secrets in environment variables
- [ ] Rate limiting on API endpoints
- [x] CORS properly configured
- [ ] Security headers implemented
- [x] HTTPS enforced in production

### Pre-Deployment
- [ ] Security audit completed
- [ ] Dependencies scanned for vulnerabilities
- [ ] Secrets rotated for production
- [ ] Monitoring configured
- [ ] Incident response plan documented

### Post-Deployment
- [ ] Regular security scans scheduled
- [ ] Log monitoring active
- [ ] Backup strategy tested
- [ ] Access controls reviewed
- [ ] Security headers verified

---

## Security Resources

### Tools
- **OWASP ZAP**: Web application security scanner
- **Snyk**: Dependency vulnerability scanner
- **Bandit**: Python security linter
- **npm audit**: Node.js dependency scanner
- **Safety**: Python dependency checker

### Standards
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **CWE**: Common Weakness Enumeration
- **NIST Cybersecurity Framework**

### Best Practices
- Principle of least privilege
- Defense in depth
- Regular security updates
- Security awareness training
- Incident response planning

---

## Conclusion

Security is an ongoing process, not a one-time task. Regularly:
1. **Review** security configurations
2. **Update** dependencies
3. **Monitor** for threats
4. **Test** security controls
5. **Improve** based on findings

**Remember**: The goal is not perfect security (impossible), but to make attacks sufficiently difficult that attackers move on to easier targets.

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintained By**: Dhanraj Bhosale
