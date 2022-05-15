import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
    name: "library",
    initialState: [],
    reducers: {
        addToLibrary: (state, action) => {
            let present = state
                .map((elm) => elm.id)
                .includes(action.payload.id);
            if (present) {
                return state;
            } else {
                return [...state, { ...action.payload }]
            }
        },
        removeFromLibrary: (state, action) => {
            let present = state
                .map((elm) => elm.id)
                .includes(action.payload.id);
            if (present) {
                return state.filter(item => item.id !== action.payload.id);
            } else {
                return state;
            }
        },
        editRate: (state, action) => {
            let present = state
                .map((elm) => elm.id)
                .includes(action.payload.id);
            if (present) {
                return state.map(item =>
                    item.id == action.payload.id
                        ? { ...item, rate: action.payload.rate }
                        : item);
            } else {
                return state;
            }
        }
    },
});

export const { addToLibrary, removeFromLibrary, editRate } = librarySlice.actions;
export const librarySelector = (state) => state.library;

export const filteredLibrarySelector = (state) => {
    if (state.filter !== 'Tous') {
        return state.library.filter((elm) => elm.rate && elm.rate == state.filter);
    } else {
        return state.library;
    }
};

export default librarySlice.reducer;
