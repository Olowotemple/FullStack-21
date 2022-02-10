import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('A todo can be rendered', () => {
  const todo = {
    _id: '61e592dae6207e8dc8ed762e',
    text: 'Write code',
    done: true,
  };

  render(<Todo todo={todo} />);
  const linkElement = screen.getByText('Write code');
  expect(linkElement).toBeInTheDocument();
});
