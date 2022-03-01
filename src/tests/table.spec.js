
import store from "../app/store";
import Table from "../components/Table";
import React from "react";
import { shallow , mount} from "enzyme";
import tableReducer, {setCoins, setPage} from '../features/tableSlice'
import * as redux from 'react-redux'




const getState = () => {
    return store.getState().table
}

const setUp = (props = {}) => {
    const component = shallow(<Table  {...props}/>)
    return component
}


describe("Table Component", () => {
    let spyOnUseSelector;
    let spyOnUseDispatch;
    let mockDispatch;


    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(getState());
    
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });
 



    it('Should initially contain empty coins', () => {
        const state = getState()
        expect(state.coins.length).toEqual(0)
      })

      it('Should initially have current page set to 1', () => {
        const state = getState()
        expect(state.currentPage).toEqual(1)
      })
      
      it('Should have start value from 0', () => {
        const state = getState()
        expect(state.start).toEqual(0)
      }) 

      it('Should have initial loading state to true', () => {
        const state = getState()
        expect(state.isLoading).toBeTruthy()
      }) 

      it('Should return a new state for coins object', async() => {
            const previouState = getState()
            const coins = [{
                "id": "90",
                "name": "Bitcoin",
                "nameid": "bitcoin",
                "rank": 1,
                "price_usd": "41486.28",
                "percent_change_24h": "9.97",
                "percent_change_1h": "0.68",
                "percent_change_7d": "6.05",
                "market_cap_usd": "785985596584.65",
            }]
            const newState =  tableReducer(previouState, {
                type:'table/setCoins',
                payload: coins
            })
            expect(newState.coins).toBe(coins)
            expect(newState.coins.length).toBe(1)

      })

      it('Should change start value on currentpage change', () => {
        const previouState = getState()
        const newState =  tableReducer(previouState, {
            type:'table/setPage',
            payload:2
        })
        expect(newState.start).toEqual(10)
      })

   
    it('Should change start and current page on dispatching getNextPage', () => {
        const previouState = getState()
        const newState =  tableReducer(previouState, {
            type:'table/getNextPage',
        })
       expect(newState.currentPage).toEqual(previouState.currentPage+1)
       expect(newState.start).toEqual(previouState.start + 10)
    })

    it('Should not change the currentPage when previous page is clicked initially', () => {
        const previouState = getState()
        const newState =  tableReducer(previouState, {
            type:'table/getPreviousPage',
        })
       expect(newState.currentPage).toEqual(previouState.currentPage)

    })

    it('Should  change the currentPage when previous page is clicked and current page is greateer than 1', () => {
        const previouState = getState()
        const updatedState = tableReducer(previouState, {
            type:'table/getNextPage',
        })
        const newState =  tableReducer(updatedState, {
            type:'table/getNextPage',
        })
        const newState2 =  tableReducer(newState, {
            type:'table/getPreviousPage',
        })

        expect(newState2.currentPage).toEqual(newState2.currentPage )
    })




    it('Should  sort coin prices', async() => {
        const previouState = getState()
        const coins = [{"price_usd": "6.28"},{"price_usd": "200.28"}]
        const newState =  tableReducer(previouState, {
            type:'table/setCoins',
            payload: coins
        })
        const newState2 =  tableReducer(newState, {
            type:'table/sortPrice',
            payload: coins
        })

        let mycoins = [...newState.coins]
        let sortedPrices = mycoins.sort((a,b) => parseFloat(parseFloat(b['price_usd'] - a['price_usd']) ))
          
        expect(newState2.coins).toStrictEqual(sortedPrices)

  })

   

})


