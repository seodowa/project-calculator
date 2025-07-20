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
let isOperationRecentlyClicked = false;

buttonsContainer.addEventListener("click", isValidBtnInputForNumber);
clearBtn.addEventListener("click", clearInputScreen);
window.addEventListener("beforeunload", clearInputScreen);
addBtn.addEventListener("click", handleOperation);
subtractBtn.addEventListener("click", handleOperation);
multiplyBtn.addEventListener("click", handleOperation);
divideBtn.addEventListener("click", handleOperation);
equalsBtn.addEventListener("click", handleResult);
inputScreen.addEventListener("wheel", enableScreenVerticalScroll)


function clearInputScreen() {
    inputScreen.value = "0";
    isFirstOperation = true;
    isAnOperationClicked = false;
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
    else if (isOperationRecentlyClicked) {
        inputScreen.value = "";
        isOperationRecentlyClicked = false;
    }
        
    inputScreen.value += result[0];
}



function handleResult() {
    if (!isAnOperationClicked)
        return;
    
    num2 = +inputScreen.value;

    switch (operation) {
        case "addition":
            result = add(num1, num2);
            break;
        case "subtraction":
            result = subtract(num1, num2);
            break;
        case "multiplication":
            result = multiply(num1, num2);
            break;
        case "division":
            result = divide(num1, num2);
            break;
        default:
            console.log("Invalid operation!");
    }

    inputScreen.value = result;
    num1 = num2 = 0;
    isAnOperationClicked = false;
}


function handleOperation(event) {
    if (!isFirstOperation) {
        handleResult();
        num1 = result;
    } else {
        num1 = +inputScreen.value;
    }
    isOperationRecentlyClicked = true; 
    isAnOperationClicked = true;
    isFirstOperation = false;

    switch (event.target.id) {
        case "add":
            operation = "addition";
            break;
        case "subtract":
            operation = "subtraction";
            break;
        case "multiply":
            operation = "multiplication";
            break;
        case "divide":
            operation = "division";
            break;
    }
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


function enableScreenVerticalScroll(event) {
    event.preventDefault();
    event.target.scrollLeft += event.deltaY;
}