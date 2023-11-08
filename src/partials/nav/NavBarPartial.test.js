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
  //Positive
  it('navigates to the login page when the login link is clicked', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: null, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );
  
    fireEvent.click(getByText(/login/i));
    expect(window.location.pathname).toBe('/login');
  });
  
  //Positive
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
  //negative 
  it('does not render the logout button when user is not logged in', () => {
    render(
      <UserContext.Provider value={{ user: null, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    // Expect Logout button to not be present
    const logoutButton = screen.queryByText(/logout/i);
    expect(logoutButton).not.toBeInTheDocument();
  });
  //positive 
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
  //Negative 
  it('does not show user information when user is not logged in', () => {
    render(
      <UserContext.Provider value={{ user: null, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    // User information should not be visible
    const userInfo = screen.queryByTestId('user-info'); // Assuming there's a data-testid="user-info" on the user information element
    expect(userInfo).not.toBeInTheDocument();
  });

  //Negative 
  it('does not render login and register links when user is logged in', () => {
    const user = { jwt: "token", username: "testUser", score: 5, rememberMe: true };

    render(
      <UserContext.Provider value={{ user: user, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    // Expect the login and register links to not be present
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });

  //Negative 
  it('logout function is not called if logout button is not present (user not logged in)', () => {
    render(
      <UserContext.Provider value={{ user: null, userUpdate: userUpdateMock }}>
        <Router>
          <NavBarPartial />
        </Router>
      </UserContext.Provider>
    );

    const logoutButton = screen.queryByText(/logout/i);
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }

    // The userUpdateMock function should not have been called since the logout button is not present
    expect(userUpdateMock).not.toHaveBeenCalled();
  });
});