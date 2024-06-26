import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { POSTS } from './posts'
import useCommenter from '../hooks/useCommenter'
import App from './App'

const restHandlers = [
  http.get('http://localhost:3001/getComments', () => {
    return HttpResponse.json(POSTS)
  }),
  http.post('http://localhost:3001/createComment', async () => {
    return new HttpResponse('', {
      status: 200,
    })
  }),
]

const server = setupServer(...restHandlers)

describe('App', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  it('fetaches and renders the comments', async () => {
    render(<App />);
    await waitFor(() => {
      const comments = screen.getAllByRole('article');
      const comment = screen.getByText('When you were here before')
      expect(comment).toBeInTheDocument();
      expect(comments.length).toBe(7);
    });
  });

  it('allows a user to post a comment and clears inputs', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name Input');
    await user.type(nameInput, 'Taylor');

    const textInput = screen.getByLabelText('Comment Input');
    await user.type(textInput, 'I have a comment');

    const submitButton = screen.getByLabelText('Submit Comment');
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(textInput).toHaveValue('');
    });
  });

  it('disables the submit button if inputs are empty and enables when filled', async () => {
    const user = userEvent.setup();
    render(<App />);
    const nameInput = screen.getByLabelText('Name Input');
    const textInput = screen.getByLabelText('Comment Input');
    const submitButton = screen.getByLabelText('Submit Comment');

    expect(submitButton).toBeDisabled();

    await user.type(nameInput, 'Taylor');
    await user.type(textInput, 'I have a comment');

    expect(submitButton).toBeEnabled();
  });
});
