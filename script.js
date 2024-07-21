const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button"),
  mobile = document.getElementById("mobile"),
  expire = document.getElementById("Expire");

let OTP = "",
  expireTime = 120,
  expireInterval = "";

function generateOTPs() {
  OTP =
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10);
  alert("Your OTP is: " + OTP);
  inputs[0].focus();

  expire.innerText = expireTime;
  expireInterval = setInterval(function () {
    if (expire.innerText == 0) {
      clearInterval(expireInterval);
      clearOTPs(); // Clear the OTPs when the expire time reaches 0
    } else {
      expireTime--;
      expire.innerText = expireTime;
    }
  }, 1000);
}

function clearOTPs() {
  inputs.forEach((input, i) => {
    input.value = "";
    if (i == 0) {
      input.removeAttribute("disabled");
    }
    if (i != 0) {
      input.setAttribute("disabled", true);
    }
  });
  clearInterval(expireInterval);
//   expireTime = 0;
  expire.innerText = 0;
  button.setAttribute("disabled",true);
  button.classList.remove("active");
}

inputs.forEach((input, index) => {
  input.addEventListener("keyup", function (e) {
    const currentIndex = index,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling,
      value = input.value;

    if (nextInput && nextInput.hasAttribute("disabled") && value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }
    if (e.key === "Backspace") {
      if (index > 0 && prevInput) {
        input.setAttribute("disabled", true);
        prevInput.focus();
        prevInput.value = "";
      }
    }
    if (inputs[3].disabled && inputs[3].value !== "") {
      inputs[3].blur();
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});

window.addEventListener("load", () => {
  let x = prompt("Please enter your mobile number to verify your account");
  if (x) {
    mobile.innerText = x;
    generateOTPs();
  }
});

button.addEventListener("click", () => {
  let verify = "";
  inputs.forEach((input) => {
    verify += input.value;
  });
  if (verify === OTP) {
    alert("Your account has been verified successfully!");
    clearOTPs();
  } else {
    // clearOTPs();
    alert("Your Verification Failed!");
  }
});