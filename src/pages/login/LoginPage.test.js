import {React} from 'react';
import {render} from '@testing-library/react';
import LoginPage from './LoginPage';

test('LoginPage Renders all elements on the page', () => {
  const {getByText} = render(<LoginPage />);
  expect(getByText('Användarnamn')).toBeInTheDocument();
  expect(getByText('Lösenord')).toBeInTheDocument();
})
