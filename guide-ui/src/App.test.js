import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';



jest.mock('axios');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  });




