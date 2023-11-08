import {React} from 'react';
import {fireEvent, render} from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';


const mockUserContext = {
  userUpdate: jest.fn(),
  user: {
    username: "Ackeloo1",
    score: 100,
  },
};

test('LoginPage Renders all elements on the page', () => {
  const {getByText} = render(
  <MemoryRouter>
    <UserContext.Provider value={mockUserContext}>
      <LoginPage />
    </UserContext.Provider>
  </MemoryRouter>
  );
  expect(getByText('Username')).toBeInTheDocument();
  expect(getByText('Password')).toBeInTheDocument();
  expect(getByText('Log in')).toBeInTheDocument();
});