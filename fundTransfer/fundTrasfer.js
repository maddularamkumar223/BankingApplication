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
  try {
    let response = await fetch("http://localhost:3000/users");
    let data = await response.json();
    let senderAccount = data.find((value) => value.id === userId);
    let receiverAccount = data.find(
      (value) => value.accNo === Number(fundDetails.accNo),
    );
    if (receiverAccount === undefined) {
      alert("Receiver Not Found");
    } else if (fundDetails.amount <= senderAccount.balance) {
      alert("Transfer Done");
      let transaction = {
        transactionId: crypto.randomUUID(),
        sendId: senderAccount.id,
        receiverId: receiverAccount.id,
        amount: fundDetails.amount,
      };
      createTransaction(transaction);
    } else {
      alert("Insufficient Funds");
    }
  } catch (error) {
    console.log(error);
  }
};

let createTransaction = async (data) => {
 try{
     await fetch("http://localhost:3000/history", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
 }
 catch(error){
    console.log(error)
 }
};
