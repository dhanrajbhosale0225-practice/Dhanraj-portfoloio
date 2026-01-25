from fastapi import HTTPException, Request
import time
from collections import defaultdict
from typing import Dict, Tuple


class RateLimiter:
    """Simple in-memory rate limiter."""
    def __init__(self, requests_per_minute: int = 10):
        self.requests_per_minute = requests_per_minute
        self.requests: Dict[str, list] = defaultdict(list)
    
    def is_allowed(self, client_ip: str) -> Tuple[bool, int]:
        current_time = time.time()
        minute_ago = current_time - 60
        
        # Clean old requests
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if req_time > minute_ago
        ]
        
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            return False, self.requests_per_minute - len(self.requests[client_ip])
        
        self.requests[client_ip].append(current_time)
        return True, self.requests_per_minute - len(self.requests[client_ip])


rate_limiter = RateLimiter(requests_per_minute=10)


async def check_rate_limit(request: Request):
    """Dependency to check rate limiting."""
    client_ip = request.client.host if request.client else "unknown"
    is_allowed, remaining = rate_limiter.is_allowed(client_ip)
    
    if not is_allowed:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later."
        )
    
    return True


def sanitize_input(text: str, max_length: int = 1000) -> str:
    """Sanitize user input to prevent injection attacks."""
    if not text:
        return ""
    
    # Trim whitespace and limit length
    text = text.strip()[:max_length]
    
    # Remove potentially harmful characters
    harmful_chars = ['<', '>', '{', '}', '\\']
    for char in harmful_chars:
        text = text.replace(char, '')
    
    return text