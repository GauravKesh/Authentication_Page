// To get the session LOGIN/LOG OUT
const session = sessionStorage.getItem("session");

// To manipulate homepage navbar based on session status
if (session === "true") {
  const dispElements = document.querySelectorAll(".com");
  const logoutElement = document.querySelector(".logout");
  dispElements.forEach((el) => (el.style.display = "none")); // Hide log in and signup
  logoutElement.style.display = "flex"; // Show logout button
}else{
    const dispElements = document.querySelectorAll(".com");
    const logoutElement = document.querySelector(".logout");
    dispElements.forEach((el) => (el.style.display = "flex"));
    logoutElement.style.display = "none";
}

const logOut = () => {
  sessionStorage.setItem("session", "false");
  window.location.href = "../public/login.html"; 
};
