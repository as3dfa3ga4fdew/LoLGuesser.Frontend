import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountButton from './AccountButton';

// Positive Test Case
test('renders the button with the correct text', () => {
  const testText = 'Test Button';
  render(<AccountButton text={testText} />);
  const buttonElement = screen.getByRole('button', { name: testText });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent(testText);
  expect(buttonElement).toHaveClass('account-button');
});

// Negative Test Case for the text
test('does not render the button with incorrect text', () => {
  const testText = 'Test Button';
  render(<AccountButton text={testText} />);
  const wrongText = 'Wrong Text';
  const buttonElement = screen.queryByText(wrongText);
  expect(buttonElement).not.toBeInTheDocument();
});

// Test if button triggers an event on click
test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<AccountButton text="Click Me" onClick={handleClick} />);
  fireEvent.click(screen.getByText(/click me/i)); // Now fireEvent should be defined
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test to ensure button renders even if 'text' prop is not provided or is undefined
test('renders button without text', () => {
    render(<AccountButton />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEmptyDOMElement();
  });

// Negative Test Case for the class
test('button does not have an incorrect class', () => {
  const testText = 'Test Button';
  render(<AccountButton text={testText} />);
  const buttonElement = screen.getByRole('button', { name: testText });
  expect(buttonElement).not.toHaveClass('incorrect-class');
});

// Test to check if providing an empty string still renders the button correctly
test('renders button with empty text', () => {
  render(<AccountButton text="" />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('');
});

// Test to ensure button renders even if 'text' prop is not provided or is undefined
test('renders button without text', () => {
  render(<AccountButton />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toBeEmptyDOMElement();
});

// Check if the button updates correctly when props change
test('updates the text when prop changes', () => {
  const { rerender } = render(<AccountButton text="Initial Text" />);
  let buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveTextContent('Initial Text');
  
  rerender(<AccountButton text="Updated Text" />);
  buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveTextContent('Updated Text');
});



