import React from 'react';

interface NavigationProgressProps {
  isVisible?: boolean;
}

const NavigationProgress: React.FC<NavigationProgressProps> = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50">
      <div className="h-full bg-blue-400 animate-pulse"></div>
    </div>
  );
};

export default NavigationProgress;
