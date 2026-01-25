# Backend Portfolio Website

This is the backend for the portfolio website, built using Python and FastAPI. The backend serves as the API for the frontend application, handling requests related to projects, contact submissions, and other functionalities.

## Project Structure

- **app/**: Contains the main application code.
  - **api/**: Contains the API routes.
    - **routes/**: Individual route files for handling specific endpoints.
  - **core/**: Contains core functionalities such as configuration and security.
  - **models/**: Contains data models and schemas for validation.
  - **services/**: Contains services such as email handling.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio-website/backend
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints

- **GET /api/projects**: Retrieve project information.
- **POST /api/contact**: Submit a contact form.

## Docker

To build and run the application using Docker, use the following commands:

1. **Build the Docker image**:
   ```bash
   docker build -t portfolio-backend .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -d -p 8000:8000 portfolio-backend
   ```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.