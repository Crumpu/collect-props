'use strict';

const regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/gi;

class Person {
  constructor(...arg) {
    arg.fName = fName;
    arg.lName = lName;
    arg.dName = dName;
    arg.email = email;
    if (!this.regExpEmail.test(this.email))
      throw new Error('Email entered incorrectly');
  }
}

const userInfo = document.querySelectorAll('input');

function collectProps(e) {
  console.log(userInfo);
  const arrayUserInfo = Array.from(userInfo).map((el) => el.value);
  console.log(arrayUserInfo);
  const user = new Person(
    arrayUserInfo.fName,
    arrayUserInfo.lName,
    arrayUserInfo.dName,
    arrayUserInfo.email
  );
  console.log(user);
}

// const btnOk = document.getElementById('ok');

// function changeInput() {
//   e.preventDefault();
//   localStorage.setItem(`${lName}`, JSON.stringify(user));
// }

userInfo.forEach((el) => { 
  el.value.addEventListener('change', collectProps)
})
 
// if (error.message === 'Email entered incorrectly') {
//   email.style.outline = 'solid 5px red';
//   const errorText = document.createElement('span');
//   errorText.setAttribute('id', 'errorSpan');
//   errorText.textContent = 'Entered wrong email';
//   emailDiv.appendChild(errorText);
// }
