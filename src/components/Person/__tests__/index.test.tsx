import { render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import Person from '../index';
import { Provider } from 'react-redux';
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store";

let container: any;
let store: any;
const mockPerson1= {
    name: "test1",
    birth_year: "19BBY",
    gender: "male",
    films: [ "film1", "film2" ]
};

// @ts-ignore
global.fetch = () => {
    return Promise.resolve({
        json: () => Promise.resolve(mockPerson1),
    })
};
const mockStore: any = configureStore([]);

describe("Person", () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        store = mockStore({
            person: { films: [] }
        });
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("should render empty Person details", async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Person />
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const detailHeader = screen.getByText(/Details section/i);
            const name = screen.getByText(/Name/i);
            const birthYear = screen.getByText(/Birth year:/i);
            expect(detailHeader).toBeInTheDocument();
            expect(name).toBeInTheDocument();
            expect(birthYear).toBeInTheDocument();
        });
    });
    it("should show a loaded Person's details", async () => {
        store = mockStore({
            person: mockPerson1
        });
        act(() => {
            render(
                <Provider store={store}>
                    <Person />
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const name1 = screen.getByText(/Name: test1/i);
            const birthYear = screen.getByText(/Birth year: 19BBY/i);
            const film1 = screen.getByText(/film1/i);
            const film2 = screen.getByText(/film2/i);
            expect(name1).toBeInTheDocument();
            expect(birthYear).toBeInTheDocument();
            expect(film1).toBeInTheDocument();
            expect(film2).toBeInTheDocument();
        });
    });
});
