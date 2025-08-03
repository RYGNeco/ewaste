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
    mockOnAuthStateChanged.mockReset();
    mockOnAuthStateChanged.mockReturnValue(jest.fn());
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