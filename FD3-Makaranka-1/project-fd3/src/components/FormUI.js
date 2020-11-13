import React from 'react'
import { Button } from 'antd';

let FormUI =(props)=>{
  return(
  <React.Fragment>
          <label htmlFor="login">LOGIN  </label> <br/>
          <input type="text" name="login" id="login" 
             value={props.login} style={{borderRadius:'5px'}}
             onChange={(EO)=>{props.onChangeLoginInfo(EO.target.value, 'login')}} />
          
          <label htmlFor="password">PASSWORD  </label> <br/>
          <input type="text" name="password" id="password"  style={{borderRadius:'5px'}} value={props.password}
             onChange={(EO)=>{props.onChangeLoginInfo(EO.target.value, 'password')}}
           /> <br/> <br/> <hr/> 


        {
          (props.newUser)
          ?  
          <React.Fragment>
          <Button type="primary" onClick={()=>props.checkLoginPassword() } >Войти</Button>
          <Button type="primary"  onClick={props.checkLoginPassword } style={{marginLeft:'3px'}} > Регистрация </Button>

         
          </React.Fragment>
          :     
            <React.Fragment>
              <Button type="primary" onClick={()=>props.checkLoginPassword() } >Войти</Button>
              <Button type="primary"  onClick={props.toggleRegistrUser} style={{marginTop:'3px'}}> Новый пользователь </Button>
            </React.Fragment>

        }
        <h3 className='alarm'>{props.errorText} </h3>
    </React.Fragment>

  )
}

export default FormUI


