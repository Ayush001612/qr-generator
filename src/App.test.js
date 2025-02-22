import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders QR Code Generator heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/QR Code Generator/i);
  expect(headingElement).toBeInTheDocument();
});
