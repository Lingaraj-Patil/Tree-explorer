import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Camera, HelpCircle, Star, Lock } from 'lucide-react';
import { Story } from '../../types';

interface StoryNodeProps {
  story: Story;
  isCompleted: boolean;
  position: 'left' | 'center' | 'right';
  isFirst?: boolean;
}

const StoryNode: React.FC<StoryNodeProps> = ({ story, isCompleted, position, isFirst = false }) => {
  const getIcon = () => {
    switch (story.type) {
      case 'story':
        return BookOpen;
      case 'task':
        return Camera;
      case 'quiz':
        return HelpCircle;
      case 'bonus':
        return Star;
      default:
        return BookOpen;
    }
  };

  const getNodeStyle = () => {
    if (story.isLocked) {
      return 'bg-gray-300 border-gray-400 text-gray-500';
    }
    if (isCompleted) {
      return 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 text-white shadow-lg';
    }
    if (story.type === 'bonus') {
      return 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-500 text-white shadow-lg';
    }
    return 'bg-gradient-to-br from-green-300 to-green-500 border-green-400 text-white shadow-md hover:shadow-lg';
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'left':
        return 'ml-8';
      case 'right':
        return 'mr-8';
      default:
        return 'mx-auto';
    }
  };

  const getCurvedPath = () => {
    if (isFirst) return null;
    
    // Different curved paths based on position
    switch (position) {
      case 'left':
        return (
          <svg 
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-16 z-0" 
            viewBox="0 0 128 64"
            fill="none"
          >
            <path
              d="M64 64 Q32 32 64 0"
              stroke={isCompleted ? "#10b981" : "#d1d5db"}
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        );
      case 'right':
        return (
          <svg 
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-16 z-0" 
            viewBox="0 0 128 64"
            fill="none"
          >
            <path
              d="M64 64 Q96 32 64 0"
              stroke={isCompleted ? "#10b981" : "#d1d5db"}
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        );
      default:
        return (
          <svg 
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-8 h-16 z-0" 
            viewBox="0 0 32 64"
            fill="none"
          >
            <path
              d="M16 64 L16 0"
              stroke={isCompleted ? "#10b981" : "#d1d5db"}
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        );
    }
  };

  const Icon = getIcon();

  const NodeContent = (
    <div className={`relative ${getPositionStyle()}`}>
      {/* Curved Connection Path */}
      {getCurvedPath()}
      
      {/* Node Circle */}
      <div
        className={`
          relative z-10 w-20 h-20 rounded-full border-4 flex items-center justify-center
          transition-all duration-300 transform hover:scale-105
          ${getNodeStyle()}
          ${story.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {story.isLocked ? (
          <Lock className="h-8 w-8" />
        ) : (
          <Icon className="h-8 w-8" />
        )}
      </div>

      {/* Completion Crown */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center z-20">
          <span className="text-xs">👑</span>
        </div>
      )}

      {/* XP Badge */}
      {!story.isLocked && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 text-xs font-bold text-green-600 border-2 border-green-500 z-20">
          +{story.xpReward}
        </div>
      )}
    </div>
  );

  if (story.isLocked) {
    return (
      <div className="flex flex-col items-center mb-16">
        {NodeContent}
        <div className="mt-4 text-center max-w-xs">
          <h3 className="font-bold text-gray-500 text-sm mb-1">{story.title}</h3>
          <p className="text-xs text-gray-400">Complete previous lessons to unlock</p>
        </div>
      </div>
    );
  }

  return (
    <Link to={story.type === 'task' ? '/task' : `/stories/${story.id}`} className="block">
      <div className="flex flex-col items-center mb-16 group">
        {NodeContent}
        <div className="mt-4 text-center max-w-xs">
          <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-green-600 transition-colors">
            {story.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">{story.blurb}</p>
          {story.type === 'bonus' && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Star className="h-3 w-3 mr-1" />
                Bonus
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StoryNode;