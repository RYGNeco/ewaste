import React from 'react';
<<<<<<< HEAD
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Mock Firebase Auth - Define mocks first
const mockSignInWithPopup = jest.fn();
const mockOnAuthStateChanged = jest.fn();
const mockSignOut = jest.fn();

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged,
    signOut: mockSignOut
  })),
  signInWithPopup: mockSignInWithPopup,
  GoogleAuthProvider: jest.fn(() => ({
    addScope: jest.fn(),
    setCustomParameters: jest.fn()
  }))
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/login' })
}));

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
  global.fetch = jest.fn((input: string | URL | Request, init?: RequestInit) => {
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
        } as unknown as Response);
      }
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Invalid credentials' })
      } as unknown as Response);
    }
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' })
    } as unknown as Response);
  }) as typeof fetch;
});

beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
  mockOnAuthStateChanged.mockImplementation((callback) => {
    callback(null); // No user initially
    return jest.fn(); // Return unsubscribe function
  });
});

afterAll(() => {
  if (global.fetch && 'mockClear' in global.fetch) {
    // @ts-ignore
    global.fetch.mockClear();
  }
  global.fetch = jest.fn();
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
=======
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Accessibility Tests', () => {
  it('renders form with proper labels and associations', () => {
    const AccessibleForm = () => (
      <form>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          aria-describedby="username-help"
        />
        <div id="username-help">Enter your username</div>
        
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          aria-describedby="password-help"
        />
        <div id="password-help">Enter your password</div>
        
        <button type="submit">Submit</button>
      </form>
    );

    render(<AccessibleForm />);

    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('aria-describedby', 'username-help');
    expect(passwordInput).toHaveAttribute('aria-describedby', 'password-help');
  });

  it('handles keyboard navigation in a list', () => {
    const KeyboardList = () => {
      const [selectedIndex, setSelectedIndex] = React.useState(0);
      const items = ['Item 1', 'Item 2', 'Item 3'];

      const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % items.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
            break;
        }
      };

      return (
        <div onKeyDown={handleKeyDown} tabIndex={0} role="listbox">
          {items.map((item, index) => (
            <div
              key={index}
              role="option"
              aria-selected={index === selectedIndex}
              data-testid={`option-${index}`}
            >
              {item}
            </div>
          ))}
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        </div>
      );
    };

<<<<<<< HEAD
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
=======
    render(<KeyboardList />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    // Initial selection
    expect(screen.getByTestId('option-0')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('option-1')).toHaveAttribute('aria-selected', 'false');

    // Navigate down
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(screen.getByTestId('option-1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('option-0')).toHaveAttribute('aria-selected', 'false');

    // Navigate down again
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(screen.getByTestId('option-2')).toHaveAttribute('aria-selected', 'true');

    // Navigate up
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(screen.getByTestId('option-1')).toHaveAttribute('aria-selected', 'true');
  });

  it('renders modal with proper focus management', () => {
    const AccessibleModal = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const modalRef = React.useRef<HTMLDivElement>(null);

      React.useEffect(() => {
        if (isOpen && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          if (firstElement) {
            firstElement.focus();
          }
        }
      }, [isOpen]);

      return (
        <div>
          <button onClick={() => setIsOpen(true)} data-testid="open-modal">
            Open Modal
          </button>
          {isOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              ref={modalRef}
              data-testid="modal"
            >
              <h2 id="modal-title">Modal Title</h2>
              <p>Modal content</p>
              <button onClick={() => setIsOpen(false)} data-testid="close-modal">
                Close
              </button>
            </div>
          )}
        </div>
      );
    };

    render(<AccessibleModal />);

    // Open modal
    fireEvent.click(screen.getByTestId('open-modal'));

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');

    const closeButton = screen.getByTestId('close-modal');
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);
  });

  it('renders collapsible content with proper ARIA attributes', () => {
    const CollapsibleContent = () => {
      const [isExpanded, setIsExpanded] = React.useState(false);

      return (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="collapsible-content"
            data-testid="toggle-button"
          >
            {isExpanded ? 'Hide' : 'Show'} Content
          </button>
          <div
            id="collapsible-content"
            aria-hidden={!isExpanded}
            data-testid="collapsible-content"
          >
            <p>This is the collapsible content</p>
          </div>
        </div>
      );
    };

    render(<CollapsibleContent />);

    const toggleButton = screen.getByTestId('toggle-button');
    const content = screen.getByTestId('collapsible-content');

    // Initially collapsed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveAttribute('aria-hidden', 'true');
    expect(toggleButton).toHaveAttribute('aria-controls', 'collapsible-content');

    // Expand content
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(content).toHaveAttribute('aria-hidden', 'false');

    // Collapse content
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders error messages with proper ARIA attributes', () => {
    const FormWithErrors = () => {
      const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

      const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!email.includes('@')) {
          newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
      };

      return (
        <form>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <div id="email-error" role="alert" data-testid="email-error">
              {errors.email}
            </div>
          )}
          <button type="button" onClick={validateForm} data-testid="validate-button">
            Validate
          </button>
        </form>
      );
    };

    render(<FormWithErrors />);

    const emailInput = screen.getByLabelText('Email:');
    const validateButton = screen.getByTestId('validate-button');

    // Validate empty form
    fireEvent.click(validateButton);

    const errorMessage = screen.getByTestId('email-error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveTextContent('Email is required');
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('renders skip links for keyboard navigation', () => {
    const PageWithSkipLinks = () => (
      <div>
        <a href="#main-content" className="skip-link" data-testid="skip-main">
          Skip to main content
        </a>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
        <main id="main-content" data-testid="main-content">
          <h1>Main Content</h1>
          <p>This is the main content area</p>
        </main>
      </div>
    );

    render(<PageWithSkipLinks />);

    const skipLink = screen.getByTestId('skip-main');
    const mainContent = screen.getByTestId('main-content');

    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  it('handles screen reader announcements', () => {
    const LiveRegion = () => {
      const [announcement, setAnnouncement] = React.useState('');

      const makeAnnouncement = () => {
        setAnnouncement('Action completed successfully!');
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
      };

      return (
        <div>
<<<<<<< HEAD
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
=======
          <button onClick={makeAnnouncement} data-testid="announce-button">
            Complete Action
          </button>
          <div
            aria-live="polite"
            aria-atomic="true"
            data-testid="live-region"
          >
            {announcement}
          </div>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        </div>
      );
    };

<<<<<<< HEAD
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
=======
    render(<LiveRegion />);

    const liveRegion = screen.getByTestId('live-region');
    const announceButton = screen.getByTestId('announce-button');

    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');

    // Make announcement
    fireEvent.click(announceButton);
    expect(liveRegion).toHaveTextContent('Action completed successfully!');
  });
}); 
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
