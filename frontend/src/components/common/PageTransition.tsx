import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isVisible = true }) => {
  return (
    <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

export default PageTransition;
