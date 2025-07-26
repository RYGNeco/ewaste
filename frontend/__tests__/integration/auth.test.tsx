import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';

// Mock fetch for login API
beforeAll(() => {
  global.fetch = jest.fn((input: string | URL | Request, init?: RequestInit) => {
    let url = '';
    if (typeof input === 'string') url = input;
    else if (input instanceof URL) url = input.toString();
    else if (input instanceof Request && typeof input.url === 'string') url = input.url;
    if (url.includes('/api/auth/login')) {
      const body = init && init.body ? JSON.parse(init.body as string) : {};
      if (body.username === 'admin' && body.password === 'adminpass') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ token: 'mock-jwt-token' })
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

afterAll(() => {
  if (global.fetch && 'mockClear' in global.fetch) {
    // @ts-ignore
    global.fetch.mockClear();
  }
  global.fetch = jest.fn();
});

describe('Authentication Flow', () => {
  it('shows error on invalid login', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('logs in and accesses protected route', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'adminpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
    // Simulate navigation to protected route
    fireEvent.click(screen.getByText(/protected page/i));
    await waitFor(() => {
      expect(screen.getByText(/protected content/i)).toBeInTheDocument();
    });
  });
});
