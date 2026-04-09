export interface Category {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  name: string;
  guide?: string | Record<string, string>;
}

export interface Download {
  direct?: string;
  modworkshop?: string;
  nexus?: string;
  steam?: string;
  overtake?: string;
}

export interface Mod {
  id: string;
  title: string | Record<string, string>;
  game: string;
  categories: string[];
  date: string;
  status: 'released' | 'working';
  images: string[];
  shortdescription: string | Record<string, string>;
  description: string | Record<string, string>;
  credits?: string | Record<string, string>;
  download?: Download;
}

export interface ModsData {
  categories: Category[];
  games: Game[];
  mods: Mod[];
}
