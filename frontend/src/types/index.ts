export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}