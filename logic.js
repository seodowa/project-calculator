let buttonsContainer = document.querySelector(".input-buttons-container");
let clearBtn = document.querySelector("#clear-empty");
let inputScreen = document.querySelector("input");
let addBtn = document.querySelector("#add");
let subtractBtn = document.querySelector("#subtract");
let multiplyBtn = document.querySelector("#multiply");
let divideBtn = document.querySelector("#divide");
let equalsBtn = document.querySelector("#equals");

let num1 = num2 = result = null;
let operation;
let isFirstOperation = true;
let isAnOperationClicked = false;

buttonsContainer.addEventListener("click", isValidBtnInputForNumber);
clearBtn.addEventListener("click", clearInputScreen);
window.addEventListener("beforeunload", clearInputScreen);
addBtn.addEventListener("click", handleAddition);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
equalsBtn.addEventListener("click", handleResult);


function clearInputScreen() {
    inputScreen.value = "0";
    isFirstOperation = true;
    num1 = num2 = result = 0;
}


function isValidBtnInputForNumber(event) {
    let target = event.target;
    
    const re = RegExp("[\\d.]+");
    let result;
    
    if ((result = re.exec(target.textContent)) === null)
        return;

    if (event.target.id !== "dot" && isInputScreenInInitialState()) 
        inputScreen.value = "";
    else if (isAnOperationClicked) {
        inputScreen.value = "";
        isAnOperationClicked = false;
    }
        
    inputScreen.value += result[0];
}



function handleResult() {
    num2 = +inputScreen.value;

    switch (operation) {
        case "addition":
            result = add(num1, num2);
            console.log(result)
            inputScreen.value = result;
            num1 = num2 = 0;
            break;
        default:
            console.log("Invalid operation!");
    }
}


function handleAddition() {
    if (isAnOperationClicked)
        return;

    if (!isFirstOperation) {
        handleResult();
        num1 = result;
    } else {
        num1 = +inputScreen.value;
    }
    operation = "addition";
    isAnOperationClicked = true;
    isFirstOperation = false;
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


function isInputScreenInInitialState() {
    return inputScreen.value === "0";
}