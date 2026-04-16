export interface Category {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string | Record<string, string>;
  categories: string[];
  date?: string;
  images?: string[];
  shortdescription?: string | Record<string, string>;
  description: string | Record<string, string>;
  link?: string;
  github?: string;
}

export interface ProjectsData {
  categories: Category[];
  projects: Project[];
}
