let form = document.querySelector("form");

let accNumberData = async () => {
  let response = await fetch("http://localhost:3000/users");
  let data = await response.json();
  if (data.length === 0) {
    return 1;
  } else {
    return data[data.length - 1].accNo + 1;
  }
};
form.addEventListener("submit", async (e) => {
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
      accNo: await accNumberData(),
      balance: 0,
      createdAt: new Date(),
    };
    createUser(userDetails);
    location.href = "../logInPage/logIn.html";
    alert("Registration Done ");
    location.reload();
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
