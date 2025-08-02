import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Firebase Auth
const mockOnAuthStateChanged = jest.fn();
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged
  }))
}));

describe('Simple Test', () => {
  beforeEach(() => {
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(null); // No user initially
      return jest.fn(); // Return unsubscribe function
    });
  });

  it('renders a simple component', () => {
    const TestComponent = () => <div>Hello World</div>;
    render(<TestComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('can use jest-dom matchers', () => {
    const TestComponent = () => <button disabled>Click me</button>;
    render(<TestComponent />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 