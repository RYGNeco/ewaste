import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('handles successful API call', async () => {
    const mockData = { id: 1, name: 'Test User', email: 'test@example.com' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const UserProfileComponent = () => {
      const [user, setUser] = React.useState<any>(null);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState('');

      const fetchUser = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('/api/user/1');
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setError('Failed to fetch user');
          }
        } catch (err) {
          setError('Network error');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div>
          <button onClick={fetchUser} data-testid="fetch-button">
            Fetch User
          </button>
          {loading && <div data-testid="loading">Loading...</div>}
          {error && <div data-testid="error">{error}</div>}
          {user && (
            <div data-testid="user-profile">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      );
    };

    render(<UserProfileComponent />);

    // Click fetch button
    fireEvent.click(screen.getByTestId('fetch-button'));

    // Check loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for API response
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('handles API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const UserProfileComponent = () => {
      const [user, setUser] = React.useState<any>(null);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState('');

      const fetchUser = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('/api/user/999');
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setError(`Error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          setError('Network error');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div>
          <button onClick={fetchUser} data-testid="fetch-button">
            Fetch User
          </button>
          {loading && <div data-testid="loading">Loading...</div>}
          {error && <div data-testid="error">{error}</div>}
          {user && (
            <div data-testid="user-profile">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      );
    };

    render(<UserProfileComponent />);

    fireEvent.click(screen.getByTestId('fetch-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: 404 Not Found')).toBeInTheDocument();
    expect(screen.queryByTestId('user-profile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const UserProfileComponent = () => {
      const [user, setUser] = React.useState<any>(null);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState('');

      const fetchUser = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('/api/user/1');
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setError(`Error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          setError('Network error');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div>
          <button onClick={fetchUser} data-testid="fetch-button">
            Fetch User
          </button>
          {loading && <div data-testid="loading">Loading...</div>}
          {error && <div data-testid="error">{error}</div>}
          {user && (
            <div data-testid="user-profile">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      );
    };

    render(<UserProfileComponent />);

    fireEvent.click(screen.getByTestId('fetch-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.queryByTestId('user-profile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('handles form submission with API call', async () => {
    const mockResponse = { success: true, message: 'User created successfully' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const CreateUserForm = () => {
      const [formData, setFormData] = React.useState({ name: '', email: '' });
      const [loading, setLoading] = React.useState(false);
      const [message, setMessage] = React.useState('');

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();
          setMessage(data.message);
        } catch (err) {
          setMessage('Error creating user');
        } finally {
          setLoading(false);
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            data-testid="name-input"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            data-testid="email-input"
          />
          <button type="submit" disabled={loading} data-testid="submit-button">
            {loading ? 'Creating...' : 'Create User'}
          </button>
          {message && <div data-testid="message">{message}</div>}
        </form>
      );
    };

    render(<CreateUserForm />);

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');

    await waitFor(() => {
      expect(screen.getByTestId('message')).toBeInTheDocument();
    });

    expect(screen.getByText('User created successfully')).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('Create User');

    // Verify the API call was made with correct data
    expect(mockFetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
    });
  });

  it('handles multiple API calls with proper state management', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 3, name: 'User 3' }),
      });

    const UserListComponent = () => {
      const [users, setUsers] = React.useState<any[]>([]);
      const [loading, setLoading] = React.useState(false);

      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          setUsers(data);
        } catch (err) {
          console.error('Error fetching users:', err);
        } finally {
          setLoading(false);
        }
      };

      const addUser = async () => {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'User 3' }),
          });
          const newUser = await response.json();
          setUsers([...users, newUser]);
        } catch (err) {
          console.error('Error adding user:', err);
        }
      };

      return (
        <div>
          <button onClick={fetchUsers} data-testid="fetch-users">
            Fetch Users
          </button>
          <button onClick={addUser} data-testid="add-user">
            Add User
          </button>
          {loading && <div data-testid="loading">Loading...</div>}
          <ul data-testid="user-list">
            {users.map((user) => (
              <li key={user.id} data-testid={`user-${user.id}`}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    render(<UserListComponent />);

    // Fetch users
    fireEvent.click(screen.getByTestId('fetch-users'));

    await waitFor(() => {
      expect(screen.getByTestId('user-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-2')).toBeInTheDocument();
    });

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();

    // Add new user
    fireEvent.click(screen.getByTestId('add-user'));

    await waitFor(() => {
      expect(screen.getByTestId('user-3')).toBeInTheDocument();
    });

    expect(screen.getByText('User 3')).toBeInTheDocument();
  });
}); 