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
