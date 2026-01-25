# Portfolio Website

A modern, full-stack portfolio website built with **Next.js 14** (TypeScript) for the frontend and **FastAPI** (Python) for the backend.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## 🚀 Features

- ⚡ **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, FastAPI
- 🎨 **Beautiful UI**: Glassmorphism design, smooth animations with Framer Motion
- 🌙 **Dark Mode**: Automatic theme detection with manual toggle
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🎯 **SEO Optimized**: Meta tags, Open Graph, semantic HTML
- 📧 **Contact Form**: Rate-limited with email integration
- 🔒 **Secure**: Input sanitization, CORS configuration

## 📁 Project Structure

```
portfolio-website/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── api/routes/      # API endpoints
│   │   ├── core/            # Config & security
│   │   ├── models/          # Pydantic schemas
│   │   └── services/        # Business logic
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                # Next.js Frontend
│   ├── src/
│   │   ├── app/             # Pages (App Router)
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   └── styles/          # CSS files
│   ├── package.json
│   └── tailwind.config.ts
│
└── docker-compose.yml
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
- API Docs: `http://localhost:8000/api/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The website will be available at `http://localhost:3000`

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## ☁️ Free Deployment Options

### Frontend (Vercel - Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Select the `frontend` directory as root
5. Deploy!

### Backend (Railway / Render)
1. Go to [railway.app](https://railway.app) or [render.com](https://render.com)
2. Create a new web service
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## 📝 Customization

1. Update your personal info in:
   - `backend/app/api/routes/projects.py` (projects, achievements, experience)
   - `backend/app/main.py` (profile info)
   - `frontend/src/components/sections/` (component content)

2. Update social links and contact info throughout the components

3. Add your resume as `frontend/public/resume.pdf`

## 🔧 Environment Variables

### Backend (.env)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_TO=your.email@gmail.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## 👤 About Me

- 🎓 **Education**: B.Tech CSE with Data Science Specialization from UPES University
- 🏆 **Achievement**: Xethon Hackathon Winner
- 💼 **Experience**: 2+ years at Navikenz as Software Engineer (Data Scientist)
- 📜 **Internship**: PwC (Big Four) Data Analytics Intern

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js & FastAPI