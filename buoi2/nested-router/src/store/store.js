import { configureStore } from "@reduxjs/toolkit"
import countReducer from "./reducer/countReducer"

export const store = configureStore({
    reducer: {
        countReducer: countReducer,
    },
})