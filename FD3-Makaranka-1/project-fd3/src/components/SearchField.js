import React from 'react';
import './SearchField.css';
import { Checkbox, Slider,Button } from 'antd';


const marks = {
  0: '0$',
  250:'250$',
  500: {
    style: {
      color: '#f50',
    },
    label: <span>'500$'</span>,

  },
};

const CheckboxGroup = Checkbox.Group;

class SearchField extends React.Component{

// componentDidUpdate()

render(){
  return(
    <div className='SearchField'>

      <div className='range_summ'>
          <span> Диапазон суммы</span> <br/>
          <Slider range marks={marks} max={500} defaultValue={[50, 150]} onAfterChange={this.props.onAfterChange} />
          <CheckboxGroup options={this.props.arrRange}  onChange={this.props.onChangeCheckBox} />

      </div>
<br/>
      <Button type="primary" onClick={this.props.toSortListCategory}>Показать</Button>


    </div>
  )
}


}

export default SearchField
