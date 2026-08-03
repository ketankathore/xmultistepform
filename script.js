// ===== DOM Elements =====
const nextButton = document.getElementById('next-button');

const nameInput = document.querySelector('input[name="userName"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');

const errors = document.querySelectorAll('.error');

// ===== State =====
let selectedPlan = null;
let selectedAddons = [];

// ===== Utility Functions =====
function showStep(stepNumber) {
  document.querySelectorAll('.step-content').forEach(step => {
    step.classList.add('hidden');
  });

  document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error');

  error.textContent = message;
  input.style.borderColor = '#ed3548';
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error');

  error.textContent = '';
  input.style.borderColor = '#d6d9e6';
}

function validateEmail(email) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return pattern.test(email);
}

// ===== Step 1 Validation =====
nextButton.addEventListener('click', function () {
  let isValid = true;

  errors.forEach(error => error.textContent = '');

  // Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'A field has been missed');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'A field has been missed');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'The email address is not formatted correctly');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Phone
  if (phoneInput.value.trim() === '') {
    showError(phoneInput, 'A field has been missed');
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  if (isValid) {
    showStep(2);
  }
});

// ===== Step 2: Plan Selection =====
const planCards = document.querySelectorAll('.plan_card');

planCards.forEach(card => {
  card.addEventListener('click', () => {
    planCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedPlan = card;
    const planError = document.getElementById('plan-error');
    if (planError) planError.textContent = '';
  });
});

const next2 = document.getElementById('next-2');
if (next2) {
  next2.addEventListener('click', () => {
    const planError = document.getElementById('plan-error');

    if (!selectedPlan) {
      if (planError) planError.textContent = 'Please select a plan';
      return;
    }

    showStep(3);
  });
}

// ===== Step 3: Add-ons =====
const addonCards = document.querySelectorAll('.addon_card');

addonCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('selected');

    const addonName = card.textContent.trim();

    if (card.classList.contains('selected')) {
      if (!selectedAddons.includes(addonName)) {
        selectedAddons.push(addonName);
      }
    } else {
      selectedAddons = selectedAddons.filter(a => a !== addonName);
    }
  });
});

const next3 = document.getElementById('next-3');
if (next3) {
  next3.addEventListener('click', () => {
    showStep(4);
  });
}

// ===== Step 4: Confirm =====
const confirmBtn = document.getElementById('confirm-btn');

if (confirmBtn) {
  confirmBtn.addEventListener('click', () => {
    showStep(5);
  });
}

// ===== Back Buttons =====
const back1 = document.getElementById('back-1');
const back2 = document.getElementById('back-2');
const back3 = document.getElementById('back-3');

if (back1) {
  back1.addEventListener('click', () => showStep(1));
}

if (back2) {
  back2.addEventListener('click', () => showStep(2));
}

if (back3) {
  back3.addEventListener('click', () => showStep(3));
}

// ===== Initialize =====
showStep(1);