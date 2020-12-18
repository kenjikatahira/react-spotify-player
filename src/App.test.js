import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render signing button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign in with Spotify/i);
  expect(linkElement).toBeInTheDocument();
});
