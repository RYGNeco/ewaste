import React, { useState } from 'react';

interface Message {
  id: number;
  subject: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  type: 'inbox' | 'draft' | 'sent' | 'deleted';
  attachments?: string[];
}

const MessagesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'draft' | 'sent' | 'deleted'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Mock messages data
  const [messages] = useState<Message[]>([
    {
      id: 1,
      subject: 'Pickup Confirmation',
      sender: 'RYGNeco Support',
      content: 'Your pickup has been scheduled for tomorrow at 10 AM.',
      timestamp: '2025-08-01 09:30 AM',
      isRead: false,
      isStarred: true,
      type: 'inbox'
    },
    {
      id: 2,
      subject: 'Device Status Update',
      sender: 'Processing Team',
      content: 'Your devices have been processed and are ready for recycling.',
      timestamp: '2025-07-31 02:15 PM',
      isRead: true,
      isStarred: false,
      type: 'inbox'
    },
    // Add more mock messages as needed
  ]);

  const filteredMessages = messages.filter(message => {
    if (activeTab !== message.type) return false;
    if (showUnreadOnly && message.isRead) return false;
    if (showStarredOnly && !message.isStarred) return false;
    if (searchTerm && !message.subject.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex h-full">
      {/* Messages List */}
      <div className="w-1/3 border-r">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-3 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 mb-4">
            <select
              className="px-3 py-2 border rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
            >
              <option value="inbox">Inbox</option>
              <option value="draft">Drafts</option>
              <option value="sent">Sent</option>
              <option value="deleted">Deleted</option>
            </select>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="mr-2"
              />
              Unread
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showStarredOnly}
                onChange={(e) => setShowStarredOnly(e.target.checked)}
                className="mr-2"
              />
              Starred
            </label>
          </div>

          <div className="space-y-2">
            {filteredMessages.map(message => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedMessage?.id === message.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50 border-gray-200'
                } border`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium ${!message.isRead ? 'font-bold' : ''}`}>
                    {message.subject}
                  </span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-4">
        {selectedMessage ? (
          <div>
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-2">{selectedMessage.subject}</h2>
                <div className="text-sm text-gray-600">
                  From: {selectedMessage.sender}
                  <br />
                  {selectedMessage.timestamp}
                </div>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
                  Reply
                </button>
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
                  Forward
                </button>
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
                  Download
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a message to view its contents
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;
