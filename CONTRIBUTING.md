# Contributing Guide

Thank you for your interest in contributing to this portfolio website! This guide will help you understand our development process, coding standards, and best practices.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Testing Guidelines](#testing-guidelines)
5. [Commit Convention](#commit-convention)
6. [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git** for version control
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click 'Fork' on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Dhanraj-portfoloio.git
   cd Dhanraj-portfoloio
   ```

2. **Set up the backend**
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
   
   # Create .env file from example
   cp .env.example .env
   # Edit .env with your configuration
   
   # Run the server
   uvicorn app.main:app --reload --port 8000
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create .env.local file
   cp .env.example .env.local
   # Edit .env.local with your configuration
   
   # Run development server
   npm run dev
   ```

4. **Verify setup**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs

---

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation updates

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

---

## Code Standards

### TypeScript/React (Frontend)

#### Component Structure
```typescript
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserData`)

#### Code Organization
```
components/
├── ui/              # Reusable UI components
├── layout/          # Layout components (Navbar, Footer)
├── sections/        # Page sections
└── animations/      # Animation components

hooks/               # Custom React hooks
types/               # TypeScript type definitions
utils/               # Utility functions
```

#### Best Practices
- Use TypeScript strict mode
- Prefer functional components over class components
- Use custom hooks for reusable logic
- Keep components small and focused (single responsibility)
- Use Tailwind utility classes for styling
- Avoid inline styles
- Use semantic HTML elements

#### ESLint Configuration
Run linting before committing:
```bash
npm run lint
```

### Python/FastAPI (Backend)

#### Code Structure
```python
# Use type hints for all functions
from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

async def get_user(user_id: int) -> Optional[User]:
    """
    Retrieve user by ID.
    
    Args:
        user_id: The unique identifier of the user
        
    Returns:
        User object if found, None otherwise
    """
    # Implementation
    pass
```

#### Naming Conventions
- **Files**: snake_case (e.g., `email_service.py`)
- **Functions**: snake_case (e.g., `send_email`)
- **Classes**: PascalCase (e.g., `EmailService`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Private methods**: Leading underscore (e.g., `_internal_method`)

#### Code Organization
```
app/
├── api/
│   └── routes/      # API endpoints
├── core/            # Configuration and security
├── models/          # Pydantic schemas
└── services/        # Business logic
```

#### Best Practices
- Use async/await for I/O operations
- Always use type hints (enforced by mypy)
- Write docstrings for all public functions
- Follow PEP 8 style guide
- Use Pydantic for data validation
- Keep route handlers thin (delegate to services)
- Handle exceptions gracefully

#### Code Formatting
Use `black` for consistent formatting:
```bash
# Install black
pip install black

# Format code
black app/
```

---

## Testing Guidelines

### Frontend Testing

#### Unit Tests (Jest + React Testing Library)
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Running Tests
```bash
npm test           # Run all tests
npm test -- --watch  # Watch mode
npm run test:coverage  # Coverage report
```

### Backend Testing

#### Unit Tests (pytest)
```python
# test_projects.py
import pytest
from app.api.routes.projects import get_projects

@pytest.mark.asyncio
async def test_get_projects():
    """Test getting all projects."""
    projects = await get_projects()
    assert len(projects) > 0
    assert projects[0].title is not None

@pytest.mark.asyncio
async def test_get_project_by_id():
    """Test getting project by ID."""
    project = await get_project(project_id=1)
    assert project is not None
    assert project.id == 1
```

#### Running Tests
```bash
# Install pytest
pip install pytest pytest-asyncio

# Run tests
pytest                    # All tests
pytest -v                 # Verbose output
pytest --cov=app          # Coverage report
```

### Test Coverage Goals
- **Frontend**: Minimum 70% code coverage
- **Backend**: Minimum 80% code coverage
- Critical paths: 100% coverage

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature change)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD configuration changes

### Examples
```bash
# Feature
git commit -m "feat(projects): add filtering by category"

# Bug fix
git commit -m "fix(contact): resolve email validation issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api): redesign project schema

BREAKING CHANGE: Project schema now requires 'category' field"
```

---

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   # Frontend
   npm run lint
   npm test
   
   # Backend
   black app/
   pytest
   ```

2. **Update documentation**
   - Update README.md if adding features
   - Add JSDoc/docstrings for new functions
   - Update ARCHITECTURE.md for architectural changes

3. **Check your changes**
   ```bash
   git status
   git diff
   ```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Manually tested in browser/API

## Screenshots (if UI changes)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No breaking changes (or documented)
- [ ] Added tests for new functionality
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: At least one approval required
3. **Address Feedback**: Make requested changes
4. **Merge**: Squash and merge into target branch

---

## Code Review Guidelines

### For Authors
- Keep PRs focused and small (< 400 lines if possible)
- Provide context in PR description
- Respond to feedback promptly
- Don't take feedback personally

### For Reviewers
- Be constructive and kind
- Focus on code quality, not personal preferences
- Test the changes locally if needed
- Approve when satisfied

### Review Checklist
- [ ] Code is readable and maintainable
- [ ] Follows project conventions
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Tests are adequate
- [ ] Documentation is updated

---

## Development Best Practices

### Performance
- Optimize images before adding
- Use lazy loading for heavy components
- Minimize API calls
- Cache data when appropriate

### Security
- Never commit secrets or API keys
- Validate all user inputs
- Sanitize data before displaying
- Use HTTPS in production

### Accessibility
- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Test with screen readers

### SEO
- Add meta tags to pages
- Use semantic HTML
- Optimize page load times
- Add structured data

---

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Communication
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Questions and general discussions
- **Pull Requests**: Code review and collaboration

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
