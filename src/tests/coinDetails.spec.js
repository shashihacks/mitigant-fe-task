import React from 'react'
import { shallow } from 'enzyme'

import  '../setupTests';
import { findByTestAttr } from '../utils';
import { CoinDetail } from '../components/CoinDetail';
import coinDetailReducer from '../features/coinDetailSlice';
import store from '../app/store';
import * as redux from 'react-redux'


const setUp = (props = {}) => {
    const component = shallow(<CoinDetail />)
    return component
}
const getState = () => {
    return store.getState().coinDetail
}


describe('Coin Details component', () => {
    let component;
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

    it('Should have empty list of coins initially', async() => {
        let state = getState()
        expect(state.top10ByCoinsByVolume.length).toEqual(0)
    })



    it('Should have social status as on empty object initially', () => {
        let previousState = getState()
        expect(Object.keys(previousState.socialStatus).length).toBe(0)
    })

    it('Should have coinStats to be empty initially', () => {
        let state = getState()
        expect(state.coinStats).toBe('')
    })
    it('should have chartOptions to be empty object initially', () => {
        const state= getState()
        expect(Object.keys(state.chartOptions).length).toBe(0)
    })

    it('Should change state on disptaching setLabels', () => {
        let previousState = getState()
        const payload = ['Binance', 'Coinbase']
        const newState =  coinDetailReducer(previousState, {
            type:'coinDetail/setLabels',
            payload
        })
        expect(newState.chartOptions.labels.length).toEqual(2)
        expect(newState.chartOptions.labels).toEqual(
            expect.arrayContaining([expect.any(String)])
          );
          expect(newState.chartOptions.labels).toContain('Binance');

    })

    it('Should change state on dispatching setTop10byVolume method', async() => {
        let previousState = getState()

        const payload = [{
                name:"Binance",
                base:"BTC",
                quote:"USDT",
                price:45932.8,
                price_usd:45932.8,
                volume:64945.19302,
                volume_usd:2983114561.9491,
            
            }]
        const newState =  coinDetailReducer(previousState, {
            type:'coinDetail/setTop10byVolume',
            payload
        })
        expect(newState.top10ByCoinsByVolume.length).toEqual(1)
    })


    it('Should set social stats on dispatching setSocialStatus', () => {
        let previousState = getState()
        const payload ={"reddit":{"active_users": 250}}
        const newState =  coinDetailReducer(previousState, {
            type:'coinDetail/setSocialStatus',
            payload
        })

        expect(Object.keys(newState.socialStatus).length).toEqual(1)
    })


    it('Should set volumes  on dispatching setVolume', () => {
        let previousState = getState()
        const payload =['100','200']
        const newState =  coinDetailReducer(previousState, {
            type:'coinDetail/setVolumes',
            payload
        })

        expect(newState.chartOptions.volumes).toContain('100');
        expect(newState.chartOptions.volumes.length).toEqual(2)
        expect(newState.chartOptions.volumes).toEqual(
            expect.arrayContaining([expect.any(String)])
          );
})
    

    

})