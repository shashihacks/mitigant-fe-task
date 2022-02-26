import { createSlice } from '@reduxjs/toolkit'



// const [start, setStart] = useState(0)
// const [page, setPage] = useState(5)
// const [currentPage, setcurrentPage] = useState(1)
// const {data, isFetching} =  useGetCryptoQuery(start)
// const [coins, setCoins] = useState([])

const tableSlicer = createSlice({
  name: 'table',
  initialState: {
    start:0,
    value:0,
    page:5,
    currentPage:1,
    coins:[],
    isLoading: true,
    lastUpdated: 'Just now',
    sortDirection: true // ascending
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
    },
    sortPrice:(state, action) => {
      console.log("sort")
        let sortableItems = [...state.coins];
        state.sortDirection = !state.sortDirection   
          sortableItems.sort((a, b) => {
            if(state.sortDirection)   
              return parseFloat(a['price_usd']) - parseFloat(b['price_usd']) 
            else if(!state.sortDirection)          
              return  parseFloat(b['price_usd']) - parseFloat(a['price_usd'])
            });
        state.coins = sortableItems
   
    },
    getPreviousPage: (state,action) => {
      if( state.start <=0) {
        state.start =0 
        state.currentPage = 1
      }
      else {
        state.start = state.start - 10
        state.currentPage = state.currentPage -1
        if(state.page > 5)  
          state.page = state.page - 1
      }
     
     
    },

    getNextPage: (state,action) => {
      state.start =  state.start +10
      state.currentPage = state.currentPage +1 
      state.page = state.page +1
    }

  },
})

export const {  nextPage, previousPage, setPage ,setCoins, setLoading, setLastUpdated, sortPrice, getPreviousPage, getNextPage} = tableSlicer.actions
export default tableSlicer.reducer