import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import Header from '../src/components/Header'





describe('Test HEADER', () => { 

  it('with shallow HEADER', () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();


  })


})
