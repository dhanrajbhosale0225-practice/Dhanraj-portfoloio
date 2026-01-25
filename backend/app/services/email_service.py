import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings
from app.models.schemas import ContactForm
import logging

logger = logging.getLogger(__name__)


class EmailService:
    @staticmethod
    async def send_contact_email(contact: ContactForm) -> bool:
        """
        Send contact form email.
        For production, consider using services like:
        - SendGrid (free tier: 100 emails/day)
        - Mailgun (free tier: 5000 emails/month for 3 months)
        - Resend (free tier: 3000 emails/month)
        """
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = settings.EMAIL_FROM
            msg['To'] = settings.EMAIL_TO
            msg['Subject'] = f"Portfolio Contact: {contact.subject}"
            
            # Email body
            body = f"""
            New Contact Form Submission
            
            Name: {contact.name}
            Email: {contact.email}
            Subject: {contact.subject}
            
            Message:
            {contact.message}
            
            ---
            This email was sent from your portfolio website contact form.
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # For development/demo, just log the message
            if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
                logger.info(f"Demo mode - Contact form received from {contact.email}")
                logger.info(f"Subject: {contact.subject}")
                logger.info(f"Message: {contact.message[:100]}...")
                return True
            
            # Send email
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
            
            logger.info(f"Email sent successfully from {contact.email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False


email_service = EmailService()