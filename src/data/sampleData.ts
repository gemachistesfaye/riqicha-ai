import { CVData } from '../types/cv';

export const INITIAL_EMPTY_CV_DATA: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  summary: '',
  workExperiences: [],
  educations: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
};

export const SAMPLE_CV_DATA: CVData = {
  personalInfo: {
    fullName: 'Alexander Wright',
    jobTitle: 'Senior Software Engineer',
    email: 'alexander.wright@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexanderwright',
    portfolio: 'alexwright.dev',
    github: 'github.com/alexwright',
  },
  summary: 'Results-driven Senior Software Engineer with 6+ years of experience building scalable backend microservices and high-performance React applications. Proven track record of improving system uptime by 99.99% and mentoring engineering teams.',
  workExperiences: [
    {
      id: 'work-1',
      jobTitle: 'Senior Software Engineer',
      company: 'Apex Cloud Solutions',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      isCurrent: true,
      description: 'Architected microservices handling over 5M daily requests using Node.js and TypeScript.\nReduced average response times by 35% through API query optimizations and Redis caching.',
    },
    {
      id: 'work-2',
      jobTitle: 'Software Engineer',
      company: 'Vanguard Systems',
      location: 'San Jose, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      description: 'Developed responsive user interfaces with React and Tailwind CSS.\nCollaborated with product designers to implement accessibility features reaching WCAG 2.1 AA compliance.',
    },
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      isCurrent: false,
      description: 'Graduated with Honors. Coursework in Distributed Systems, Algorithms, and Software Engineering.',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'TypeScript', level: 'Expert' },
    { id: 'skill-2', name: 'React.js', level: 'Expert' },
    { id: 'skill-3', name: 'Node.js', level: 'Advanced' },
    { id: 'skill-4', name: 'PostgreSQL', level: 'Advanced' },
    { id: 'skill-5', name: 'Tailwind CSS', level: 'Expert' },
    { id: 'skill-6', name: 'Docker & Kubernetes', level: 'Intermediate' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'TaskPulse Engine',
      description: 'Distributed real-time task orchestration system with webhooks and event streaming.',
      technologies: 'Node.js, Redis, WebSockets, Docker',
      link: 'github.com/alexwright/taskpulse',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-04',
      link: 'aws.amazon.com/verify/12345',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native / Fluent' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Intermediate' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Company Innovation Award',
      description: 'Awarded 1st place in Annual Hackathon for designing an automated API documentation generator.',
    },
  ],
};

