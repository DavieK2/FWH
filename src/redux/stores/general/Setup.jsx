import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { list: null, user: null, total: null, error: "", loading: false };




export const setPageTitle = createAsyncThunk(
    "generalSetup/setPageTitle",
    async (title) => {
        document.title = `${title} | Farmer App`;
    }
);


const generalSetupStore = createSlice({
    name: "generalSetup",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    },
});

export default generalSetupStore.reducer;
export const { clearAuth } = generalSetupStore.actions;