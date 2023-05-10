import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/contactSlice";
import { nanoid } from "nanoid";

const store = configureStore({
    reducer: {
        contact: contactSlice,
    },
    preloadedState: {
        contact: {
            items: [
                {
                    id: nanoid(),
                    firstName: "Sachin",
                    lastName: "Dabgar",
                    status: "active",
                },
                {
                    id: nanoid(),
                    firstName: "Vishwanath",
                    lastName: "S",
                    status: "inactive",
                },
                {
                    id: nanoid(),
                    firstName: "Channa",
                    lastName: "Reddy",
                    status: "inactive",
                },
                {
                    id: nanoid(),
                    firstName: "Amit",
                    lastName: "Dabgar",
                    status: "active",
                },
            ],
        },
    },
});

export default store;
