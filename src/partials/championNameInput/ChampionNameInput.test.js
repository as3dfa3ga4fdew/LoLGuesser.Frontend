import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ChampionNameInput from './ChampionNameInput';
import { ChampionNamesContext } from "../../contexts/ChampionNamesContext";
import { UserContext } from "../../contexts/UserContext";

describe('ChampionNameInput', () => {
  it('renders without crashing', () => {
    render(
      <ChampionNamesContext.Provider value={{ championNames: [], championNamesUpdate: jest.fn() }}>
        <UserContext.Provider value={{ user: {}, userUpdate: jest.fn() }}>
          <ChampionNameInput id={1} type="example" setNext={jest.fn()} next={false} />
        </UserContext.Provider>
      </ChampionNamesContext.Provider>
    );
  });
});
