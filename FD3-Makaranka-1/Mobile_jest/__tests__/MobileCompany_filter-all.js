"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

//проверка фильтра "Все"
test('MobileCompany - Filter - All', () => {
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

  const buttonElemFilterActive = component.root.find( elem => elem.props.value == "Все" ); //ищем кнопку "Все"
  buttonElemFilterActive.props.onClick();// нажимаем
  
  const clients = component.root.findAll(el => el.props.className === "MobileClient"); // ищем все элементы tr с классом MobileClient
  expect(clients.length).toBe(clientsArr.length); //ожидаю, что длина пропс-массива будет равна количеству отрендеренных элементов, т.к. отображаются все элементы
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot(); 
});