import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { PeopleProps } from "./index";

const initialPeopleState: PeopleProps = { status: 'ready', count: 0, results: [] };

export const getPeopleList = createAsyncThunk('people/getPeopleList', async (url?: string) => {
    const response = await fetch(url || 'https://swapi.dev/api/people/');
    const data: PeopleProps = await response.json();
    console.log('response : ', data);
    return data;
});

export const peopleSlice = createSlice({
    name: 'people',
    initialState: initialPeopleState,
    reducers: {
        list: (state: any, action) => {
            console.log('people list action : ', action);
            return action.payload;
        }
    },
    extraReducers: {
        [getPeopleList.pending.type]: (state, action) => {
            return { ...state, status: 'Loading...' };
        },
        [getPeopleList.fulfilled.type]: (state, action) => {
            console.log('getPeopleList.fulfilled: ', action);
            return { ...state, status: 'ok', ...action.payload };
        },
        [getPeopleList.rejected.type]: (state, action) => {
            console.error('getPeopleList.rejected: ', action);
            return { ...state, status: 'Error', ...action.payload };
        }
    }
});

export const { list } = peopleSlice.actions;
export default peopleSlice.reducer;
