document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('message');
  const createAccountLink = document.getElementById('create-account-link');
  const accountModal = document.getElementById('account-modal');
  const closeModal = document.querySelector('.close');
  const createAccountForm = document.getElementById('create-account-form');
  const createMessageDiv = document.getElementById('create-message');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
      if (validateEmail(email)) {
        messageDiv.textContent = 'Successfully Signed In!';
        messageDiv.style.color = 'green';
        window.location.href = '/task';
      } else {
        messageDiv.textContent = 'Invalid Email Format';
      }
    } else {
      messageDiv.textContent = 'Please fill in all fields';
    }
  });

  createAccountLink.addEventListener('click', function(event) {
    event.preventDefault();
    accountModal.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    accountModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == accountModal) {
      accountModal.style.display = 'none';
    }
  });

  createAccountForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newEmail && newPassword && confirmPassword) {
      if (validateEmail(newEmail)) {
        if (newPassword === confirmPassword) {
          createMessageDiv.textContent = 'Account successfully created!';
          createMessageDiv.style.color = 'green';
        } else {
          createMessageDiv.textContent = 'Passwords do not match';
        }
      } else {
        createMessageDiv.textContent = 'Invalid Email Format';
      }
    } else {
      createMessageDiv.textContent = 'Please fill in all fields';
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
