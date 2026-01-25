from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.schemas import Project, Achievement, Experience, Skill, Education

router = APIRouter()

# Your project data
PROJECTS: List[Project] = [
    Project(
        id=1,
        title="AI-Powered Analytics Dashboard",
        description="Real-time analytics platform with ML-driven insights and predictive forecasting.",
        long_description="Built a comprehensive analytics dashboard that processes millions of data points in real-time. Implemented machine learning models for predictive analytics, anomaly detection, and trend forecasting. The platform reduced decision-making time by 40% for stakeholders.",
        tech_stack=["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
        github_url="https://github.com/yourusername/analytics-dashboard",
        featured=True,
        category="data-science"
    ),
    Project(
        id=2,
        title="Natural Language Processing Pipeline",
        description="End-to-end NLP pipeline for sentiment analysis and text classification.",
        long_description="Developed a scalable NLP pipeline capable of processing and classifying text data at scale. Implemented transformer-based models achieving 94% accuracy on sentiment analysis tasks.",
        tech_stack=["Python", "PyTorch", "Hugging Face", "spaCy", "FastAPI", "AWS"],
        github_url="https://github.com/yourusername/nlp-pipeline",
        featured=True,
        category="machine-learning"
    ),
    Project(
        id=3,
        title="Xethon Hackathon Winner Project",
        description="Award-winning hackathon project showcasing innovative data-driven solution.",
        long_description="First place winner at Xethon Hackathon. Built an innovative solution that addressed real-world challenges using cutting-edge technologies and data science methodologies.",
        tech_stack=["Python", "Scikit-learn", "Streamlit", "Pandas", "Plotly"],
        featured=True,
        category="hackathon"
    ),
    Project(
        id=4,
        title="Automated Data Pipeline",
        description="Scalable ETL pipeline for processing and transforming large datasets.",
        long_description="Designed and implemented automated data pipelines handling terabytes of data daily. Reduced data processing time by 60% and improved data quality metrics.",
        tech_stack=["Python", "Apache Airflow", "Spark", "SQL", "AWS S3", "Redshift"],
        github_url="https://github.com/yourusername/data-pipeline",
        category="data-engineering"
    ),
    Project(
        id=5,
        title="Computer Vision Application",
        description="Image recognition system for automated quality inspection.",
        long_description="Built a computer vision system for automated quality inspection in manufacturing. Achieved 99.2% accuracy in defect detection, reducing manual inspection costs by 70%.",
        tech_stack=["Python", "OpenCV", "TensorFlow", "Keras", "Docker", "FastAPI"],
        category="computer-vision"
    ),
    Project(
        id=6,
        title="Recommendation Engine",
        description="Personalized recommendation system using collaborative filtering.",
        long_description="Developed a hybrid recommendation engine combining collaborative filtering and content-based approaches. Improved user engagement by 35% through personalized suggestions.",
        tech_stack=["Python", "Surprise", "NumPy", "FastAPI", "MongoDB"],
        category="machine-learning"
    )
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