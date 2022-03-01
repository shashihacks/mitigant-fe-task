import { configureStore } from "@reduxjs/toolkit";
import coinDetailReducer from "../features/coinDetailSlice";
import tableReducer from '../features/tableSlice'

export default configureStore({
    reducer: {
       table: tableReducer,
       coinDetail: coinDetailReducer
      
    }
})

