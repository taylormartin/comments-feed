import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { render, screen, waitFor } from '@testing-library/react';
import { POSTS } from './posts'
import App from './App'

const restHandlers = [
  http.get('http://localhost:3001/getComments', () => {
    return HttpResponse.json(POSTS)
  }),
]

const server = setupServer(...restHandlers)

describe('Comments', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  it('renders correctly', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('When you were here before')).toBeInTheDocument();
    });
  });
});
