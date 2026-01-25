from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.schemas import ContactForm, ContactResponse
from app.services.email_service import email_service
from app.core.security import check_rate_limit, sanitize_input

router = APIRouter()


@router.post("/", response_model=ContactResponse)
async def submit_contact(
    contact: ContactForm,
    request: Request,
    _: bool = Depends(check_rate_limit)
):
    """
    Submit a contact form message.
    Rate limited to 10 requests per minute per IP.
    """
    try:
        # Sanitize inputs
        sanitized_contact = ContactForm(
            name=sanitize_input(contact.name, 100),
            email=contact.email,
            subject=sanitize_input(contact.subject, 200),
            message=sanitize_input(contact.message, 2000)
        )
        
        # Send email
        success = await email_service.send_contact_email(sanitized_contact)
        
        if success:
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to send message. Please try again later."
            )
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )


@router.get("/info")
async def get_contact_info():
    """Get public contact information."""
    return {
        "email": "contact@yourportfolio.com",
        "location": "India",
        "availability": "Open to opportunities",
        "response_time": "Usually within 24-48 hours"
    }