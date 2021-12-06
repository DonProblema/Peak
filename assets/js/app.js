loadUser();
function loadUser() {
  if (sessionStorage.getItem("jwt") != null) {
    console.log(sessionStorage.getItem("jwt"));
    // Load User ID
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader(
      "Authorization",
      "Bearer: " + sessionStorage.getItem("jwt")
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        if (objects["status"] == "ok") {
          const user = objects["user"];
          document.getElementById("btnUser").innerHTML =
            user["fname"] + " " + user["lname"];
          document.getElementById("avatar").src = user["avatar"];
          document.getElementById("userLogged").innerHTML = user["username"];
        }
      }
    };
    var x = document.getElementById("btnUser");
    x.style.display = "block";
  } else {
    var x = document.getElementById("btnLogin");
    x.style.display = "block";
  }
}

// Logout
function logout() {
  sessionStorage.removeItem("jwt");
  window.location.href = "./index.html";
}

// Carousel for photo slider
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slider");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 3000); // Change image every 3 seconds
}

// scroll to top functionality
const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Nav hamburgerburger selections

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});

// Close hamburger menu when a link is clicked
// Select nav links
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

// Get the login modal
var loginModal = document.getElementById("login");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
};

// Get the userId modal
var userIdModal = document.getElementById("userId");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == userIdModal) {
    userIdModal.style.display = "none";
  }
};

// LOGIN to access reports
//var jwt = localStorage.getItem("jwt");
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://www.mecallapi.com/api/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      username: username,
      password: password,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects["status"] == "ok") {
        sessionStorage.setItem("jwt", objects["accessToken"]);
        Swal.fire({
          text: objects["message"],
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#09becf",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./report.html";
          }
        });
      } else {
        Swal.fire({
          text: objects["message"],
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return false;
}
