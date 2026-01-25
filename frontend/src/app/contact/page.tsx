import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="contact-page">
            <h1>Contact Me</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <Button type="submit">Send Message</Button>
            </form>
            {success && <p>Your message has been sent!</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ContactPage;