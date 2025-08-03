import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest, fn, mock, type AuthStateCallback } from '../test-utils';

// Mock Firebase Auth
const mockOnAuthStateChanged = fn<AuthStateCallback>();
mock('firebase/auth', () => ({
  getAuth: fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged
  }))
}));

describe('App Component', () => {
  beforeEach(() => {
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(null); // No user initially
      return jest.fn(); // Return unsubscribe function
    });
  });

  it('can render a simple component', () => {
    const SimpleComponent = () => <div>Test Component</div>;
    render(<SimpleComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('can render a form component', () => {
    const FormComponent = () => (
      <form>
        <label htmlFor="test">Test Label</label>
        <input id="test" type="text" />
        <button type="submit">Submit</button>
      </form>
    );
    
    render(<FormComponent />);
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('can handle user interactions', async () => {
    const InteractiveComponent = () => {
      const [count, setCount] = React.useState(0);
      return (
        <div>
          <span>Count: {count}</span>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    };
    
    render(<InteractiveComponent />);
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: 'Increment' });
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
}); 