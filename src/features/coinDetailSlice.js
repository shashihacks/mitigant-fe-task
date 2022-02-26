import { createSlice } from '@reduxjs/toolkit'


const coinDetailSlice = createSlice({
    name: 'coinDetail',
    initialState: {
        top10ByCoinsByVolume: [],
        chartOptions:{},
        coinStats: ''
    },
    reducers: {
  

      setTop10byVolume: (state,action) =>{
          console.log(action.payload)
          state.top10ByCoinsByVolume =  action.payload
       },
       setLabels: (state,action) => {
        state.chartOptions['labels'] = action.payload
       },
       setVolumes: (state, action) => {
           state.chartOptions['volumes'] = action.payload
       },
       setCoinStats :(state,action) => {
           state.coinStats =  action.payload
       }
  
    },
  })
  
  export const { setTop10byVolume , setVolumes, setLabels, setCoinStats} = coinDetailSlice.actions
  export default coinDetailSlice.reducer