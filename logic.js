let buttonsContainer = document.querySelector(".input-buttons-container");
let clearBtn = document.querySelector("#clear-empty");
let inputScreen = document.querySelector("input");

buttonsContainer.addEventListener("click", isValidInputForNumber);
clearBtn.addEventListener("click", clearInputScreen);
window.addEventListener("beforeunload", clearInputScreen);


function clearInputScreen() {
    inputScreen.value = "0";
}


function isValidInputForNumber(event) {
    let target = event.target;
    
    const re = RegExp("[\\d.]+");
    let result;
    
    if ((result = re.exec(target.textContent)) === null)
        return;

    if (event.target.id !== "dot" && inputScreen.value === "0")
        inputScreen.value = "";

    inputScreen.value += result[0];
}


function add(a, b) {
    return a+b;
}


function subtract(a, b) {
    return a-b;
}


function multiply(a, b) {
    return a*b;
}


function divide(a, b) {
    return a/b;
}