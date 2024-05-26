const dot = require("dotenv").config();


function togglePassword(
  fieldId,
  iconId,
  confirmPasswordFeild,
  confirmPasswordFeildIconId
) {
  const passwordField = document.getElementById(fieldId);
  const togglePasswordIcon = document.getElementById(iconId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordIcon.classList.remove("fa-eye"); // removes class
    togglePasswordIcon.classList.add("fa-eye-slash"); // add class
  } else {
    passwordField.type = "password";
    togglePasswordIcon.classList.remove("fa-eye-slash");
    togglePasswordIcon.classList.add("fa-eye");
  }
}

function checkPassword(passwordfieldId, confirm_passwordfieldId) {
  const passwordField = document.getElementById(passwordfieldId).value;
  const confirmPasswordFeild = document.getElementById(
    confirm_passwordfieldId
  ).value;
  if (passwordField != confirmPasswordFeild) {
    alert("confirn password Doesn't match");
  } else {
    const methodLink = document.querySelector("form");
    methodLink.action = "http://localhost:9000/signup";
    methodLink.method = "post";
  }
}
