import { jest } from '@jest/globals';
import type { JestMatchers } from '@jest/expect';
import type { Mock } from 'jest-mock';
import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  const jest: typeof import('@jest/globals')['jest'];
  const expect: typeof import('@jest/globals')['expect'];
  const describe: typeof import('@jest/globals')['describe'];
  const it: typeof import('@jest/globals')['it'];
  const test: typeof import('@jest/globals')['test'];
  const beforeAll: typeof import('@jest/globals')['beforeAll'];
  const beforeEach: typeof import('@jest/globals')['beforeEach'];
  const afterAll: typeof import('@jest/globals')['afterAll'];
  const afterEach: typeof import('@jest/globals')['afterEach'];

  namespace jest {
    interface Matchers<R, T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  }
}

declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>, T = {}> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | string[] | number): R;
    toBeVisible(): R;
    toBeDisabled(): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

// Mock Response class
export class MockResponse<T = any> implements Response {
  private readonly responseData: T;

  constructor(
    data: T,
    public readonly ok: boolean = true,
    public readonly status: number = 200,
    public readonly statusText: string = 'OK'
  ) {
    this.responseData = data;
  }

  // Required Response properties
  public readonly headers: Headers = new Headers();
  public readonly redirected: boolean = false;
  public readonly type: ResponseType = 'default';
  public readonly url: string = '';
  public readonly body: ReadableStream<Uint8Array> | null = null;
  public readonly bodyUsed: boolean = false;

  // Methods
  public async arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error('Not implemented');
  }

  public async blob(): Promise<Blob> {
    throw new Error('Not implemented');
  }

  public async formData(): Promise<FormData> {
    throw new Error('Not implemented');
  }

  public async json(): Promise<T> {
    return this.responseData;
  }

  public async text(): Promise<string> {
    return JSON.stringify(this.responseData);
  }

  public clone(): Response {
    return new MockResponse(this.responseData, this.ok, this.status, this.statusText);
  }
}

// Mock fetch type
export type MockFetch = Mock<typeof fetch>;

// Helper function to create mock responses
export function createMockResponse<T>(data: T, ok = true, status = 200, statusText = 'OK'): Response {
  return new MockResponse(data, ok, status, statusText);
}

// Re-export Jest functions to ensure they're properly typed
export { jest };
export const fn = jest.fn;
export const spyOn = jest.spyOn;
export const mock = jest.mock;

// Add type for callback in onAuthStateChanged
export type AuthStateCallback = (user: any | null) => void;