document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }
});

function handleSignupSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const formData = { username, email, password };

 
   fetch('http://localhost:3000/api/v1/auth/signup', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        alert('Signup successful! You are now logged in.');
        localStorage.setItem('authToken', data.token);
        window.location.href = './index.html';
      } else {
        alert('Signup failed: ' + data.message);
      }
    })
    .catch(error => console.error('Error:', error));
}
