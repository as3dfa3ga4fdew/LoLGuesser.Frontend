import React from "react";
import { render, waitFor, act } from '@testing-library/react';
import Ability from "./Ability.jsx";

describe('Ability Component', () => {
    it('renders without errors', () => {
      render(<Ability />);
    });
  
    it('loads data and updates state correctly', async () => {
      const mockedQuestion = {
        id: 1,
        type: 'example',
        value: 'example.jpg',
      };
  
      // Mock the fetch function to return the expected result
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockedQuestion,
      });
  
      const { getByText, getByAltText } = render(<Ability />);
      
      // Ensure the loading message or initial state is present
      expect(getByText('Which Champion has this Ability?')).toBeInTheDocument();
  
      // Wait for the async operation to complete
      await act(async () => {
        await waitFor(() => {
          expect(getByAltText('testbild')).toBeInTheDocument();
          expect(global.fetch).toHaveBeenCalledWith('https://localhost:5000/api/Game/question', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 1 }),
          });
        });
      });
    });
  });