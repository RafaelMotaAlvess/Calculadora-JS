const main = document.querySelector("main");
const root = document.querySelector(":root");
const swichBtn = document.getElementById("themeSwitcher");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

const datasetKeys = document.querySelectorAll("[data-value]");

const allowedKeys = Array.from(datasetKeys).map(function (dataValue) {
  return dataValue.dataset.value;
});

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();
});

document.getElementById("equal").addEventListener("click", calculate);

input.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (allowedKeys.includes(event.key)) {
    input.value += event.key;
    return;
  }

  if (event.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }

  if (event.key === "Enter") {
    calculate();
  }
});

function calculate() {
  resultInput.value = "ERRO";
  resultInput.classList.add("error");
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (event) {
    const button = event.currentTarget;

    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

swichBtn.addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    console.log("toaqui");
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
