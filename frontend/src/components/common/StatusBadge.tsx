import React from 'react';
import { 
  FaClock, 
  FaRecycle, 
  FaCalendar, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaBan,
  FaTruck,
  FaUserCheck,
  FaCircle
} from 'react-icons/fa';
import { getStatusConfig, StatusType, StatusConfig } from '../../utils/statusConfig';

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FaClock,
  FaRecycle,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaTruck,
  FaUserCheck,
  FaCircle
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  showDescription = false,
  size = 'md',
  className = ''
}) => {
  const config = getStatusConfig(status);
  const IconComponent = ICON_MAP[config.icon] || FaCircle;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-full font-medium ${config.bgColor} ${config.color}`}>
        {showIcon && <IconComponent className={iconSizes[size]} />}
        {config.label}
      </span>
      {showDescription && config.description && (
        <span className="text-xs text-gray-500 hidden sm:inline">
          {config.description}
        </span>
      )}
    </div>
  );
};

export default StatusBadge; 