let form = document.querySelector("form");

let accountNumber = 1;

function* createAccountNumber() {
  while (true) {
    accountNumber++;
    yield accountNumber;
  }
}
let accNumber = createAccountNumber();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  if (
    formData.get("name") === "" ||
    formData.get("email") === "" ||
    formData.get("password") === "" ||
    formData.get("contact") === "" ||
    formData.get("dob") === "" ||
    formData.get("address") === "" ||
    formData.get("gender") === ""
  ) {
    alert("Fill all the fields");
  } else {
    let userDetails = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      contact: formData.get("contact"),
      dob: formData.get("dob"),
      address: formData.get("address"),
      gender: formData.get("gender"),
      accNo: accNumber.next().value,
    };
    createUser(userDetails);
    location.reload();
    // location.href = "../logInPage/logIn.html";
    alert("Registration Done ");
  }
});

let createUser = async (data) => {
  try {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    alert("Some Thing Error Try After Some Time");
  }
};
