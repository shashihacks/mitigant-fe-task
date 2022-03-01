import React from 'react'
import {shallow} from 'enzyme'
import Navbar from '../components/Navbar' 
import  '../setupTests';
import { findByTestAttr } from '../utils';

const setUp = (props = {}) => {
    const component = shallow(<Navbar  {...props}/>)
    return component
}



describe('Navbar component', () => {
    let component;
    beforeEach(() => {
        component =setUp()
    })

    it('Should render without errors', async() => {
        const wrapper = await findByTestAttr(component, 'navbar')
        expect(wrapper.length).toBe(1)
    })

    it('Should render company title', async() => {
        const brandName = await findByTestAttr(component, 'navbar-brand')
        expect(brandName.length).toBe(1)
    })

    it('Should render nav item', async()=> {
        const homeNavItem = await findByTestAttr(component, 'nav-item-home')
        expect(homeNavItem.length).toBe(1)
        expect(homeNavItem.text()).toEqual("Home");
       
    })
})