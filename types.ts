export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export enum ScrollStage {
  HERO = 0,
  MERN = 1,
  GIT = 2,
  LINUX = 3,
  DOCKER = 4,
  VPS = 5,
  PROJECTS = 6
}