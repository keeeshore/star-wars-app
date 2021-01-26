import {createSlice} from '@reduxjs/toolkit';
import { PeopleProps } from "./index";

const initialPeopleState: PeopleProps = { count: 0, results: [] };

export const peopleSlice = createSlice({
    name: 'people',
    initialState: initialPeopleState,
    reducers: {
        list: (state: any, action) => {
            console.log('people list action : ', action);
            return action.payload;
        }
    },
});

export const { list } = peopleSlice.actions;
export default peopleSlice.reducer;
