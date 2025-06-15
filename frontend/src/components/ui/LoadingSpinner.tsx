import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;