let form = document.querySelector("form");
let userId = localStorage.getItem("id");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  if (
    formData.get("amount") === "" ||
    formData.get("ahn") === "" ||
    formData.get("accountNumber") === ""
  ) {
    alert("Fill all the Fields");
  } else {
    let fundDetails = {
      accNo: formData.get("accountNumber"),
      ahn: formData.get("ahn"),
      amount: formData.get("amount"),
    };
    createDataHistory(fundDetails);
  }
});

let createDataHistory = async (fundDetails) => {
  if (localStorage.getItem("id")) {
    try {
      let response = await fetch("http://localhost:3000/users");
      let data = await response.json();
      let senderAccount = data.find((value) => value.id === userId);
      let receiverAccount = data.find(
        (value) => value.accNo === Number(fundDetails.accNo),
      );

      let senderBalanceUpdate =
        Number(senderAccount.balance) - Number(fundDetails.amount);
      let receiverBalanceUpdate =
        Number(receiverAccount.balance) + Number(fundDetails.amount);
      console.log(senderAccount);
      console.log(receiverAccount);
      if (receiverAccount === undefined) {
        alert("Receiver Not Found");
      } else if (fundDetails.amount <= senderAccount.balance) {
        alert("Transfer Done");
        let transaction = {
          transactionId: crypto.randomUUID(),
          sendId: senderAccount.id,
          receiverId: receiverAccount.id,
          amount: fundDetails.amount,
          notification: false,
          date: new Date().toDateString(),
        };
        createTransaction(transaction);
        updateBalanceFunction(senderAccount.id, senderBalanceUpdate);
        updateBalanceFunction(receiverAccount.id, receiverBalanceUpdate);
      } else {
        alert("Insufficient Funds");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    location.href = "../logInPage/logIn.html";
  }
};

let createTransaction = async (data) => {
  try {
    await fetch("http://localhost:3000/history", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let updateBalanceFunction = async (id, amount) => {
  try {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ balance: amount }),
    });
  } catch (error) {
    console.log(error);
  }
};
