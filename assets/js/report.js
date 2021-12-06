// Get session or go back to Index
if (sessionStorage.getItem("jwt") == null) {
  window.location.href = "./index.html";
}

// Get the modal
var modal = document.getElementById("userId");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// scroll to top functionality
const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Load User ID
function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer: "+ sessionStorage.getItem("jwt"));
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["user"]
        document.getElementById("fname").innerHTML = user["fname"] + " " + user["lname"];
        document.getElementById("avatar").src = user["avatar"];
        document.getElementById("username").innerHTML = user["username"];
      }
    }
  };
}

loadUser();

// Logout
function logout() {
  sessionStorage.removeItem("jwt");
  window.location.href = './index.html'
}

function loadingScript() {
  document.getElementById("loader").style.display = "none";
}