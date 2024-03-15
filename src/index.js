'use strict';

// --------------------------------------------------------
const regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;
const emailAddress = document.getElementById('email');
const userInfo = document.querySelectorAll('input');
const passInput = document.getElementById('pass');
const passInputConf = document.getElementById('passConf');
const btnOk = document.getElementById('ok');
let user;
let emailErrorDisplayed = false;
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

function createUser(e) {
  e.preventDefault();
  const arrayUserInfo = Array.from(userInfo).map((el) => el.value);
  user = new Person(...arrayUserInfo);
  enteredInfo(user);
}

function checkEmail() {
  const emailAddressValue = emailAddress.value;
  if (!regExpEmail.test(emailAddressValue)) {
    if (!emailErrorDisplayed) {
      const emailError = document.createElement('span');
      emailError.textContent = 'Email address incorrect';
      emailError.style.border = 'solid 2px red';
      emailError.style.color = 'red';
      emailAddress.parentNode.appendChild(emailError);
      emailErrorDisplayed = true;
    }
  } else {
    if (emailErrorDisplayed) {
      const emailError = emailDiv.querySelector('span');
      if (emailError) {
        emailError.remove();
      }
      emailErrorDisplayed = false;
    }
  }
}

function passValidation() {
  const spanPas = document.getElementsByClassName('passError');
  if (user.pass.length > 7 && user.pass.length <= 20)
    if (user.pass === user.passConf) {
      for (let i = 0; i < spanPas.length; i++) {
        spanPas[i].style.display = 'none';
      }
      return true;
    }
  for (let i = 0; i < spanPas.length; i++) {
    spanPas[i].style.display = 'block';
  }
  return false;
}

function enteredInfo(user) {
  if (
    user.fName &&
    user.lName &&
    regExpEmail.test(user.email) &&
    passValidation()
  ) {
    btnOk.classList.remove('disabled');
    btnOk.removeAttribute('disabled');
  } else {
    btnOk.classList.add('disabled');
    btnOk.setAttribute('disabled', 'disabled');
  }
}

function saveToLocalStorage(e) {
  localStorage.setItem(`${user.lName}`, JSON.stringify(user));
}

// -----------Listeners-----------------------------------------

passInput.addEventListener('change', passValidation);
passInputConf.addEventListener('change', passValidation);
emailAddress.addEventListener('change', checkEmail);
userInfo.forEach((el) => {
  el.addEventListener('change', createUser);
});

btnOk.addEventListener('click', saveToLocalStorage);
