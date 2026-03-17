let notification_container = document.querySelector("#notification_container");
let fetchNotificationsData = async () => {
  let response = await fetch("http://localhost:3000/history");
  let responseData = await response.json();

  let filterData = responseData.filter(
    (value) => value.sendId === userId || value.receiverId,
  );
  console.log(filterData);

  filterData.map(async (value) => {
    let message = document.createElement("p");

    if (value.notification === false) {
      message.style.backgroundColor = "aqua";
    }
    if (value.receiverId === userId) {
      message.innerHTML = `The ${value.amount} is Credited To Your Account From ${await getUserDetails(value.sendId)}`;
      message.style.color = "green";
    } else {
      message.innerHTML = `The ${value.amount} is Debited From Your Account And Send To ${await getUserDetails(value.receiverId)} `;
      message.style.color = "red";
    }

    message.addEventListener("click", () => {
      updatePatchNotification(value.id);
    });
    notification_container.append(message);
  });
};
fetchNotificationsData();

let getUserDetails = async (id) => {
  let response = await fetch("http://localhost:3000/users");
  let responseData = await response.json();
  let user = responseData.find((value) => value.id === id);
  return user.name;
};

let updatePatchNotification = async (id) => {
  try {
    await fetch(`http://localhost:3000/history/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ notification: true }),
    });
  } catch (error) {
    console.log(error);
  }
};
