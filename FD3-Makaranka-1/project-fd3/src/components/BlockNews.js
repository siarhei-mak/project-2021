import React from 'react';
import { NavLink } from 'react-router-dom';
import  './BlockNews.css'



let BlockNews =(props)=>{

  
  const imageUrl = require(`../img/product/id${props.id}.jpeg`);

  return(

      <NavLink to={"/category/"+props.category+'/'+props.id} className="PageLink" activeClassName="ActivePageLink">
        <div className='BlockNews'>
        <div style= {{ backgroundImage: `url(${imageUrl})` }} 
           onClick={()=>props.onClick(props.category)}  > 
           <span>
           {props.text} <br/>
           </span>
        

          </div>
        </div>

       

      </NavLink>

  )
}

export default  BlockNews

