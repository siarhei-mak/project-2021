import React from 'react';
import './Footer.css';
import {  Icon} from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

class Footer extends React.Component{

  render(){
    return (
      <div className='Footer icons-list'>

<span>

&#169;2020
</span>

      <div className='icon'>
        <a href='https://www.facebook.com/'>     <IconFont type="icon-facebook" />    </a>
        <a href='https://twitter.com/?lang=ru'>     <IconFont type="icon-twitter" />   </a>
        <a href='https://www.google.ru/'>       <Icon type="google" />  </a>
        <a href='https://www.instagram.com/?hl=ru'>   <Icon type="instagram" />   </a>


      </div>



      </div>
    )
  }

}

export default Footer
