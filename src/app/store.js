import { configureStore } from "@reduxjs/toolkit";
import { cryptoAPi } from "../services/cryptoApi";
export default configureStore({
    reducer: {
        [cryptoAPi.reducerPath]: cryptoAPi.reducer
    }
})