# Quick Start Guide

Get the portfolio website up and running in **5 minutes**!

## 📋 Prerequisites Checklist

Before you begin, ensure you have:
- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **Python 3.11+** installed ([Download](https://www.python.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] A code editor (We recommend [VS Code](https://code.visualstudio.com/))

## 🚀 5-Minute Setup

### Step 1: Clone the Repository (30 seconds)

```bash
git clone https://github.com/dhanrajbhosale0225-practice/Dhanraj-portfoloio.git
cd Dhanraj-portfoloio
```

### Step 2: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

✅ Backend should now be running at **http://localhost:8000**

### Step 3: Setup Frontend (2 minutes)

Open a **new terminal window** and:

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start the development server
npm run dev
```

✅ Frontend should now be running at **http://localhost:3000**

### Step 4: Verify Installation (30 seconds)

Open your browser and visit:
- **Frontend**: http://localhost:3000 ← Your portfolio website!
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs ← Interactive Swagger UI

---

## 🎯 What's Next?

Now that you're up and running, here's what to explore:

### Customize Your Portfolio

1. **Update Personal Info**
   - Edit `backend/app/main.py` (profile info)
   - Edit `backend/app/api/routes/projects.py` (projects, experience, skills)

2. **Customize Styling**
   - Edit `frontend/tailwind.config.ts` (colors, fonts)
   - Modify components in `frontend/src/components/`

3. **Add Your Resume**
   - Place your resume as `frontend/public/resume.pdf`

### Configure Email (Optional)

To enable the contact form:

1. Get Gmail App Password:
   - Enable 2FA on your Google Account
   - Generate App Password at: https://myaccount.google.com/apppasswords

2. Update `backend/.env`:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   EMAIL_TO=your-email@gmail.com
   ```

3. Restart backend server

---

## 🐳 Alternative: Docker Setup

If you prefer Docker (even easier!):

```bash
# From project root
docker-compose up --build
```

That's it! Both frontend and backend will be running.

---

## 📚 Documentation Overview

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[README.md](README.md)** | Project overview | Start here |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System design & patterns | Understanding the codebase |
| **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** | API reference | Building features |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Development guide | Before making changes |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deploy to production | Going live |
| **[SECURITY.md](SECURITY.md)** | Security practices | Before production |
| **[DATA_SCIENCE_ARCHITECTURE.md](DATA_SCIENCE_ARCHITECTURE.md)** | Analytics & ML | Adding analytics |
| **[DIAGRAMS.md](DIAGRAMS.md)** | Visual diagrams | Understanding architecture |

---

## 🔧 Common Issues & Solutions

### Issue: Port already in use

**Error**: `Address already in use`

**Solution**:
```bash
# Kill process on port 8000
# On macOS/Linux:
lsof -ti:8000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: Module not found

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
# Ensure virtual environment is activated
# You should see (venv) in your terminal prompt
source venv/bin/activate  # macOS/Linux
.\venv\Scripts\activate   # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: npm install fails

**Error**: Various npm errors

**Solution**:
```bash
# Clear npm cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 🎓 Learning Path

### Beginner
1. ✅ Get the app running (you're here!)
2. 📝 Read the README and explore the UI
3. 🎨 Customize colors and text
4. 📧 Configure the contact form

### Intermediate
5. 🏗️ Read ARCHITECTURE.md to understand the design
6. 🔌 Explore the API at /api/docs
7. ⚛️ Modify React components
8. 🐍 Add new API endpoints

### Advanced
9. 🚀 Deploy to production (DEPLOYMENT.md)
10. 🔒 Implement security best practices (SECURITY.md)
11. 📊 Add analytics (DATA_SCIENCE_ARCHITECTURE.md)
12. 🤖 Integrate ML features

---

## 💡 Tips for Success

1. **Start Small**: Make one small change at a time
2. **Test Often**: Run the app after each change
3. **Use Git**: Commit your changes frequently
4. **Read the Docs**: We've documented everything!
5. **Ask Questions**: Check GitHub Issues or Discussions

---

## 🌟 Next Steps

### Customize Your Content
- [ ] Update profile information
- [ ] Add your projects
- [ ] Add your work experience
- [ ] Update skills and achievements
- [ ] Add your resume PDF

### Make It Yours
- [ ] Change color scheme
- [ ] Update fonts
- [ ] Add your photos/images
- [ ] Customize animations
- [ ] Add new sections

### Deploy to Production
- [ ] Choose hosting (Vercel + Railway recommended)
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Enable SSL/HTTPS
- [ ] Configure analytics

---

## 🆘 Getting Help

### Documentation
- 📖 Check the relevant .md file for your question
- 💡 Examples are provided in all documentation

### Community
- 🐛 [GitHub Issues](https://github.com/dhanrajbhosale0225-practice/Dhanraj-portfoloio/issues) - Bug reports
- 💬 [GitHub Discussions](https://github.com/dhanrajbhosale0225-practice/Dhanraj-portfoloio/discussions) - Questions

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## ✅ Checklist: You're Ready When...

- [ ] Both frontend and backend are running
- [ ] You can view the website at localhost:3000
- [ ] API docs are accessible at localhost:8000/api/docs
- [ ] You've customized at least one piece of content
- [ ] You understand the project structure
- [ ] You've committed your first change with git

---

**Congratulations!** 🎉 You're now ready to build an amazing portfolio website!

For detailed information, refer to the full documentation listed above.

---

**Last Updated**: January 2026  
**Maintained By**: Dhanraj Bhosale
