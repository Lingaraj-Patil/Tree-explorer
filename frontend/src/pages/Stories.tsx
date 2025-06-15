import React from 'react';
import { BookOpen, Trophy, Zap, Calendar } from 'lucide-react';
import { useStories } from '../hooks/useQueries';
import { useApp } from '../context/AppContext';
import StoryNode from '../components/ui/StoryNode';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const Stories: React.FC = () => {
  const { user } = useApp();
  const { data: stories, isLoading, isError, error } = useStories(user?.completedStories || []);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Oops! Something went wrong</h2>
          <p className="mb-4 text-gray-600">
            {error instanceof Error ? error.message : 'Failed to load stories. Please try again.'}
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading your learning path...</p>
        </div>
      </div>
    );
  }

  const groupedStories = stories?.reduce((acc, story) => {
    const key = `${story.section} - Unit ${story.unit}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(story);
    return acc;
  }, {} as Record<string, typeof stories>) || {};

  const completedCount = user?.completedStories?.length || 0;
  const totalStories = stories?.length || 0;
  const progressPercentage = totalStories > 0 ? (completedCount / totalStories) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-32 h-32 bg-green-200 rounded-full top-20 left-10 opacity-20 animate-pulse"></div>
        <div className="absolute w-24 h-24 delay-1000 bg-blue-200 rounded-full top-40 right-20 opacity-20 animate-pulse"></div>
        <div className="absolute w-40 h-40 bg-purple-200 rounded-full bottom-40 left-20 opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute delay-500 rounded-full bottom-20 right-10 w-28 h-28 bg-emerald-200 opacity-20 animate-pulse"></div>
      </div>

      {/* Header with Stats */}
      <div className="sticky top-0 z-40 border-b shadow-sm bg-white/80 backdrop-blur-sm border-white/20">
        <div className="max-w-4xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
          {/* Main Header Row */}
          <div className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side - Title and Progress Info */}
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 mr-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                  Learning Path
                </h1>
                <p className="text-sm text-gray-600">
                  {completedCount} of {totalStories} lessons completed
                </p>
              </div>
            </div>
            
            {/* Right Side - User Stats */}
            {user && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center text-sm bg-yellow-100 px-3 py-1.5 rounded-full shadow-sm">
                  <Zap className="flex-shrink-0 w-4 h-4 mr-1 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">{user.xp} XP</span>
                </div>
                <div className="flex items-center text-sm bg-orange-100 px-3 py-1.5 rounded-full shadow-sm">
                  <Calendar className="flex-shrink-0 w-4 h-4 mr-1 text-orange-600" />
                  <span className="font-semibold text-orange-800">{user.streak} days</span>
                </div>
                <div className="flex items-center text-sm bg-purple-100 px-3 py-1.5 rounded-full shadow-sm">
                  <Trophy className="flex-shrink-0 w-4 h-4 mr-1 text-purple-600" />
                  <span className="font-semibold text-purple-800">Rank #{user.rank}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Progress Bar Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-medium">Overall Progress</span>
              <span className="font-semibold">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full shadow-inner">
              <div 
                className="relative h-3 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-center text-gray-500">
              {totalStories - completedCount > 0 
                ? `${totalStories - completedCount} lessons remaining` 
                : 'All lessons completed! 🎉'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Story Path */}
      <div className="relative max-w-4xl px-4 py-6 pt-8 mx-auto sm:px-6 lg:px-8">
        {Object.entries(groupedStories).map(([sectionTitle, sectionStories], sectionIndex) => (
          <div key={sectionTitle} className={`${sectionIndex === 0 ? 'mb-12' : 'mb-16'}`}>
            {/* Section Header */}
            <div className={`text-center ${sectionIndex === 0 ? 'mb-8' : 'mb-12'}`}>
              <div className="inline-block px-8 py-4 border-2 border-green-200 rounded-full shadow-lg bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                  {sectionTitle}
                </h2>
                <div className="flex items-center justify-center mt-2 space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Story Nodes with Curved Paths */}
            <div className="relative">              
              {sectionStories.map((story, index) => {
                const isCompleted = user?.completedStories?.includes(story.id) || false;
                const position = index % 3 === 0 ? 'center' : index % 3 === 1 ? 'left' : 'right';
                const isFirst = index === 0;
                
                return (
                  <StoryNode
                    key={story.id}
                    story={story}
                    isCompleted={isCompleted}
                    position={position}
                    isFirst={isFirst}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Coming Soon Section */}
        <div className="py-12 text-center">
          <div className="max-w-md p-8 mx-auto border-2 border-green-300 border-dashed shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl backdrop-blur-sm">
            <div className="mb-6 text-5xl animate-bounce">🌱</div>
            <h3 className="mb-4 text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
              More Adventures Coming Soon!
            </h3>
            <p className="mb-6 text-gray-600">
              New tree discovery lessons and challenges are being added regularly. 
              Keep exploring to unlock amazing content!
            </p>
            <Button variant="secondary" className="shadow-lg hover:shadow-xl">
              <Trophy className="w-4 h-4" />
              Get Notified
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;