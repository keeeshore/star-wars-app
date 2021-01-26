import { render, screen } from '@testing-library/react';
import App from '../App';
import store from "../store";
import { Provider } from 'react-redux';

jest.mock('../components/People', function () {
    const People = () => {
        return <>MockPeopleComponent</>;
    };
    return People;
});

jest.mock('../components/Person', function () {
    const Person = () => {
        return <>MockPersonComponent</>;
    };
    return Person;
});


test('App renders header', () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  const header = screen.getByText(/Table with list of people/i);
  expect(header).toBeInTheDocument();
});
