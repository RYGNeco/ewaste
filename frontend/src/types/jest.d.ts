/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

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
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | string[] | number): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

export {}; 