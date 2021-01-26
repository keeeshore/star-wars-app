import { render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import People, {default as Film} from '../index';
import { Provider } from 'react-redux';
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store";

let container: any;
let store: any;
const filmResult = {
    title: "A New Hope",
    episode_id: 4,
};

// @ts-ignore
global.fetch = () => {
    return Promise.resolve({
        json: () => Promise.resolve(filmResult),
    })
};
const mockStore: any = configureStore([]);

describe("Films", () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        store = mockStore({
            films: { }
        });
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("should render", async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Film key={0} indexId={0} url={"https://test/film/1"}/>
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const name = screen.getByText(/Loading/i);
            expect(name).toBeInTheDocument();
        });
    });
    it("should render Film in list", async () => {
        store = mockStore({
            films: { 0: filmResult }
        });
        act(() => {
            render(
                <Provider store={store}>
                    <Film key={0} indexId={0} url={"https://test/film/1"}/>
                </Provider>,
                container
            );
        });
        await waitFor(() => {
            const name = screen.getByText(/A New Hope/i);
            expect(name).toBeInTheDocument();
        });
    });
});
