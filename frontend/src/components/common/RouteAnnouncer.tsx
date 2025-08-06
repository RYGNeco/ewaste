import React from 'react';

interface RouteAnnouncerProps {
  message?: string;
}

const RouteAnnouncer: React.FC<RouteAnnouncerProps> = ({ message = '' }) => {
  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
      id="route-announcer"
    >
      {message}
    </div>
  );
};

export default RouteAnnouncer;
