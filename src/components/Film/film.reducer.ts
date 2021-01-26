import {createSlice} from '@reduxjs/toolkit';
import {FilmProps, FilmsProps} from './index'

const initialFilmState: FilmProps = {  title: '' };

const initialFilmsState: FilmsProps = [];

export const filmsSlice = createSlice({
    name: 'films',
    // initialState: initialFilmsState,
    initialState: {},
    reducers: {
        addToList: (state: any, action) => {
            // return action.payload;
            console.log("Film addToList at index ::: ", action.payload.indexId, ":", action.payload.title);
            // let newTodo = state;
            // newTodo.splice(action.payload.indexId, 0);
            // return newTodo;
            // state.splice(action.payload.indexId, 0, action.payload.data);
            // state.splice(action.payload.indexId, 0, action.payload.title);
            // state[action.payload.indexId] = action.payload.title;
            let titleObj: any = {};
            titleObj[action.payload.indexId] = action.payload.title;
            return { ...state, ...titleObj };
        },
        removeFromList: (state: any, action) => {
            // return action.payload;
            console.log("Film removeFromList at index ::: ", action.payload.indexId, ":", action.payload.data.title || "none");
            // console.log("Film removeFromList indexOf ::: ", state.indexOf(action.payload.data));
            // let newTodo = state;
            // newTodo.splice(action.payload.indexId, 1);
            // return newTodo;
            // state.splice(action.payload.indexId, 1);
            let titleObj: any = {};
            titleObj[action.payload.indexId] = undefined;
            return { ...state, ...titleObj };
            // state[action.payload.indexId] = undefined;
            // return state;
        },
        resetList: (state: any, action) => {
            return initialFilmsState;
        }
    },
});

// export async function fetchTodos(dispatch: any, getState: any) {
//     const response = await fetch('/fakeApi/todos');
//     dispatch({ type: 'todos/todosLoaded', payload: response.todos });
// }

export const { addToList, resetList, removeFromList } = filmsSlice.actions;
export default filmsSlice.reducer;
