import { configureStore } from "@reduxjs/toolkit";
import auth from "../reducer/auth";

// Store
const store = configureStore({
  reducer: { auth },
});

// Export
export default store;
