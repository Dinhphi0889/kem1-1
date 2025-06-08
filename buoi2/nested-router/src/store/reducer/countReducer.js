import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0,
    name: "Phi"
}

const countReducer = createSlice({
    name: "countReducer",
    initialState,
    reducers: {
        setCountReducer: (state, action) => {
            state.count = state.count + action.payload
        }
    }
})

export const { setCountReducer } = countReducer.actions
export default countReducer.reducer