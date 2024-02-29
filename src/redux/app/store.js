import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../stores/authenticate/AuthStore";
import generalSetupReducer from "../stores/general/Setup";

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    generalSetup: generalSetupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          
        ],
      },
    }).concat(),
});

export default store;
