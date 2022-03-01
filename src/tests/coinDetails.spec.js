import React from 'react'
import {shallow} from 'enzyme'

import  '../setupTests';
import { findByTestAttr } from '../utils';
import { CoinDetail } from '../components';
import coinDetailSlice from '../features/coinDetailSlice';

const setUp = (props = {}) => {
    const component = shallow(<CoinDetail  {...props}/>)
    return component
}



describe('Coin Details component', () => {
    let component;
    beforeEach(() => {
        component =setUp()
    })

    it()

})