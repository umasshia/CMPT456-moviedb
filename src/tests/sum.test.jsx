import React from 'react';
import { fireEvent,render,screen } from '@testing-library/react';
import Search from '../components/Search';
import '@testing-library/jest-dom/extend-expect'
import List from '../components/List'
import { BrowserRouter } from 'react-router-dom';

it("renders correctly", () => {
    render(<List />)

    expect(screen.getByTestId("list")).toBeTruthy()
})

describe("input value", () => {
    it('updates on change', () => {
        const handleInput = jest.fn((value) => {})      
        render(<BrowserRouter><Search handleInput={handleInput}/></BrowserRouter>)

        const searchInput = screen.queryByPlaceholderText('Search...')
        
        fireEvent.change(searchInput, { target: { value: 'test' } })

        expect(searchInput.value).toBe('test')
    })
})

