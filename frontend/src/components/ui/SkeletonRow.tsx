import React from 'react';

const SkeletonRow: React.FC = () => {
  return (
    <div className="p-6 bg-white border-l-4 border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Rank skeleton */}
          <div className="mr-4 w-6 h-6 bg-gray-200 rounded"></div>
          
          {/* Avatar skeleton */}
          <div className="text-3xl mr-4 w-12 h-12 bg-gray-200 rounded-full"></div>
          
          <div className="min-w-0 flex-1">
            {/* Name skeleton */}
            <div className="h-5 bg-gray-200 rounded mb-2 w-32"></div>
            {/* Stats skeleton */}
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          {/* XP skeleton */}
          <div className="h-6 bg-gray-200 rounded mb-1 w-20"></div>
          {/* Badge skeleton */}
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRow;