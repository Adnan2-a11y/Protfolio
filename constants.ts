import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Scalable Microservices API",
    description: "A high-performance microservices architecture handling 10k+ concurrent requests using Node.js, RabbitMQ, and Redis caching.",
    tech: ["Node.js", "Express", "RabbitMQ", "Redis", "Docker"],
  },
  {
    id: 2,
    title: "Real-time Analytics Engine",
    description: "Distributed system processing real-time telemetry data with WebSockets and storing aggregations in TimescaleDB.",
    tech: ["Go", "WebSockets", "TimescaleDB", "Kafka"],
  },
  {
    id: 3,
    title: "Secure Auth Provider",
    description: "OAuth2.0 and OIDC compliant authentication service with multi-factor authentication support and breach detection.",
    tech: ["NestJS", "PostgreSQL", "OAuth2", "Passport"],
  },
  {
    id: 4,
    title: "Infrastructure as Code Library",
    description: "A comprehensive Terraform module collection for rapid deployment of AWS serverless infrastructures.",
    tech: ["Terraform", "AWS", "CI/CD", "Bash"],
  }
];

// Initial random positions for the black spheres in the hero section + Orbit data
export const RANDOM_SPHERES = Array.from({ length: 49 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 100, // percentage offset start
  y: (Math.random() - 0.5) * 100, // percentage offset start
  scale: 0.3 + Math.random() * 0.5,
  
  // Orbit parameters for the final phase
  // Using pixels for orbit radius to keep it consistent
  orbitR: 120 + Math.random() * 300, 
  orbitAngle: Math.random() * 360, // deg
  orbitDuration: 10 + Math.random() * 20, // seconds for full rotation
}));