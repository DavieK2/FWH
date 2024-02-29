import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler, successHandler } from "@/helpers/Response";
import  axios  from "@/helpers/axiosWrapper";
const initialState = { list: null, user: null, total: null, error: "", loading: false };

export const buyerSignUp = createAsyncThunk(
  "authenticate/buyerSignUp",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json;charset=UTF-8",
          "Content-Type": "multipart/form-data",
        },
        url: `/users/signup`,
        data: values,
      });
      return successHandler(data, data.message);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


const authStore = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.customer = null;
    },
  },
  extraReducers: (builder) => {

    // ====== builders for buyerSignUp ======

    builder.addCase(buyerSignUp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(buyerSignUp.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(buyerSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    
  },
});

export default authStore.reducer;
export const { clearAuth } = authStore.actions;