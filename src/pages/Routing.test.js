import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing'; // Assuming Routing is in the same directory
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import Ability from './ability/Ability';
import Lore from './lore/Lore';
import Splash from './splash/Splash';

jest.mock('./home/HomePage', () => () => <div>HomePageMock</div>);
jest.mock('./login/LoginPage', () => () => <div>LoginPageMock</div>);
jest.mock('./register/RegisterPage', () => () => <div>RegisterPageMock</div>);
jest.mock('./ability/Ability', () => () => <div>AbilityMock</div>);
jest.mock('./lore/Lore', () => () => <div>LoreMock</div>);
jest.mock('./splash/Splash', () => () => <div>SplashMock</div>);

describe('Routing', () => {

  //positive
  it('renders the HomePage component for the root route', () => {
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('HomePageMock')).toBeInTheDocument();
  });
  //Negative
  it('does not render the HomePage component on "/login" route', () => {
    window.history.pushState({}, 'Test page', '/login');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('HomePageMock')).not.toBeInTheDocument();
  });
  //positive
  it('renders the LoginPage component for "/login" route', () => {
    window.history.pushState({}, 'Test page', '/login');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('LoginPageMock')).toBeInTheDocument();
  });
  //Negative
  it('does not render the LoginPage component on "/" (root) route', () => {
    window.history.pushState({}, 'Test page', '/');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('LoginPageMock')).not.toBeInTheDocument();
  });
  //positive
  it('renders the RegisterPage component for "/register" route', () => {
    window.history.pushState({}, 'Test page', '/register');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('RegisterPageMock')).toBeInTheDocument();
  });
  //Negative
  it('does not render the RegisterPage component on "/" (root) route', () => {
    window.history.pushState({}, 'Test page', '/');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('RegisterPageMock')).not.toBeInTheDocument();
  });
  //positive
  it('renders the Ability component for "/ability" route', () => {
    window.history.pushState({}, 'Test page', '/ability');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('AbilityMock')).toBeInTheDocument();
  });
  //Negative
  it('does not render the Ability component on "/login" route', () => {
    window.history.pushState({}, 'Test page', '/login');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('AbilityMock')).not.toBeInTheDocument();
  });
  //positive
  it('renders the Lore component for "/lore" route', () => {
    window.history.pushState({}, 'Test page', '/lore');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('LoreMock')).toBeInTheDocument();
  });
   //Negative
  it('does not render the Lore component on "/" (root) route', () => {
    window.history.pushState({}, 'Test page', '/');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('LoreMock')).not.toBeInTheDocument();
  });
  //positive
  it('renders the Splash component for "/splash" route', () => {
    window.history.pushState({}, 'Test page', '/splash');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.getByText('SplashMock')).toBeInTheDocument();
  });
  //Negative
  it('does not render the Splash component on "/register" route', () => {
    window.history.pushState({}, 'Test page', '/register');
    render(
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
    expect(screen.queryByText('SplashMock')).not.toBeInTheDocument();
  }); 
});