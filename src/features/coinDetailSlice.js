import { createSlice } from '@reduxjs/toolkit'


const coinDetailSlice = createSlice({
    name: 'coinDetail',
    initialState: {
        top10ByCoinsByVolume: [],
        chartOptions:{},
        coinStats: '',
        socialStatus: {}
    },
    reducers: {
  

      setTop10byVolume: (state,action) =>{
          state.top10ByCoinsByVolume =  action.payload
       },
       setLabels: (state,action) => {
        state.chartOptions['labels'] = action.payload
       },
       setVolumes: (state, action) => {
           state.chartOptions['volumes'] = action.payload
           console.log(action.payload)
       },
       setCoinStats :(state,action) => {
           state.coinStats =  action.payload
       },
       setSocialStatus: (state,action) => {
           state.socialStatus = action.payload
       }
  
  
    },
  })
  
  export const { setTop10byVolume , setVolumes, setLabels, setCoinStats, setSocialStatus} = coinDetailSlice.actions
  export default coinDetailSlice.reducer