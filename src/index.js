'use strict';

// --------------------------------------------------------
const regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;
const incorrectEmail = document.getElementById('incorrectEmail');
const emailAddress = document.getElementById('email');
const userInfo = document.getElementById('textContainer');
const btnOk = document.getElementById('ok');
let user;
// ---------------------------------------------------------

class Person {
  constructor(fName, lName, dName, email, pass, passConf) {
    this.fName = fName;
    this.lName = lName;
    this.dName = dName;
    this.email = email;
    this.pass = pass;
    this.passConf = passConf;
  }
}

function checkEmail() {
  const emailAddressValue = emailAddress.value;
  if (!regExpEmail.test(emailAddressValue)) {
    incorrectEmail.style.display = 'flex';
  } else {
    incorrectEmail.style.display = 'none';
  }
}

function enteredInfo(user) {
  if (user.fName && user.lName && regExpEmail.test(user.email)) {
    btnOk.classList.remove('disabled');
    btnOk.removeAttribute('disabled');
  } else {
    btnOk.classList.add('disabled');
    btnOk.setAttribute('disabled', 'disabled');
  }
}

function createUser(e) {
  e.preventDefault();
  const inputs = userInfo.querySelectorAll('input');
  const arrayUserInfo = Array.from(inputs).map((el) => el.value);
  user = new Person(...arrayUserInfo);
  enteredInfo(user);
}

function saveToLocalStorage() {
  localStorage.setItem(
    user.lName,
    JSON.stringify(user, function replacer(key, value) {
      return key === 'dName' || key === 'pass' || key === 'passConf'
        ? undefined
        : value;
    })
  );
}

// --------------------------------------------------------------

emailAddress.addEventListener('change', checkEmail);
userInfo.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT') createUser(e);
});
btnOk.addEventListener('click', saveToLocalStorage);
