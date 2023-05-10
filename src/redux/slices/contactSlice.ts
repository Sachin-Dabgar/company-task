import { createSlice } from "@reduxjs/toolkit";

// creating state for single contact
export interface ContactInfo {
    id: string;
    firstName: string;
    lastName: string;
    status: string;
}

// creating state for all the contancts to get stored
interface AllContactsState {
    items: ContactInfo[];
}

// initializing the initial state for the application
const initialState: AllContactsState = {
    items: [],
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        // action for adding the contact
        addContact: (state, action) => {
            state.items.push(action.payload);
        },
        // action for delete the contact
        deleteContact: (state, action) => {
            state.items = state.items.filter(
                (singleItem) => singleItem.id !== action.payload
            );
        },
        // action for updating the contact
        updateContact: (state, action) => {
            const existingItemsIndex = state.items.findIndex(
                (singleItem) => singleItem.id === action.payload.id
            );
            console.log("index is", existingItemsIndex);
            if (existingItemsIndex !== -1) {
                state.items[existingItemsIndex] = action.payload;
            }
        },
    },
});

export const { addContact, deleteContact, updateContact } =
    contactSlice.actions;

export default contactSlice.reducer;
