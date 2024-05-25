function togglePassword(fieldId, iconId) {
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
