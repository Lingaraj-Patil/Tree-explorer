import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Badge, Story, TaskResult } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
  currentStory: Story | null;
  setCurrentStory: (story: Story | null) => void;
  taskResults: TaskResult[];
  addTaskResult: (result: TaskResult) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  completeStory: (storyId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Nature Explorer',
    avatar: '🌲',
    xp: 1250,
    badges: [
      { id: '1', name: 'First Discovery', description: 'Identified your first tree', icon: '🎯', earnedAt: new Date() },
      { id: '2', name: 'Oak Master', description: 'Expert in oak trees', icon: '🌳', earnedAt: new Date() },
      { id: '3', name: 'Streak Keeper', description: '7-day learning streak', icon: '🔥', earnedAt: new Date() }
    ],
    streak: 7,
    rank: 1,
    completedStories: ['1', '2'] // User has completed first two stories
  });
  
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addTaskResult = (result: TaskResult) => {
    setTaskResults(prev => [...prev, result]);
    if (user) {
      setUser({
        ...user,
        xp: user.xp + result.xpEarned
      });
    }
  };

  const completeStory = (storyId: string) => {
    if (user && !user.completedStories.includes(storyId)) {
      setUser({
        ...user,
        completedStories: [...user.completedStories, storyId]
      });
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      currentStory,
      setCurrentStory,
      taskResults,
      addTaskResult,
      loading,
      setLoading,
      completeStory
    }}>
      {children}
    </AppContext.Provider>
  );
};