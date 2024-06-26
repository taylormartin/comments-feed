import '@testing-library/jest-dom';

Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
    value: vi.fn(),
    writable: true,
});