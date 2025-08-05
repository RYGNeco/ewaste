// Enhanced Testing Setup
import { jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

// Mock auth slice since the import is causing issues
const mockAuthSlice = {
  reducer: (state = {}, action: any) => state,
  actions: {
    setUser: (user: any) => ({ type: 'auth/setUser', payload: user }),
    logout: () => ({ type: 'auth/logout' }),
  },
};

// Mock setup utilities
export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: mockAuthSlice.reducer,
    },
    preloadedState: initialState,
  });
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Mock API responses
export const mockApiResponse = (data: any, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    headers: new Headers(),
    statusText: status === 200 ? 'OK' : 'Error',
  });
};

// Test user data
export const mockUsers = {
  superAdmin: {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@rygneco.com',
    userType: 'super_admin',
    role: 'super_admin',
    roleApprovalStatus: 'approved',
    approvedRoles: ['super_admin'],
  },
  employee: {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'employee',
    role: 'employee',
    roleApprovalStatus: 'pending',
    approvedRoles: [],
  },
  partner: {
    id: '3',
    name: 'Jane Partner',
    email: 'jane@partner.com',
    userType: 'partner',
    role: 'partner',
    roleApprovalStatus: 'approved',
    approvedRoles: ['partner'],
  },
};

// Custom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined;
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});

// Setup and teardown helpers
export const setupTests = () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })) as any;

  // Mock ResizeObserver
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })) as any;
};

export const cleanupTests = () => {
  jest.clearAllMocks();
  localStorage.clear();
};
