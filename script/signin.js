function togglePassword() {
  const passwordField = document.getElementById("password");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordIcon.classList.remove("fa-eye");
    togglePasswordIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePasswordIcon.classList.remove("fa-eye-slash");
    togglePasswordIcon.classList.add("fa-eye");
  }
}


function addAction() {

    const methodLink = document.querySelector("form");
    methodLink.action = "http://localhost:9000/signin";
    methodLink.method = "post";
  }
