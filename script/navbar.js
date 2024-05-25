function toggleMenu() {
  var dropdown = document.querySelector(".dropdown");
  var hamburgerMenu = document.querySelector(".hamburger-menu");

  dropdown.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("page-loader");
  loader.addEventListener("animationend", function () {
    loader.style.display = "none";
  });
});
