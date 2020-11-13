import React from 'react';
import './Header.css';

import { NavLink } from 'react-router-dom';
import HeaderCategory from './HeaderCategory'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



let totalCategories=[
  {name:'Светлое пиво', id: 1, category:'lightBeer'},
  {name:'Темное пиво', id: 2, category:'darkBeer' },
  {name:'Крафтовое пиво', id: 3, category:'kraftBeer', },
  {name:'Пиво по фильмам', id: 4, category:'filmBeer',},
  {name:'Пивной сет', id: 5, category:'setBeer',},
  {name:'Закуска', id: 6, category:'snack'},

]

class Header extends React.Component{


  render(){
    return (
      <div className='Header'>

          <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">
             <div className='banner_title_shop'>
              BEER-bar
             </div>
          </NavLink>


          <div className='HeaderCategory'>
          <HeaderCategory  categories={totalCategories} />

            </div>

      </div>
    )
  }

}

export default Header
