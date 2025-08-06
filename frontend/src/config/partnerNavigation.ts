import React from 'react';

// Partner Navigation Configuration
// This file centralizes all partner navigation configuration for better maintainability

export interface PartnerNavigationItem {
  title: string;
  path: string;
  section: string;
  icon: React.ReactNode;
  requiredRole?: string; // Optional role requirement
}

export const PARTNER_NAVIGATION_ITEMS: PartnerNavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/partner',
    section: 'dashboard',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    })),
  },
  {
    title: 'My Batches',
    path: '/partner/batches',
    section: 'batches',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    })),
  },
  {
    title: 'Schedule Pickup',
    path: '/partner/pickup',
    section: 'pickup',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    })),
  },
  {
    title: 'Reports',
    path: '/partner/reports',
    section: 'reports',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    })),
  },
  {
    title: 'Messages',
    path: '/partner/messages',
    section: 'messages',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    })),
  },
  {
    title: 'Profile',
    path: '/partner/profile',
    section: 'profile',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    })),
  },
] as const;

// Route to tab mapping for URL-based navigation
export const PARTNER_ROUTE_TO_TAB_MAPPING: Record<string, string> = {
  '/partner': 'dashboard',
  '/partner/': 'dashboard',
  '/partner/batches': 'batches',
  '/partner/pickup': 'pickup',
  '/partner/reports': 'reports',
  '/partner/messages': 'messages',
  '/partner/profile': 'profile'
};

// Utility function to get navigation items based on user role
export const getPartnerNavigationItemsForRole = (userRole?: string): PartnerNavigationItem[] => {
  return PARTNER_NAVIGATION_ITEMS.filter(item => {
    // If no role requirement, show to everyone
    if (!item.requiredRole) return true;
    
    // If user has required role, show the item
    return userRole === item.requiredRole || userRole === 'super_admin';
  });
};

// Utility function to get active tab from pathname
export const getPartnerActiveTabFromPath = (pathname: string): string => {
  return PARTNER_ROUTE_TO_TAB_MAPPING[pathname] || 'dashboard';
};

// Utility function to check if user has access to a section
export const hasPartnerAccessToSection = (section: string, userRole?: string): boolean => {
  const item = PARTNER_NAVIGATION_ITEMS.find(nav => nav.section === section);
  if (!item) return false;
  
  if (!item.requiredRole) return true;
  return userRole === item.requiredRole || userRole === 'super_admin';
}; 