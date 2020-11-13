import React from 'react'
import  './ListProduct.css'
import { NavLink } from 'react-router-dom';
import { Card } from 'antd';

const gridStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'rgba(0, 58, 140, 0.23)',
  
};

let ListProduct=(props)=>{
  return(
    <React.Fragment>
    <NavLink to={"/product/"+props.checkCategoryName+'/'+props.item.id} 
      onClick={()=>props.onActiveProductId(props.item.id)}  >
        <Card.Grid style={gridStyle}>{props.item.name}</Card.Grid>
        </NavLink>
    </React.Fragment>
  )
}

export default  ListProduct
