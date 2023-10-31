import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import Ability from "./Ability";
import InputBox from "../../partials/inputs/InputBox";


test('Ability component displays image', () => {
    render(<Ability image="test.jpg" />);

    const abilityImage = screen.getByAltText('testbild');

    expect(abilityImage).toBeInTheDocument();
});

test('Ability component uses the correct CSS classes', () => {
    render(<Ability image="test.jpg"/>);

    const abilityContainer = screen.getByText('Which Champion has this Ability?').closest('.ability-container');
    const abilityWindow = screen.getByText('Which Champion has this Ability?').closest('.ability-window');

    expect(abilityContainer).toHaveClass('ability-container');
    expect(abilityWindow).toHaveClass('ability-window');
});

test('Ability component displays the title', () => {
    render(<Ability image="test.jpg" />);

    const title = screen.getByText('Which Champion has this Ability?');
    
    expect(title).toBeInTheDocument();
});

test('InputBox component renders with label and input', () => {
    render(<InputBox labelText="Användarnamn" />);
  
    const inputLabel = screen.getByText('Användarnamn');
  
    expect(inputLabel).toBeInTheDocument();
});