let log = [
  {
    name: "logo",
    path: "#",
  },
];

let navigation = [
  {
    name: "home",
    path: "../homePage/index.html",
  },
  {
    name: "services",
    path: "#",
  },
  {
    name: "fund transfer",
    path: "#",
  },
  {
    name: "transition history",
    path: "#",
  },
  {
    name: "contact",
    path: "#",
  },
];

let profile = [
  {
    name: "sign in",
    path: "../registerPage/register.html",
  },
  {
    name: "log in",
    path: "../logInPage/logIn.html",
  },
  {
    name: "notifications",
    path: "#",
  },
  {
    name: "my account",
    path: "#",
  },
  {
    name: "logout",
  },
];

let nav_container = document.querySelector("#nav_container");
let createNavbar = (data) => {
  let article = document.createElement("article");
  let ul = document.createElement("ul");
  data.map((value) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    li.className = value.name;
    if (value.name === "logo") {
      let image = document.createElement("img");
      image.src = value.path;
      li.append(image);
      ul.append(li);
    } else if (value.name === "logout") {
      let button = document.createElement("button");
      button.innerHTML = "Logout";
      button.addEventListener("click", () => {
        localStorage.removeItem("id");
        location.reload();
      });
      li.append(button);
      ul.append(li);
    } else {
      a.innerHTML = value.name;
      a.href = value.path;
      li.append(a);
      ul.append(li);
    }
  });
  article.append(ul);
  nav_container.append(article);
};

createNavbar(log);
createNavbar(navigation);
createNavbar(profile);

let signIn = document.querySelector(".sign");
let logIn = document.querySelector(".log");
let myAccount = document.querySelector(".my");
let logout = document.querySelector(".logout");
let localId = localStorage.getItem("id");
if (localId) {
  signIn.style.display = "none";
  logIn.style.display = "none";
} else {
  myAccount.style.display = "none";
  logout.style.display = "none";
}
