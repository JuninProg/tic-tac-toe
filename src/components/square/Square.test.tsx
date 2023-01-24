import { render, screen } from '@testing-library/react';
import Square from './Square';

test('Render square', () => {
  render(<Square value='test' onClick={() => {}}/>);
  const squareElement = screen.getByText('test');
  expect(squareElement).toBeInTheDocument();
});
