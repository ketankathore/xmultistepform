const nextButton = document.getElementById('next-button');

const nameInput = document.querySelector('input[name="userName"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');

const errors = document.querySelectorAll('.error');

function showError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error');

  error.textContent = message;
  input.style.borderColor = '#ed3548';
}

function clearError(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error');

  error.textContent = '';
  input.style.borderColor = '#d6d9e6';
}

function validateEmail(email) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return pattern.test(email);
}

nextButton.addEventListener('click', function () {
  let isValid = true;

  errors.forEach((error) => (error.textContent = ''));

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Enter your name');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Enter email');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Invalid email');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (phoneInput.value.trim() === '') {
    showError(phoneInput, 'Enter your mobile number');
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  if (isValid) {
    alert('Proceed to Step 2');
  }
});