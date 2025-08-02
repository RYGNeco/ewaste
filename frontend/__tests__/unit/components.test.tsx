import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Component Tests', () => {
  it('renders a button with click handler', () => {
    const handleClick = jest.fn();
    const ButtonComponent = () => (
      <button onClick={handleClick} data-testid="test-button">
        Click Me
      </button>
    );

    render(<ButtonComponent />);
    
    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a form with validation', () => {
    const FormComponent = () => {
      const [email, setEmail] = React.useState('');
      const [error, setError] = React.useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes('@')) {
          setError('Please enter a valid email');
        } else {
          setError('');
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email-input"
          />
          {error && <span data-testid="error-message">{error}</span>}
          <button type="submit" data-testid="submit-button">Submit</button>
        </form>
      );
    };

    render(<FormComponent />);

    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByTestId('submit-button').closest('form')!);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();

    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByTestId('submit-button').closest('form')!);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('renders a list with dynamic items', () => {
    const ListComponent = () => {
      const [items, setItems] = React.useState(['Item 1', 'Item 2']);
      const [newItem, setNewItem] = React.useState('');

      const addItem = () => {
        if (newItem.trim()) {
          setItems([...items, newItem]);
          setNewItem('');
        }
      };

      return (
        <div>
          <ul data-testid="item-list">
            {items.map((item, index) => (
              <li key={index} data-testid={`item-${index}`}>
                {item}
              </li>
            ))}
          </ul>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            data-testid="new-item-input"
          />
          <button onClick={addItem} data-testid="add-button">
            Add Item
          </button>
        </div>
      );
    };

    render(<ListComponent />);

    // Check initial items
    expect(screen.getByTestId('item-0')).toHaveTextContent('Item 1');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Item 2');

    // Add new item
    const input = screen.getByTestId('new-item-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Item 3' } });
    fireEvent.click(addButton);

    // Check new item was added
    expect(screen.getByTestId('item-2')).toHaveTextContent('Item 3');
    expect(input).toHaveValue('');
  });

  it('renders a modal with backdrop click', () => {
    const ModalComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <div>
          <button onClick={() => setIsOpen(true)} data-testid="open-modal">
            Open Modal
          </button>
          {isOpen && (
            <div data-testid="modal-backdrop" onClick={() => setIsOpen(false)}>
              <div data-testid="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Modal Title</h2>
                <p>Modal content goes here</p>
                <button onClick={() => setIsOpen(false)} data-testid="close-modal">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    render(<ModalComponent />);

    // Modal should be closed initially
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();

    // Open modal
    fireEvent.click(screen.getByTestId('open-modal'));
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Modal Title')).toBeInTheDocument();

    // Close modal via close button
    fireEvent.click(screen.getByTestId('close-modal'));
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();

    // Open modal again
    fireEvent.click(screen.getByTestId('open-modal'));
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    // Close modal via backdrop click
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('renders a search component with debounced input', async () => {
    const SearchComponent = () => {
      const [searchTerm, setSearchTerm] = React.useState('');
      const [results, setResults] = React.useState<string[]>([]);

      React.useEffect(() => {
        const timeoutId = setTimeout(() => {
          if (searchTerm) {
            setResults([`Result for: ${searchTerm}`]);
          } else {
            setResults([]);
          }
        }, 100);

        return () => clearTimeout(timeoutId);
      }, [searchTerm]);

      return (
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            data-testid="search-input"
          />
          <div data-testid="search-results">
            {results.map((result, index) => (
              <div key={index} data-testid={`result-${index}`}>
                {result}
              </div>
            ))}
          </div>
        </div>
      );
    };

    render(<SearchComponent />);

    const searchInput = screen.getByTestId('search-input');

    // Type in search
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Wait for debounced results
    await waitFor(() => {
      expect(screen.getByTestId('result-0')).toHaveTextContent('Result for: test');
    });

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.queryByTestId('result-0')).not.toBeInTheDocument();
    });
  });
}); 