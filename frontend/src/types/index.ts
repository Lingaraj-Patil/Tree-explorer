export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  badges: Badge[];
  streak: number;
  rank: number;
  completedStories: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Story {
  id: string;
  title: string;
  blurb: string;
  thumbnail: string;
  content: string;
  bannerImage: string;
  xpReward: number;
  section: string;
  unit: number;
  order: number;
  isLocked: boolean;
  type: 'story' | 'task' | 'quiz' | 'bonus';
}

export interface TaskResult {
  species: string;
  confidence: number;
  xpEarned: number;
  storyId: string;
}

export interface LeaderboardEntry {
  user: User;
  position: number;
}

export interface MapPin {
  id: string;
  storyId: string;
  title: string;
  lat: number;
  lng: number;
  completed: boolean;
}