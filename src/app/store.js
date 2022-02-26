import { configureStore } from "@reduxjs/toolkit";
import coinDetailReducer from "../features/coinDetailSlice";
import counterReducer from '../features/tableSlice'

export default configureStore({
    reducer: {
       counter: counterReducer,
       coinDetail: coinDetailReducer
      
    }
})