"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

//проверка Delete
//нужно обязательно включить тестовый режим, передав в компонент пропс testMode={true}
test('MobileCompany - Delete', () => {
  const testMode = true;
  const clientsArr=[
    {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
    {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
    {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
    {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:0},
  ];

  const component = renderer.create(
    <MobileCompany testMode={testMode} clients={clientsArr}/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 

  const tableRowsBefore = component.root.findAll( el => el.props.className === "MobileClient" ); // все элементы tr с классом MobileClient
  expect(tableRowsBefore.length).toBe(4); //ожидаю, что количество клиентов до удаления == 4
  
  const buttonEdit = component.root.findAll( el => el.props.value === "Удалить" ); // ищем первую кнопку "Редактировать"
  buttonEdit[0].props.onClick(); //имитируем клик по первому клиенту в таблице

  // !!! id удаляемого объекта имитируется на стороне компонента

  const tableRowsAfter = component.root.findAll( el => el.props.className === "MobileClient" ); // все элементы tr с классом MobileClient
  expect(tableRowsAfter.length).toBe(3); //ожидаю, что количество клиентов после удаления == 3

  expect( tableRowsAfter[0].children[0].children[0] ).not.toBe('Иванов');    //ожидаю, что фамилия первого в списке клиентов теперь не 'Иванов'
  expect( tableRowsAfter[0].children[1].children[0] ).not.toBe('Иван');      //ожидаю, что имя первого в списке клиентов теперь не 'Иван'
  expect( tableRowsAfter[0].children[2].children[0] ).not.toBe('Иванович');  //ожидаю, что отчество первого в списке клиентов теперь не 'Иванович'
  expect( tableRowsAfter[0].children[3].children[0] ).not.toBe('200');       //ожидаю, что баланс первого в списке клиентов теперь не '200'

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 
});