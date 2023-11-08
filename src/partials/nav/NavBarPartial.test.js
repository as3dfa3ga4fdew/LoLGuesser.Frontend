import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext } from "../../contexts/UserContext";
import NavBarPartial from './NavBarPartial';

describe('NavBarPartial', () => {
  const userUpdateMock = jest.fn();

  it('renders correctly when user is not logged in', () => {
    render(
      <UserContext.Provider value={{ user: null, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    // Expect the login and register links to be present
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    // Expect Logout button to not be present
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it('renders user information and logout button when user is logged in', () => {
    const user = { jwt: "token", username: "testUser", score: 5, rememberMe: true };

    render(
      <UserContext.Provider value={{ user: user, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    // Expect the username and score to be present
    expect(screen.getByText(user.username)).toBeInTheDocument();
    expect(screen.getByText(user.score)).toBeInTheDocument();
    // Expect the Logout button to be present
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('calls the logout function when the logout button is clicked', () => {
    const user = { jwt: "token", username: "testUser", score: 5, rememberMe: true };

    render(
      <UserContext.Provider value={{ user: user, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText(/logout/i));

    // Expect the userUpdate function to have been called with the initial state
    expect(userUpdateMock).toHaveBeenCalledWith({jwt: "", username: "", score: 0, rememberMe: false});
  });
});