let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  let userDetails = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  validation(userDetails);
});

let validation = async (data) => {
  try {
    let response = await fetch("http://localhost:3000/users");
    let userDetails = await response.json();
    let userData = userDetails.find(
      (value) => value.email === data.email && value.password === data.password,
    );
    if (userData) {
      // sessionStorage.setItem("id", userData.id);
      localStorage.setItem("id", userData.id);
      location.href = "../homePage/index.html";
    } else {
      location.href = "../registerPage/register.html";
    }
  } catch {
    alert("Some Thing Error Try After Some Time");
  }
};
