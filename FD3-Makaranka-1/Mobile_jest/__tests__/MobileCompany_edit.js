"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

//проверка Edit
//нужно обязательно включить тестовый режим, передав в компонент пропс testMode={true}
test('MobileCompany - Edit', () => {
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

  const buttonEdit = component.root.findAll( el => el.props.name === 'edit-button' ); // ищем первую кнопку "Редактировать"
  buttonEdit[0].props.onClick(); //имитируем клик

  // !!! заполнение полей рефами: фамилия, имя, отчество, баланс - имитируется на стороне компонента

  const saveButton = component.root.find( el => el.props.value === 'Сохранить'); //находим кнопку Сохранить
  saveButton.props.onClick(); //имитируем клик по кнопке и сохраняем измененные поля

  const tableRows = component.root.findAll( el => el.props.className === "MobileClient" ); // все элементы tr с классом MobileClient (должно быть 5 штук)

  expect( tableRows[0].children[0].children[0] ).toBe('editedFam');   //ожидаю, что фамилия первого в списке клиентов теперь не 'Иванов', а 'editedFam'
  expect( tableRows[0].children[1].children[0] ).toBe('editedIm');    //ожидаю, что имя первого в списке клиентов теперь не 'Иван', а 'editedIm'
  expect( tableRows[0].children[2].children[0] ).toBe('editedOtch');  //ожидаю, что отчество первого в списке клиентов теперь не 'Иванович', а 'editedOtch'
  expect( tableRows[0].children[3].children[0] ).toBe('111');       //ожидаю, что баланс первого в списке клиентов теперь не '200', а '111'

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 
});