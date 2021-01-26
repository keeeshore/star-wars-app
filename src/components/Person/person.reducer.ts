import {createSlice} from '@reduxjs/toolkit';
import { PersonProps } from './index'

const intialPersonState: PersonProps = {
    name: '',
    height: '',
    mass: '',
    url: '',
    gender: '',
    birth_year: '',
    films: []
};

export const personSlice = createSlice({
    name: 'person',
    initialState: intialPersonState,
    reducers: {
        update: (state: any, action) => {
            return action.payload;
        },
        clear: (state) => {
            return intialPersonState;
        }
    },
});

export const { update, clear } = personSlice.actions;
export default personSlice.reducer;
