// jest.setup.js
import { setConfig } from 'next/config';
import config from './next.config';

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config);

// Mock the global window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

// Mock the useRouter function
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the specific methods you're using (e.g., push, replace, query, pathname, etc.)
const mockRouter = {
  push: jest.fn(),
  // Add other methods and properties as needed
};

// Assign the mock router to useRouter
jest.requireMock('next/router').useRouter.mockImplementation(() => mockRouter);

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
