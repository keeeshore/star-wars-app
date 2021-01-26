import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FilmProps, FilmsProps} from './index'

const initialFilmsState: FilmsProps = {};

export const filmsSlice = createSlice({
    name: 'films',
    initialState: initialFilmsState,
    reducers: {
        addToList: (state: any, action) => {
            console.log("Film addToList at index ::: ", action.payload.indexId);
            let titleObj: any = {};
            titleObj[action.payload.indexId] = action.payload.data;
            return { ...state, ...titleObj };
        },
        removeFromList: (state: any, action) => {
            console.log("Film removeFromList at index ::: ", action.payload.indexId);
            let titleObj: any = {};
            titleObj[action.payload.indexId] = undefined;
            return { ...state, ...titleObj };
        },
        resetList: (state: any, action) => {
            return initialFilmsState;
        }
    },
});

export const { addToList, resetList, removeFromList } = filmsSlice.actions;
export default filmsSlice.reducer;
