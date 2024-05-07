function editNav() {
	const x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'flex';
}

// close modal
const closeM = document.querySelector('.close');

function closeModal(close) {
	close.addEventListener('click', () => {
		modalbg.style.display = 'none';
	});
}

closeModal(closeM);

//  Modal form

// Validation for the first name
function validateFirstname(firstname) {
	if (firstname.value.length < 2) {
		throw new Error(
			'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
		);
	}
	return true;
}

// Validation for the last name
function validateLastname(lastname) {
	if (lastname.value.length < 2) {
		throw new Error(
			'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
		);
	}
	return true;
}

// Validation for the email
function validateEmail(email) {
	let emailRegExp = new RegExp(
		'^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9]+',
	);
	if (!emailRegExp.test(email.value)) {
		throw new Error("L'email n'est pas valide.");
	}
	return true;
}

// Validation for the birthdate
function validateBirthdate(birthdate) {
	const userAge = calculateUserAge(birthdate);
	if (userAge < 18 || userAge > 99 || birthdate.value === '') {
		throw new Error(
			'Vous devez avoir plus de 18 ans et moins de 99 ans pour participer.',
		);
	}
	return true;
}

// Calculation of the user's age
function calculateUserAge(birthdate) {
	const birthDate = new Date(birthdate.value);
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	if (
		month < 0 ||
		(month === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
}

// Validation for the quantity
function validateQuantity(quantity) {
	if (
		quantity.value < 0 ||
		quantity.value > 99 ||
		quantity.value === ''
	) {
		throw new Error(
			'Veuillez renseigner un nombre entre 0 et 99',
		);
	}
	return true;
}

// Validation for the terms of use
function validateConditions(conditions) {
	if (!conditions.checked) {
		throw new Error(
			"Vous devez accepter les conditions d'utilisation",
		);
	}
	return true;
}

// Validation for the selected city
function validateCitySelected(cities) {
	let isChecked = false;
	for (let i = 0; i < cities.length; i++) {
		if (cities[i].checked) {
			isChecked = true;
			break;
		}
	}

	if (!isChecked) {
		throw new Error('Veuillez sélectionner une ville.');
	}
	return true;
}

// Validate the form
function validateForm() {
	const firstname = document.getElementById('first');
	const lastname = document.getElementById('last');
	const email = document.getElementById('email');
	const birthdate = document.getElementById('birthdate');
	const quantity = document.getElementById('quantity');
	const conditions = document.getElementById('checkbox1');
	const cities = document.querySelectorAll(
		"input[name='location']",
	);

	const isFirstNameValid = validateFirstname(firstname);
	const isLastNameValid = validateLastname(lastname);
	const isEmailValid = validateEmail(email);
	const isBirthdateValid = validateBirthdate(birthdate);
	const isQuantityValid = validateQuantity(quantity);
	const isConditionsValid = validateConditions(conditions);
	const isCitySelected = validateCitySelected(cities);

	return (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid &&
		isBirthdateValid &&
		isQuantityValid &&
		isConditionsValid &&
		isCitySelected
	);
}

// Validate the form on submission
const form = document.querySelector('form[name="reserve"]');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (validateForm()) {
		form.submit();
	}
});
