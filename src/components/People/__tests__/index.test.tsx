import { render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import People from '../index';
import { Provider } from 'react-redux';
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store";
import assert from "assert";

let container: any;
let store: any;
const mockPerson1= {
    name: "test1",
    height: "182",
    mass: "100",
};
const mockPerson2 = {
    name: "test2",
    height: "192",
    mass: "200",
};
const peopleList = {
    count: 0,
    results: [
        mockPerson1,
        mockPerson2,
    ]
};

// @ts-ignore
global.fetch = () => {
    return Promise.resolve({
        json: () => Promise.resolve(peopleList),
    })
};
const mockStore: any = configureStore([]);

describe("People", () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        store = mockStore({
            people: {  results: [] }
        });
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("should render people list header", async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <People />
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const name = screen.getByText(/Name/i);
            const height = screen.getByText(/Height/i);
            const mass = screen.getByText(/Mass/i);
            expect(name).toBeInTheDocument();
            expect(height).toBeInTheDocument();
            expect(mass).toBeInTheDocument();
        });
    });
    it("should render People in list", async () => {
        store = mockStore({
            people: peopleList
        });
        act(() => {
            render(
                <Provider store={store}>
                    <People />
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const name1 = screen.getByText(/test1/i);
            const height1 = screen.getByText(/182/i);
            const mass1 = screen.getByText(/100/i);
            expect(name1).toBeInTheDocument();
            expect(height1).toBeInTheDocument();
            expect(mass1).toBeInTheDocument();
        });
    });
});
