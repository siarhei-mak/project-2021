import React from 'react';
import './LoginBar.css';
import { NavLink } from 'react-router-dom';
import {  Button } from 'antd'


let LoginBar =(props)=>{
 // console.log('LoginBar---', props)

  const stlCls=['LoginBar']
  if(props.isOpen){
    stlCls.push('open')
  }
  
  return(
    (props.loginStatus)
    ?
    <div className={'LoginBar'} >
          <NavLink to="/personalCabinet"  activeClassName="ActivePageLink">
            <Button type="primary" className='Button' onClick={()=>props.onToggle()} >Кабинет </Button>

          </NavLink>
      <Button type="primary" className='Button_out' onClick={props.onToggleLoginStatus} >Выход </Button>

    </div>
    : <div className={stlCls.join(' ')}>
       <Button type="primary" className='Button' onClick={()=>props.onToggle()} >Вход </Button>

  </div>
  )
}

export default LoginBar