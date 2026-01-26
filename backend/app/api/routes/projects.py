from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.schemas import Project, Achievement, Experience, Skill, Education

router = APIRouter()

# Your project data
PROJECTS: List[Project] = [
    Project(
        id=1,
        title="TunnelFury-VPN",
        description="A VPN solution focused on security and speed functionality.",
        long_description="A VPN implementation project demonstrating network security concepts and tunneling protocols.",
        tech_stack=["Python", "Networking", "Security"],
        github_url="https://github.com/Dhanraj10/TunnelFury-VPN",
        featured=True,
        category="security"
    ),
    Project(
        id=2,
        title="DiseasePredictionSystem",
        description="Machine learning system for predicting disease based on symptoms and medical data.",
        long_description="Developed a scalable disease prediction system using advanced machine learning algorithms.",
        tech_stack=["Python", "Machine Learning", "Scikit-learn"],
        github_url="https://github.com/Dhanraj10/DiseasePredictionSystem",
        featured=True,
        category="machine-learning"
    ),
    Project(
        id=3,
        title="Facial-Recognition-Attendance-System",
        description="Automated attendance system using facial recognition technology.",
        long_description="Built a contactless attendance system that uses facial recognition for accurate and quick verification.",
        tech_stack=["Python", "OpenCV", "Face Recognition"],
        github_url="https://github.com/Dhanraj10/Facial-Recognition-Attendance-System",
        featured=True,
        category="computer-vision"
    ),
    Project(
        id=4,
        title="Webhooks",
        description="Implementation of webhook handlers for event-driven architecture.",
        long_description="A project demonstrating the use and handling of webhooks for integrating different services.",
        tech_stack=["Python"],
        github_url="https://github.com/Dhanraj10/Webhooks",
        category="backend"
    ),
]

ACHIEVEMENTS: List[Achievement] = [
    Achievement(
        id=1,
        title="🏆 Xethon Hackathon Winner",
        description="First place winner at Xethon Hackathon, demonstrating innovative problem-solving and technical excellence in building data-driven solutions.",
        date="2023",
        icon="trophy"
    ),
    Achievement(
        id=2,
        title="💼 PwC Internship",
        description="Completed internship at PwC, gaining valuable experience in consulting and data analytics in a Big Four environment.",
        date="2023",
        icon="briefcase"
    ),
    Achievement(
        id=3,
        title="🎓 B.Tech in Computer Science",
        description="Graduated from UPES University with specialization in Data Science, building strong foundations in programming and analytics.",
        date="2024",
        icon="graduation-cap"
    ),
    Achievement(
        id=4,
        title="⭐ 2+ Years at Navikenz",
        description="Contributing as a Software Engineer (Data Scientist) at Navikenz, working on cutting-edge data science projects and solutions.",
        date="2024-Present",
        icon="star"
    )
]

EXPERIENCES: List[Experience] = [
    Experience(
        id=1,
        company="Navikenz",
        role="Software Engineer (Data Scientist)",
        duration="2+ years",
        start_date="2024",
        end_date="Present",
        description="Working on enterprise-level data science solutions, developing ML models, and building scalable data pipelines.",
        responsibilities=[
            "Developing and deploying machine learning models for predictive analytics",
            "Building automated data pipelines for large-scale data processing",
            "Collaborating with cross-functional teams to deliver data-driven solutions",
            "Implementing MLOps practices for model deployment and monitoring",
            "Conducting data analysis and creating insightful visualizations"
        ],
        tech_stack=["Python", "TensorFlow", "PyTorch", "SQL", "AWS", "Docker", "Kubernetes"]
    ),
    Experience(
        id=2,
        company="PwC",
        role="Data Analytics Intern",
        duration="6 months",
        start_date="2023",
        end_date="2023",
        description="Contributed to consulting projects involving data analytics and business intelligence solutions.",
        responsibilities=[
            "Analyzed large datasets to extract business insights",
            "Created dashboards and reports for client presentations",
            "Assisted in developing data-driven recommendations",
            "Collaborated with senior consultants on client engagements"
        ],
        tech_stack=["Python", "SQL", "Power BI", "Excel", "Tableau"]
    )
]

SKILLS: List[Skill] = [
    Skill(name="Python", level=95, category="languages"),
    Skill(name="SQL", level=90, category="languages"),
    Skill(name="JavaScript", level=75, category="languages"),
    Skill(name="R", level=70, category="languages"),
    Skill(name="TensorFlow", level=88, category="frameworks"),
    Skill(name="PyTorch", level=85, category="frameworks"),
    Skill(name="Scikit-learn", level=92, category="frameworks"),
    Skill(name="Pandas", level=95, category="frameworks"),
    Skill(name="FastAPI", level=85, category="frameworks"),
    Skill(name="React", level=70, category="frameworks"),
    Skill(name="Docker", level=82, category="tools"),
    Skill(name="Git", level=88, category="tools"),
    Skill(name="AWS", level=78, category="tools"),
    Skill(name="Kubernetes", level=70, category="tools"),
    Skill(name="Apache Airflow", level=75, category="tools"),
    Skill(name="PostgreSQL", level=85, category="databases"),
    Skill(name="MongoDB", level=78, category="databases"),
    Skill(name="Redis", level=72, category="databases"),
]

EDUCATION: List[Education] = [
    Education(
        degree="Bachelor of Technology (B.Tech)",
        institution="UPES University",
        specialization="Computer Science Engineering - Data Science",
        duration="2020 - 2024",
        achievements=[
            "Specialized in Data Science and Machine Learning",
            "Completed capstone project on predictive analytics",
            "Active member of coding clubs and hackathon teams"
        ]
    )
]


@router.get("/", response_model=List[Project])
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all projects with optional filtering."""
    projects = PROJECTS.copy()
    
    if category:
        projects = [p for p in projects if p.category == category]
    
    if featured is not None:
        projects = [p for p in projects if p.featured == featured]
    
    return projects


@router.get("/featured", response_model=List[Project])
async def get_featured_projects():
    """Get featured projects."""
    return [p for p in PROJECTS if p.featured]


@router.get("/categories")
async def get_project_categories():
    """Get all project categories."""
    categories = list(set(p.category for p in PROJECTS))
    return {"categories": categories}


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Get a specific project by ID."""
    project = next((p for p in PROJECTS if p.id == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/achievements/all", response_model=List[Achievement])
async def get_achievements():
    """Get all achievements."""
    return ACHIEVEMENTS


@router.get("/experience/all", response_model=List[Experience])
async def get_experience():
    """Get all work experience."""
    return EXPERIENCES


@router.get("/skills/all", response_model=List[Skill])
async def get_skills(category: Optional[str] = None):
    """Get all skills with optional category filter."""
    if category:
        return [s for s in SKILLS if s.category == category]
    return SKILLS


@router.get("/education/all", response_model=List[Education])
async def get_education():
    """Get education details."""
    return EDUCATION