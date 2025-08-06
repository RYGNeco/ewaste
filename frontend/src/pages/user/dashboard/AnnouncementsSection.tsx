import React, { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
}

const AnnouncementsSection: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  // Mock announcements data
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'New E-Waste Collection Guidelines',
      content: 'Please review the updated guidelines for e-waste collection and segregation...',
      date: '2025-08-01',
      priority: 'high',
      isRead: false
    },
    {
      id: 2,
      title: 'Holiday Schedule Updates',
      content: 'Our collection schedule will be modified during the upcoming holidays...',
      date: '2025-07-30',
      priority: 'medium',
      isRead: true
    },
    // Add more mock announcements as needed
  ]);

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'unread' && announcement.isRead) return false;
    if (filter === 'high' && announcement.priority !== 'high') return false;
    if (searchTerm && !announcement.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const markAsRead = (id: number) => {
    // This would typically be an API call
    console.log(`Marking announcement ${id} as read`);
  };

  return (
    <div className="flex h-full">
      {/* Announcements List */}
      <div className="w-1/3 border-r p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Announcements</option>
            <option value="unread">Unread</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredAnnouncements.map(announcement => (
            <div
              key={announcement.id}
              onClick={() => setSelectedAnnouncement(announcement)}
              className={`p-3 rounded-md cursor-pointer ${
                selectedAnnouncement?.id === announcement.id
                  ? 'bg-blue-50 border-blue-200'
                  : 'hover:bg-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-medium ${!announcement.isRead ? 'font-bold' : ''}`}>
                  {announcement.title}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  announcement.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : announcement.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {announcement.priority}
                </span>
              </div>
              <div className="text-sm text-gray-600">{announcement.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Content */}
      <div className="flex-1 p-4">
        {selectedAnnouncement ? (
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{selectedAnnouncement.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedAnnouncement.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : selectedAnnouncement.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {selectedAnnouncement.priority} priority
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Posted on {selectedAnnouncement.date}
              </div>
            </div>
            <div className="prose max-w-none">
              {selectedAnnouncement.content}
            </div>
            {!selectedAnnouncement.isRead && (
              <button
                onClick={() => markAsRead(selectedAnnouncement.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Mark as Read
              </button>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an announcement to view its contents
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsSection;
