if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (user) {
    if (document.getElementById("headerName")) {
        document.getElementById("headerName").textContent = user.name;
        document.getElementById("headerID").textContent = user.empCode;
    }
    if (document.getElementById("managerName")) {
        document.getElementById("managerName").textContent = user.name;
        document.getElementById("managerID").textContent = user.empCode;
    }
}
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
