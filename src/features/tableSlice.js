import { createSlice } from '@reduxjs/toolkit'



// const [start, setStart] = useState(0)
// const [page, setPage] = useState(5)
// const [currentPage, setcurrentPage] = useState(1)
// const {data, isFetching} =  useGetCryptoQuery(start)
// const [coins, setCoins] = useState([])

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    start:0,
    value:0,
    page:5,
    currentPage:1,
    coins:[],
    isLoading: true,
    lastUpdated: ''
  },
  reducers: {

    previousPage: (state,action) =>{
     console.log(state)
    },
    nextPage:(state,action) => {
      console.log("next page")
    },
    setPage: (state,action)=> {
      state.currentPage= action.payload
      if(state.currentPage === 1)
        state.start =0
      else
        state.start = ((state.currentPage -1)  *10 )
      console.log(state.start)
      
    },
    setCoins: (state,action)=> {
      state.coins = action.payload.data
    },
    setLoading: (state,action) => {
      state.isLoading = action.payload
    },
    setLastUpdated: (state,action) => {
      state.lastUpdated = action.payload
    }

  },
})

export const {  nextPage, previousPage, setPage ,setCoins, setLoading, setLastUpdated} = counterSlice.actions
export default counterSlice.reducer