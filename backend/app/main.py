from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import contact, projects
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Portfolio Website API - Built with FastAPI",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])


@app.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/api/profile")
async def get_profile():
    return {
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