//  to show password 
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

// to add action in form
function addAction() {
  const methodLink = document.querySelector("form");
  methodLink.action = "http://localhost:9000/signin";
  methodLink.method = "post";
  sessionStorage.setItem("session", "true");
}


// To get the session LOGIN/LOG OUT
const session = sessionStorage.getItem("session");

// To manipulate homepage navbar based on session status
if (session === "true") {
  const dispElements = document.querySelectorAll(".com");
  const bdy = document.querySelector(".login-box");
  const show = document.querySelector(".home");
  const logoutElement = document.querySelector(".logout");
  dispElements.forEach((el) => (el.style.display = "none")); // Hide login signup button"
  logoutElement.style.display = "flex"; // Show logout element
  bdy.style.display = "none"; // Hide login box
  window.location.href = "./home.html"; // Redirect to home page
} else {
  const dispElements = document.querySelectorAll(".com");
  const logoutElement = document.querySelector(".logout");
  dispElements.forEach((el) => (el.style.display = "flex")); // Show logout button
  logoutElement.style.display = "none"; // Hide logout element
}

const logOut = () => {
  sessionStorage.setItem("session", "false");
};
