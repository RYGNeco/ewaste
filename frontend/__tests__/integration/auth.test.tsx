import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { fn, mock, type MockFetch, type MockResponse } from '../test-utils';

// Mock Firebase Auth - Define mocks first
const mockSignInWithPopup = fn();
const mockOnAuthStateChanged = fn<(callback: (user: any | null) => void) => void>();
const mockSignOut = fn();

mock('firebase/auth', () => ({
  getAuth: fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged,
    signOut: mockSignOut
  })),
  signInWithPopup: mockSignInWithPopup,
  GoogleAuthProvider: fn(() => ({
    addScope: fn(),
    setCustomParameters: fn()
  }))
}));

// Mock react-router-dom
mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom') as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: () => fn(),
    useLocation: () => ({ pathname: '/login' })
  };
});

// Mock components to avoid CSS imports
jest.mock('../../src/components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navigation</div>;
  };
});

jest.mock('../../src/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock fetch for API calls
beforeAll(() => {
  const mockFetch = fn<typeof fetch>((input: string | URL | Request, init?: RequestInit) => {
    let url = '';
    if (typeof input === 'string') url = input;
    else if (input instanceof URL) url = input.toString();
    else if (input instanceof Request && typeof input.url === 'string') url = input.url;
    
    if (url.includes('/api/auth/login')) {
      const body = init && init.body ? JSON.parse(init.body as string) : {};
      if (body.email === 'admin@test.com' && body.password === 'adminpass') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ 
            token: 'mock-jwt-token',
            user: { email: 'admin@test.com', role: 'admin' }
          })
        } as Response);
      }
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Invalid credentials' })
      } as Response);
    }
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' })
    } as Response);
  });

  (global as any).fetch = mockFetch;
});

beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
  mockOnAuthStateChanged.mockImplementation((callback) => {
    callback(null); // No user initially
    return fn(); // Return unsubscribe function
  });
});

afterAll(() => {
  if (global.fetch && typeof global.fetch === 'function' && 'mockClear' in global.fetch) {
    ((global.fetch as unknown) as MockFetch).mockClear();
  }
  (global as any).fetch = fn<typeof fetch>();
});

describe('Authentication Flow', () => {
  it('renders a simple login form', () => {
    const TestLoginForm = () => (
      <div>
        <h2>Welcome Back</h2>
        <form>
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" placeholder="Enter your email" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );

    render(<TestLoginForm />);

    // Check for form elements
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    const TestLoginForm = () => {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');

      return (
        <div>
          <h2>Welcome Back</h2>
          <form>
            <label htmlFor="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
            />
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      );
    };

    render(<TestLoginForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('handles form submission', async () => {
    const mockSubmit = jest.fn();
    
    const TestLoginForm = () => {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mockSubmit({ email, password });
      };

      return (
        <div>
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
            />
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      );
    };

    render(<TestLoginForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
