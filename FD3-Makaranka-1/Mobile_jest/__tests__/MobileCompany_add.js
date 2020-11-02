"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

//проверка Add
//нужно обязательно включить тестовый режим, передав в компонент пропс testMode={true}
test('MobileCompany - Add', () => {
  const testMode = true;
  const clientsArr=[
    {id:101, fam:"test1Иванов", im:"Иван", otch:"Иванович", balance:200}, 
    {id:105, fam:"test2Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
    {id:110, fam:"test3Петров", im:"Пётр", otch:"Петрович", balance:180},
    {id:120, fam:"test4Григорьев", im:"Григорий", otch:"Григорьевич", balance:0},
  ];

  const component = renderer.create(
    <MobileCompany testMode={testMode} clients={clientsArr}/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 

  const buttonAdd = component.root.find( el => el.props.value == "Добавить клиента" ); // ищем кнопку "Добавить клиента"
  buttonAdd.props.onClick(); //имитируем клик

  // !!! заполнение полей рефами: фамилия, имя, отчество, баланс - имитируется на стороне компонента

  const saveButton = component.root.find( el => el.type==="input" && el.props.name==='save-button'); //находим кнопку Сохранить
  saveButton.props.onClick(); //имитируем клик по кнопке Сохранить

  const tableRows = component.root.findAll( el => el.props.className === "MobileClient" ); // все элементы tr с классом MobileClient (должно быть 5 штук)

  const tableRowsLenght = tableRows.length; //количество клиентов после добавления (5)

  expect(tableRowsLenght).toBe(5); //ожидаю, что количество клиентов после добавления == 5

  expect( tableRows[tableRows.length-1].children[0].children[0] ).toBe('addedClient');    //ожидаю, что фамилия последнего в списке клиентов 'addedClient'
  expect( tableRows[tableRows.length-1].children[1].children[0] ).toBe('addedIm');     //ожидаю, что имя последнего в списке клиентов 'addedIm'
  expect( tableRows[tableRows.length-1].children[2].children[0] ).toBe('addedOtch');   //ожидаю, что отчество последнего в списке клиентов 'addedOtch'
  expect( tableRows[tableRows.length-1].children[3].children[0] ).toBe('111');        //ожидаю, что баланс последнего в списке клиентов '111'

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
});