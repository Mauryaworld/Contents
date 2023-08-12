function login() {
  // Check if the user is already logged in
  if (localStorage.getItem('token')) {
    return;
  }

  // Show the login dialog
  var dialog = document.getElementById('login-dialog');
  dialog.showModal();

  // Handle the login button click event
  var loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', function() {
    // Get the selected login method
    var loginMethod = document.getElementById('login-method').value;

    // Log in to GitHub
    if (loginMethod === 'github') {
      var code = prompt('Enter your GitHub authentication code');
      loginWithGitHub(code);
    } else if (loginMethod === 'google') {
      loginWithGoogle();
    } else {
      loginWithUsernameAndPassword();
    }
  });
}

// Login with GitHub
function loginWithGitHub(code) {
  // Get the GitHub API token
  var token = github.getAccessToken(code);

  // Store the token in localStorage
  localStorage.setItem('token', token);

  // Close the login dialog
  var dialog = document.getElementById('login-dialog');
  dialog.close();

  // Redirect the user to the home page
  window.location.href = '/';
}

// Login with Google
function loginWithGoogle() {
  // Redirect the user to the Google OAuth 2.0 authorization endpoint
  window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=https://www.googleapis.com/auth/userinfo.email&response_type=code';
}

// Login with username and password
function loginWithUsernameAndPassword() {
  // Get the username and password from the user
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Check if the username and password are valid
  if (!username || !password) {
    alert('Please enter your username and password');
    return;
  }

  // Login to the server
  $.ajax({
    url: '/login',
    type: 'POST',
    data: {
      username: username,
      password: password
    },
    success: function(data) {
      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Close the login dialog
      var dialog = document.getElementById('login-dialog');
      dialog.close();

      // Redirect the user to the home page
      window.location.href = '/';
    },
    error: function(error) {
      alert(error);
    }
  });
}
