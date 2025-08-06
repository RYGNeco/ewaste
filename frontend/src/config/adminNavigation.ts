import React from 'react';

// Admin Navigation Configuration
// This file centralizes all admin navigation configuration for better maintainability

export interface NavigationItem {
  title: string;
  path: string;
  section: string;
  icon: React.ReactNode;
  requiredRole?: string; // Optional role requirement
}

export const ADMIN_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/admin',
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
    title: 'Batches',
    path: '/admin/batches',
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
    title: 'Partners',
    path: '/admin/partners',
    section: 'partners',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    })),
  },
  {
    title: 'Employees',
    path: '/admin/employees',
    section: 'employees',
    requiredRole: 'admin', // Only admins can access employee management
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    })),
  },
  {
    title: 'Approvals',
    path: '/admin/approvals',
    section: 'approvals',
    requiredRole: 'admin', // Only admins can access approvals
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
  },
  {
    title: 'Analytics',
    path: '/admin/analytics',
    section: 'analytics',
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
    title: 'Settings',
    path: '/admin/settings',
    section: 'settings',
    icon: React.createElement('svg', {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }), React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    })),
  },
] as const;

// Route to tab mapping for URL-based navigation
export const ROUTE_TO_TAB_MAPPING: Record<string, string> = {
  '/admin': 'dashboard',
  '/admin/': 'dashboard',
  '/admin/batches': 'batches',
  '/admin/partners': 'partners',
  '/admin/employees': 'employees',
  '/admin/approvals': 'approvals',
  '/admin/analytics': 'analytics',
  '/admin/settings': 'settings'
};

// Utility function to get navigation items based on user role
export const getNavigationItemsForRole = (userRole?: string): NavigationItem[] => {
  return ADMIN_NAVIGATION_ITEMS.filter(item => {
    // If no role requirement, show to everyone
    if (!item.requiredRole) return true;
    
    // If user has required role, show the item
    return userRole === item.requiredRole || userRole === 'super_admin';
  });
};

// Utility function to get active tab from pathname
export const getActiveTabFromPath = (pathname: string): string => {
  return ROUTE_TO_TAB_MAPPING[pathname] || 'dashboard';
};

// Utility function to check if user has access to a section
export const hasAccessToSection = (section: string, userRole?: string): boolean => {
  const item = ADMIN_NAVIGATION_ITEMS.find(nav => nav.section === section);
  if (!item) return false;
  
  if (!item.requiredRole) return true;
  return userRole === item.requiredRole || userRole === 'super_admin';
}; 