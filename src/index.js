'use strict';

// --------------------------------------------------------
const regExpPass = /^[A-Za-z0-9]{8,20}$/;
const regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;
const incorrectEmail = document.getElementById('incorrectEmail');
const emailAddress = document.getElementById('email');
const pass = document.getElementById('pass');
const passConf = document.getElementById('passConf');
const enterPass = document.getElementById('enterPass');
const passNotMatch = document.getElementById('passNotMatch');
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

function checkPass() {
  const passValue = pass.value;
  const passConfValue = passConf.value;
  let isValid = false;
  if (!regExpPass.test(passValue)) {
    enterPass.style.display = 'flex';
    isValid = false;
  } else {
    enterPass.style.display = 'none';
    isValid = true;
    if (passValue !== passConfValue) {
      passNotMatch.style.display = 'flex';
      isValid = false;
    } else {
      passNotMatch.style.display = 'none';
      isValid = true;
    }
  }
  
  return isValid
}

function enteredInfo(user) {
  if (user.fName && user.lName && regExpEmail.test(user.email) && checkPass()) {
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
  console.log(user);
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
passConf.addEventListener('change', checkPass);
pass.addEventListener('change', checkPass);
emailAddress.addEventListener('change', checkEmail);
userInfo.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT') createUser(e);
});
btnOk.addEventListener('click', saveToLocalStorage);
