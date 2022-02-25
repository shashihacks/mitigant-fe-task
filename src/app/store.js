import { configureStore } from "@reduxjs/toolkit";
// import { cryptoAPi } from "../services/cryptoApi";
import counterReducer from '../features/tableSlice'
export default configureStore({
    reducer: {
       counter: counterReducer,
      
    }
})