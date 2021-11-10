console.log("usersClient.js called");
// Yuanyuan: The comment here is very detailed and let the code easy to follow. Everything is very orgianized. Good job!
/// Frontend functionalities for user login and registration ///
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementsByClassName("loginError")[0];
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementsByClassName("registerError")[0];

if (loginForm !== null && loginError !== null) {
  // Handles login submission
  loginForm.onsubmit = async (event) => {
    event.preventDefault();

    // Empty object
    const loginFormData = new FormData(loginForm);

    const userData = {
      userName: loginFormData.get("userName"),
      password: loginFormData.get("password"),
    };

    const resRawData = await fetch("/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    //If response is not returned successfully
    if (!resRawData.ok) {
      console.log("Response status ", resRawData.status);
    }

    // Parses the response raw data (as JSON) and returns the users
    // array wrapped in JavaScript object.
    const resData = await resRawData.json();
    console.log("Got logged in user(s) ", resData);

    // If users array does not contain an existing user
    // we show login error message (incorrect user name and/or password)
    if (!resData.users.length) {
      loginError.style.display = "block";
    }

    // Otherwise, we don't display login error message
    // and navigate to gamePosts page
    else {
      loginError.style.display = "none";
      window.location.href = "/gamePosts.html";
    }
  };
}

if (registerForm !== null && registerError !== null) {
  // Handles registration submission
  registerForm.onsubmit = async (event) => {
    event.preventDefault();

    // Empty object
    const registerFormData = new FormData(registerForm);

    const userData = {
      userName: registerFormData.get("userName"),
      password: registerFormData.get("password"),
    };

    const resRawData = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    //If response is not returned successfully
    if (!resRawData.ok) {
      console.log("Response status ", resRawData.status);
    }

    // Parses the response raw data (as JSON) and returns the users
    // array wrapped in JavaScript object.
    const resData = await resRawData.json();
    console.log("Got registered user(s) ", resData);

    // If users array does contain an existing user
    // we show register error message (user name already exists incorrect)
    if (resData.users.length) {
      registerError.style.display = "block";
    }

    // Otherwise, we don't display error error message
    // and navigate to login page
    else {
      registerError.style.display = "none";
      window.location.href = "/index.html";
    }
  };
}
