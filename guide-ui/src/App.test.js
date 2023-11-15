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

  test('renders file upload, progress bar, and data table', () => {
    render(<App />);
    expect(screen.getByLabelText('Upload file')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('uploads file and displays data', async () => {
    const data = [{ id: 1, name: 'John Doe' }];
    axios.post.mockResolvedValueOnce();
    axios.get.mockResolvedValueOnce({ data });

    render(<App />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Upload file');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('100%')).toBeInTheDocument();
      // expect(screen.getByText('ID')).toBeInTheDocument();
      // expect(screen.getByText('Name')).toBeInTheDocument();
      // expect(screen.getByText('1')).toBeInTheDocument();
      // expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('John Doe');
  });
  });

  test('displays error message on upload failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Upload failed'));

    render(<App />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Upload file');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('Error: Upload failed')).toBeInTheDocument();
    });
  });

  test('displays error message on data fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Data fetch failed'));

    render(<App />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const input = screen.getByLabelText('Upload file');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('Error: Data fetch failed')).toBeInTheDocument();
    });
  });


