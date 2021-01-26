import {configureStore} from '@reduxjs/toolkit';
import filmsReducer from './components/Film/film.reducer';
import peopleReducer from './components/People/people.reducer';
import personReducer from './components/Person/person.reducer';
import thunk from 'redux-thunk'

export default configureStore({
    reducer: {
        people: peopleReducer,
        person: personReducer,
        films: filmsReducer,
    },
    middleware: [thunk]
});
