import React, { createContext, useContext } from "react";
import { render, waitFor, act } from '@testing-library/react';
import Ability from "./Ability.jsx";

export const UserContext = createContext({
  userUpdate: jest.fn(),
  user: {} // Provide an appropriate user object here
});

export const ChampionNamesContext = createContext({
  championNamesUpdate: jest.fn(),
  championNames: [] // Provide an appropriate array of champion names here
});

export const useUser = () => useContext(UserContext);
export const useChampionNames = () => useContext(ChampionNamesContext);

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

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockedQuestion,
    });

    const { getByText, getByAltText } = render(<Ability />);

    expect(getByText('Which Champion has this Ability?')).toBeInTheDocument();

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
