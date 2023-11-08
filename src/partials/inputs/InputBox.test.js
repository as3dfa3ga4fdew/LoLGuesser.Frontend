import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from '../inputs/InputBox';

describe('InputBox Component', () => {
    // Positive Test: It should correctly render label and input elements with classNames
    test('renders InputBox with label and input', () => {
      const labelText = 'Test Label';
      render(<InputBox labelText={labelText} placeholderText="Enter text" />);
      
      // Check if the label is rendered with correct text
      const label = screen.getByText(labelText);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('input-label');
  
      // Check if the input is rendered with correct placeholder text
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('input-input');
    });
  
    // Negative Test: It should not fail when no props are provided
    test('renders without crashing when no props are provided', () => {
      render(<InputBox />);
      
      // Component should render an input even if no props are provided
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  
    // Negative Test: It should render without label text if 'labelText' prop is not provided
    test('renders without label text if labelText prop is not provided', () => {
      render(<InputBox placeholderText="Enter text" />);
  
      // There should be no label element since labelText is not provided
      const label = screen.queryByLabelText('Test Label');
      expect(label).not.toBeInTheDocument();
    });

    // Test to check if the InputBox component renders correctly with all props
    test('renders InputBox with all props', () => {
        const labelText = 'Test Label';
        const placeholderText = 'Enter text';
        render(<InputBox labelText={labelText} placeholderText={placeholderText} />);
        
        expect(screen.getByText(labelText)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    // Test to ensure the input element has a text type by default
    test('input element should be of type text by default', () => {
        render(<InputBox />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'text');
    });

    // Test: Should call onChange handler when text is changed
    test('calls onChange handler on text change', () => {
        const handleChange = jest.fn();
        render(<InputBox onChange={handleChange} />);
      
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new text' } });
      
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('new text');
      });

    // Test: Should call onChange handler when text is changed
    test('calls onChange handler on text change', () => {
        const handleChange = jest.fn();
        render(<InputBox onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new text' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('new text');
    });
    
  });