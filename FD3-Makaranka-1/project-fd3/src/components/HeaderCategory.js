import React from 'react';
import './HeaderCategory.css';
import { NavLink } from 'react-router-dom';

let HeaderCategory =(props)=>{
 // console.log(props)

    return (
      <div className='HeaderCategory_conteiner'>
       {props.categories.map( item=> {
          return(
            <NavLink key={item.id}  to={'/category/'+item.category+'/'+item.id} 
               activeClassName="ActivePageLink">
              <div className='HeaderCategory_Line'  > {item.name}
                  <img src={ require ('../img/png/' + item.id+'.png')}   alt='png'/> 
              </div>
            </NavLink>
    )
  })}
      </div>
    )
}

export default HeaderCategory
