import {validate} from './validateNewUserTEST'

test('проверка user при регистриции/попытке входа ', () => {
 
  let loginOldUser=123
  let passwordOldUser=123

  let newUserLogin=567;
  let newUserPassword=567;

 let messageForSimilarUser=['Такой пользователь уже существует']
  expect(validate(newUserLogin,newUserPassword).length).toBeFalsy()
  
  expect(validate(loginOldUser,passwordOldUser)).toEqual(messageForSimilarUser)


});