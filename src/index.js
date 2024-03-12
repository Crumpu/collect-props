'use strict';

class Person {
  constructor(fName, lName, dName, email) {
    this.fName = fName;
    this.lName = lName;
    this.dName = dName;
    this.email = email;
  }
}

const btnOk = document.getElementById('ok');

function changeInput(e) {
  // e.preventDefault();
  const userInfo = document.querySelectorAll(
    '#f-name, #l-name, #d-name, #email'
  );
  const arrayUserInfo = Array.from(userInfo).map((el) => el.value);
  const [fName, lName, dName, email] = arrayUserInfo;
  const user = new Person(fName, lName, dName, email);
  localStorage.setItem(`${lName}`, JSON.stringify(user));
}

btnOk.addEventListener('click', changeInput);
