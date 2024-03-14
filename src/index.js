'use strict';

class Person {
  regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/gi;

  constructor(fName, lName, dName, email) {
    this.fName = fName;
    if (!fName) throw new Error("Don't entered fName");
    this.lName = lName;
    if (!lName) throw new Error("Don't entered lName");
    this.dName = dName;
    if (!dName) throw new Error("Don't entered dName");
    this.email = email;
    if (!this.regExpEmail.test(this.email))
      throw new Error('Email entered incorrectly');
  }
}

const btnOk = document.getElementById('ok');

function changeInput(e) {
  const userInfo = document.querySelectorAll('#fname, #lname, #dname, #email');
  try {
    const arrayUserInfo = Array.from(userInfo).map((el) => el.value);
    const [fName, lName, dName, email] = arrayUserInfo;
    const user = new Person(fName, lName, dName, email);
    localStorage.setItem(`${lName}`, JSON.stringify(user));
  } catch (error) {
    e.preventDefault();
    console.log(error.message);
    if (error.message === "Don't entered fName") {
      fname.style.outline = 'solid 5px red';
    } else {
      fname.style.outline = '';
    }
    if (error.message === "Don't entered lName") {
      lname.style.outline = 'solid 5px red';
    } else {
      lname.style.outline = '';
    }
    if (error.message === "Don't entered dName") {
      dname.style.outline = 'solid 5px red';
    } else {
      dname.style.outline = '';
    }
    if (error.message === 'Email entered incorrectly') {
      email.style.outline = 'solid 5px red';
      const errorText = document.createElement('span');
      errorText.setAttribute('id', 'errorSpan')
      errorText.textContent = 'Entered wrong email';
      emailDiv.appendChild(errorText);
    }
  }
}

btnOk.addEventListener('click', changeInput, {
  capture: true,
});
