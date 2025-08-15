const users = [
    // Top manager
    { companyCode: "40180081", password: "vikaspass", name: "Vikas Dhiaya", empCode: "V001" },
    // Lakshay (reports to Vikas)
    { companyCode: "40180080", password: "lakshaypass", name: "Lakshay Sachdeva", empCode: "40180080" },
    // Lakshay's team
    { companyCode: "40180082", password: "shriyampass", name: "Shriyam B.", empCode: "S001" },
    { companyCode: "40180083", password: "shreyanshpass", name: "Shreyansh G.", empCode: "S002" },
    { companyCode: "40180084", password: "aravpass", name: "Arav K.", empCode: "A001" },
    { companyCode: "40180085", password: "agrimpass", name: "Agrim M.", empCode: "A002" },
    { companyCode: "40180086", password: "ishanpass", name: "Ishan J.", empCode: "I001" }
];

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const companyCode = document.getElementById("companyCode").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMsg = document.getElementById("error-msg");
            const validUser = users.find(
                user => user.companyCode === companyCode && user.password === password
            );
            if (validUser) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                window.location.href = "dashboard.html";
            } else {
                errorMsg.textContent = "Invalid Company Code or Password";
                errorMsg.style.color = "red";
            }
        });
    }
});
