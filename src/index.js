'use strict';

// --------------------------------------------------------
const regExpEmail = /^\w+\.?\w+@[a-z]{3,8}\.[a-z]{2,5}$/i;
const emailAddress = document.getElementById('email');
const userInfo = document.querySelectorAll('input');
const btnOk = document.getElementById('ok');
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
  let user = new Person(...arrayUserInfo);
  enteredInfo(user);

  // localStorage.setItem(`${user.lName}`, JSON.stringify(user));
}

function checkEmail() {
  const emailAddressValue = emailAddress.value;
  if (!regExpEmail.test(emailAddressValue)) {
    if (!emailErrorDisplayed) {
      const emailError = document.createElement('span');
      emailError.textContent = 'Email address incorrect';
      emailError.style.border = 'solid 2px red';
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

function enteredInfo(user) {
  console.log(user);
  console.log(user.email);
  console.log(regExpEmail.test(user.email));
  if (user.fName && user.lName && regExpEmail.test(user.email)) {
    btnOk.classList.remove('disabled');
    btnOk.removeAttribute('disabled');
  }
  if (!disabled) {
    btnOk.classList.add('disabled');
    btnOk.setAttribute('disabled');
  }

}

// function saveToLocalStorage(e) {
// localStorage.setItem(`${user.lName}`, JSON.stringify(user));
// }

emailAddress.addEventListener('change', checkEmail);

userInfo.forEach((el) => {
  el.addEventListener('change', createUser);
});
// btnOk.addEventListener('change', enteredInfo)
