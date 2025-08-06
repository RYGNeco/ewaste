// Status Configuration Utility
// This replaces switch statements with a scalable, data-driven approach

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  description?: string;
}

export type StatusType = 'pending' | 'processing' | 'scheduled' | 'completed' | 'confirmed' | 'rejected' | 'cancelled';

// Centralized status configuration
export const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  pending: {
    label: 'Pending',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: 'FaClock',
    description: 'Awaiting action'
  },
  processing: {
    label: 'Processing',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'FaRecycle',
    description: 'Currently being processed'
  },
  scheduled: {
    label: 'Scheduled',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: 'FaCalendar',
    description: 'Scheduled for future'
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'FaCheckCircle',
    description: 'Successfully completed'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'FaCheckCircle',
    description: 'Confirmed and ready'
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: 'FaTimesCircle',
    description: 'Request was rejected'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: 'FaBan',
    description: 'Request was cancelled'
  }
};

// Utility functions
export const getStatusConfig = (status: StatusType): StatusConfig => {
  return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
};

export const getStatusColor = (status: StatusType): string => {
  return getStatusConfig(status).color;
};

export const getStatusBgColor = (status: StatusType): string => {
  return getStatusConfig(status).bgColor;
};

export const getStatusLabel = (status: StatusType): string => {
  return getStatusConfig(status).label;
};

export const getStatusIcon = (status: StatusType): string => {
  return getStatusConfig(status).icon;
};

// Batch-specific status configuration
export const BATCH_STATUS_CONFIG: Record<string, StatusConfig> = {
  ...STATUS_CONFIG,
  // Add batch-specific overrides if needed
  'in_transit': {
    label: 'In Transit',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: 'FaTruck',
    description: 'Being transported'
  }
};

// Pickup-specific status configuration
export const PICKUP_STATUS_CONFIG: Record<string, StatusConfig> = {
  ...STATUS_CONFIG,
  'assigned': {
    label: 'Assigned',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: 'FaUserCheck',
    description: 'Assigned to pickup team'
  }
};

// Factory function for creating status configurations
export const createStatusConfig = (
  statuses: Record<string, Partial<StatusConfig>>
): Record<string, StatusConfig> => {
  return Object.entries(statuses).reduce((acc, [key, config]) => {
    acc[key] = {
      label: config.label || key.charAt(0).toUpperCase() + key.slice(1),
      color: config.color || 'text-gray-600',
      bgColor: config.bgColor || 'bg-gray-100',
      icon: config.icon || 'FaCircle',
      description: config.description
    };
    return acc;
  }, {} as Record<string, StatusConfig>);
};

// Hook for React components
export const useStatusConfig = (status: StatusType) => {
  return getStatusConfig(status);
};

// Type-safe status validation
export const isValidStatus = (status: string): status is StatusType => {
  return status in STATUS_CONFIG;
};

// Status priority for sorting
export const STATUS_PRIORITY: Record<StatusType, number> = {
  pending: 1,
  scheduled: 2,
  processing: 3,
  confirmed: 4,
  completed: 5,
  cancelled: 6,
  rejected: 7
};

export const sortByStatus = (a: { status: StatusType }, b: { status: StatusType }): number => {
  return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
}; 