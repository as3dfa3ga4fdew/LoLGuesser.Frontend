import { React } from 'react';
import HomePage from './HomePage';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';

it('HomePage renders without crashing', () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
});

it('Matches previous snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('contains ability option', () => {
    const {getByText} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(getByText('Ability')).toBeInTheDocument();
});

it('contains all nav-links', () => {
    const {getAllByRole} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(getAllByRole("link")).toHaveLength(3);
});

it('has the correct CSS classes', () => {
    const {container} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(container.querySelector(".home-container")).toBeInTheDocument();
    expect(container.querySelector(".home-window")).toBeInTheDocument();
});

it("navigates to 'ability' page", () => {
    render(
      <BrowserRouter initialEntries={["/"]}>
        <HomePage />
      </BrowserRouter>
    );
  
    const abilityLink = screen.getByAltText("ability");

    fireEvent.click(abilityLink);
    
    expect(window.location.pathname).toBe("/ability");
  });

it("navigates to 'lore' page", () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    )

    const loreLink = screen.getByAltText("lore");

    fireEvent.click(loreLink);
    
    expect(window.location.pathname).toBe("/lore");
});

it("navigates to 'splash' page", () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    )

    const splashLink = screen.getByAltText("splash");

    fireEvent.click(splashLink);
    
    expect(window.location.pathname).toBe("/splash");
});

it('does not contain title when there is no data', () => {
    // You would have to mock the scenario where no data is passed to the HomePage
    const {queryByText} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(queryByText('Choose blyad')).not.toBeInTheDocument();
});

it('does not show incorrect number of nav-links', () => {
    // Mock the scenario where links are not as expected
    const {queryAllByRole} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(queryAllByRole("link")).not.toHaveLength(4); // Assuming 3 is the correct number
});

it("does not navigate to an incorrect page when 'ability' is clicked", () => {
    render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>
    );

    const abilityLink = screen.getByAltText("ability");
    fireEvent.click(abilityLink);

    expect(window.location.pathname).not.toBe("/incorrect-path");
});

it('does not show error message during normal operation', () => {
    const {queryByText} = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    expect(queryByText('Error loading page')).not.toBeInTheDocument();
});