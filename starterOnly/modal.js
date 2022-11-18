function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// Select all close's modal button
const closeBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/*
  TODO : 
    |__> [x] fermer la modale
    |__> [x] Implémenter entrées du formulaire
    |__> [x] Ajouter validation ou messages d'erreur
    |__> [x] Ajouter confirmation quand envoi réussi
    |__> [x] Tests manuels
*/

//
// Section : modal open and close
//

// launch modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.getElementById('myTopnav').style.position = "sticky"
  document.getElementById('myTopnav').style.top = "0"
  document.body.style.overflow = "hidden";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  document.getElementById('myTopnav').style.position = "static"
  document.body.style.overflow = "auto";
}

//
// Section : Get inputs values and compare (w/ regex)
//

// Get inputs value
const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const quantity = document.getElementById('quantity');
const anniversary = document.getElementById('birthdate');

// Get form id
const form = document.getElementById('form');

// Check firstname value to get length and compare
const checkFirstname = () => {
  // Initialize variable
  let valid = false;
  // Get input value and trim
  const firstnameInput = firstname.value.trim();
  // Compare to get more than 2 caracters and less than 30 caracters
  if(firstnameInput.length < 2) {
    showError(firstname, `Veuillez entrer 2 caractères ou plus pour le champ du nom.`);
  } else if(firstnameInput.length == "" || firstnameInput.length == null) {
    showError(firstname, `Merci de mettre un prénom.`);
  } else {
    valid = true
  }
  return valid;
}

// Check lastname value to get length and compare
const checkLastname = () => {
  // Initialize variable
  let valid = false;
  // Get input value and trim
  const lastnameInput = lastname.value.trim();
  // Compare to get more than 2 caracters and less than 30 caracters
  if(lastnameInput.length < 2) {
    showError(lastname, `Merci de mettre un nom à plus de 2 caractères.`);
  } else if(lastnameInput.length == "" || lastnameInput.length == null) {
    showError(lastname, `Merci de mettre un nom.`);
  } else {
    valid = true
  }
  return valid;
}

// Check birthday value with regex
const checkAnni = () => {
  // Initialize variable
  let valid = false;
  // Get input value and trim
  const anniInput = anniversary.value.trim();
  // Regex anni
  const re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  // Compare to anniInput more than 2 caracters and less than 30 caracters
  if(!re.test(anniInput)) {
    showError(anniversary, `Vous devez entrer votre date de naissance.`);
  } else if(anniInput.length == null) {
    showError(anniversary, `Vous devez entrer votre date de naissance.`);
  } else {
    valid = true
  }

  return valid;
}

// Check email value with regex
const checkEmail = () => {
  // Initialize variable
  let valid = false;
  // Get input value and trim
  const emailInput = email.value.trim();
  // Regex email
  const re = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  // Compare to get more than 2 caracters and less than 30 caracters
  if(!re.test(emailInput)) {
    showError(email, `Adresse email non valide`);
  } else if(emailInput.length == null) {
    showError(email, `Merci de mettre une adresse mail`);
  } else {
    valid = true
  }
  return valid;
}

// Check quantity value and compare
const checkQuantity = () => {
  // Initialize variable
  let valid = false;
  // Get input value and trim
  const quantityInput = quantity.value.trim();
  // Compare to get more than 2 caracters and less than 30 caracters
  if(quantityInput < 1) {
    showError(quantity, `Merci de mettre une valeur supérieur à 0`);
  } else if(quantityInput == "" || quantityInput.length == null) {
    showError(quantity, `Merci de mettre une valeur entre 1 et 100`);
  } else if(quantityInput > 100) {
    showError(quantity, `Merci de mettre une valeur inférieur à 100`);
  } else {
    valid = true
  }
  return valid;
}

// Check if one radio button is checked
const checkRadio = () => {
  const listRadio = document.querySelectorAll('[name="location"]');
  const radioArea = document.getElementById('location1');
  let valid = false;
  listRadio.forEach((e) => {
    if(e.checked) valid = true;
  })
  if(!valid) showError(radioArea, `Vous devez vérifier que vous avez coché(e) une case.`);
  return valid;
}

// Check rule value and compare
const checkRules = () => {
  const ruleArea = document.getElementById('checkbox1');
  let valid = false;
  if(ruleArea.checked) {
    valid = true;
  } else {
    showError(ruleArea, `Vous devez vérifier que vous acceptez les termes et conditions.`);
  }
  return valid;
}

// Display error
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // show the error message
  const error = formField.querySelector('span');
  formField.querySelector('input').style.border = '2px solid red'
  error.textContent = message;
};

form.addEventListener('submit', function (e) {

  // Prevent from remove value 
  e.preventDefault();
  // validate fields
  let isFirstnameValid = checkFirstname(),
      isLastnameValid = checkLastname();
      isEmailValid = checkEmail();
      isQuantityValid = checkQuantity();
      isRadioValid = checkRadio();
      isRulesValid = checkRules();
      isAnniValid = checkAnni();
  let isFormValid = isFirstnameValid && isLastnameValid && isEmailValid && isQuantityValid && isRadioValid && isRulesValid && isAnniValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    form.style.display = "none"
    const para = document.createElement("p");
    para.classList.add("validateMessage");
    const textNode = document.createTextNode("Merci pour votre inscription");
    para.appendChild(textNode);
    form.parentElement.appendChild(para)

    const btn = document.createElement("button");
    btn.classList.add('btn-signup');
    btn.setAttribute('id', 'button-validate')
    btn.innerHTML = "Fermer";
    form.parentElement.appendChild(btn)

    
    // Reset form on validation
    form.reset();

    // Hide validation message on validation
    btn.addEventListener('click', () => {
      modalbg.style.display = "none";
      para.style.display = "none";
      btn.style.display = "none";
      form.style.display = "block"
      closeModal();
    })
  }
});

// On inputs click, delete alert message
form.addEventListener('click', function(e) {
  const delError = e.target.parentElement.querySelector('span');
  const delBorder = delError.parentElement.querySelector("input")
  switch (e.target.id) {
    case 'first':
      delBorder.style.border = "1px solid grey";
      delError.textContent = ""
      break;
    case 'last':
      delBorder.style.border = "1px solid grey";
      delError.textContent = ""
      break;
    case 'email':
      delBorder.style.border = "1px solid grey";
      delError.textContent = ""
      break;
    case 'birthdate':
      delBorder.style.border = "1px solid grey";
      delError.textContent = ""
      break;
    case 'quantity':
      delBorder.style.border = "1px solid grey";
      delError.textContent = ""
      break;
    case 'checkbox1':
      delError.textContent = ""
      break;
    // This section need to be optimize ...
    case 'location1':
    case 'location2':
    case 'location3':
    case 'location4':
    case 'location5':
    case 'location6':
      delError.textContent = ""
      break;
  }
});