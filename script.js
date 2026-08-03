const nextButton = document.getElementById('next-button');

const nameInput = document.querySelector('input[name="userName"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');

const errors = document.querySelectorAll('.error');

function showStep(stepNumber) {
  document.querySelectorAll('.step-content').forEach(step => {
    step.classList.add('hidden');
  });

  document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
}

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

// STEP 1 VALIDATION
nextButton.addEventListener('click', function () {
  let isValid = true;

  errors.forEach(error => error.textContent = '');

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
    showStep(2);
  }
});

// STEP 2 PLAN SELECTION
const planCards = document.querySelectorAll('.plan_card');
let selectedPlan = null;

planCards.forEach(card => {
  card.addEventListener('click', () => {
    planCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedPlan = card;
    document.getElementById('plan-error').textContent = '';
  });
});

document.getElementById('next-2').addEventListener('click', () => {
  if (!selectedPlan) {
    document.getElementById('plan-error').textContent = 'Please select a plan';
    return;
  }

  showStep(3);
});

// STEP 3
document.getElementById('next-3').addEventListener('click', () => {
  showStep(4);
});

// STEP 4
document.getElementById('confirm-btn').addEventListener('click', () => {
  showStep(5);
});

// BACK BUTTONS
document.getElementById('back-1').addEventListener('click', () => showStep(1));
document.getElementById('back-2').addEventListener('click', () => showStep(2));
document.getElementById('back-3').addEventListener('click', () => showStep(3));