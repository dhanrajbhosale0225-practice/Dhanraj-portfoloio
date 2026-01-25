from fastapi import FastAPI

app = FastAPI()

from .api.routes import contact, projects

app.include_router(contact.router)
app.include_router(projects.router)