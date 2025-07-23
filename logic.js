let buttonsContainer = document.querySelector(".input-buttons-container");
let clearBtn = document.querySelector("#clear-empty");
let inputScreen = document.querySelector("input");
let addBtn = document.querySelector("#add");
let subtractBtn = document.querySelector("#subtract");
let multiplyBtn = document.querySelector("#multiply");
let divideBtn = document.querySelector("#divide");
let equalsBtn = document.querySelector("#equals");
let posnegBtn = document.querySelector("#posneg");
let sqrtBtn = document.querySelector("#sqrt");
let backspaceBtn = document.querySelector("#backspace");

let num1 = num2 = result = null;
let operation;
let isFirstOperation = true;
let isAnOperationClicked = false;
let isOperationRecentlyClicked = false;
let isEqualsBtnClicked = false;
let areBtnsDisabled = false;
let isDotAlreadyEntered = false;

const DECIMAL_PLACES = 5;

buttonsContainer.addEventListener("click", isValidBtnInputForNumber);
clearBtn.addEventListener("click", clearInputScreen);
window.addEventListener("beforeunload", clearInputScreen);
addBtn.addEventListener("click", handleOperation);
subtractBtn.addEventListener("click", handleOperation);
multiplyBtn.addEventListener("click", handleOperation);
divideBtn.addEventListener("click", handleOperation);
equalsBtn.addEventListener("click", handleResult);
inputScreen.addEventListener("wheel", enableScreenVerticalScroll);
posnegBtn.addEventListener("click", toggleNumberSign);
sqrtBtn.addEventListener("click", handleSqrt);
backspaceBtn.addEventListener("click", handleBackspace);

toggleOperatorButtons();


function clearInputScreen() {
    inputScreen.value = "0";
    isFirstOperation = true;
    isAnOperationClicked = false;
    isOperationRecentlyClicked = false;
    isEqualsBtnClicked = false;
    isDotAlreadyEntered = false;
    num1 = num2 = result = 0;

    if (!areBtnsDisabled)
        toggleOperatorButtons();
}


function isValidBtnInputForNumber(event) {
    let target = event.target;
    
    // This is to prevent a weird bug where the regex
    // would capture all button texts if the container
    // was accidentally clicked, and in turn would return
    // 1 and display it on screen
    if (target.className === "input-buttons-container")
        return;
    
    const re = RegExp("[\\d.]+");
    let result = re.exec(target.textContent);
    
    if (result === null)
        return;

    
    if (isOperationRecentlyClicked || isEqualsBtnClicked) {
        if (event.target.id === "dot") 
            inputScreen.value = "0";
        else
            inputScreen.value = "";

        isOperationRecentlyClicked = false;
        isEqualsBtnClicked = false;
    }

    if (event.target.id !== "dot") {
        if (isInputScreenInInitialState())
            inputScreen.value = "";
        inputScreen.value += result[0];
    } else if (event.target.id === "dot" && !isDotAlreadyEntered) {
        isDotAlreadyEntered = true;  
        inputScreen.value += result[0];
    }

    if (addBtn.disabled)
        toggleOperatorButtons();
}



function handleResult() {
    if (!isAnOperationClicked)
        return;
    
    num2 = inputScreen.value;

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
    isEqualsBtnClicked = true;
    isDotAlreadyEntered = false;
}


function handleOperation(event) {
    toggleOperatorButtons();
    if (!isFirstOperation) {
        handleResult();
        num1 = result;
    } else {
        num1 = inputScreen.value;
    }
    isOperationRecentlyClicked = true; 
    isAnOperationClicked = true;
    isFirstOperation = false;
    isDotAlreadyEntered = false;

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
    // Has to be explicitly converted to not cause concatenation instead of 
    // arithmetic addition
    let result = (+a)+(+b);

    if (checkNumberOfDecimalPlaces(result) > DECIMAL_PLACES)
        return result.toFixed(DECIMAL_PLACES);

    return result;
}


function subtract(a, b) {
    let result = a-b;

    if (checkNumberOfDecimalPlaces(result) > DECIMAL_PLACES)
        return result.toFixed(DECIMAL_PLACES);

    return result;
}


function multiply(a, b) {
    let result = a*b;

    if (checkNumberOfDecimalPlaces(result) > DECIMAL_PLACES)
        return result.toFixed(DECIMAL_PLACES);

    return result;
}


function divide(a, b) {
    if (b === 0)
        return "NaN";

    let result = a/b;

    if (checkNumberOfDecimalPlaces(result) > DECIMAL_PLACES)
        return result.toFixed(DECIMAL_PLACES);

    return result;
}


function isInputScreenInInitialState() {
    return inputScreen.value === "0";
}


function enableScreenVerticalScroll(event) {
    event.preventDefault();
    event.target.scrollLeft += event.deltaY;
}


function toggleOperatorButtons() {
    areBtnsDisabled = areBtnsDisabled ? false: true;
    addBtn.disabled = addBtn.disabled ? false : true;
    subtractBtn.disabled = subtractBtn.disabled ? false : true;
    multiplyBtn.disabled = multiplyBtn.disabled ? false : true;
    divideBtn.disabled = divideBtn.disabled ? false : true;
    equalsBtn.disabled = equalsBtn.disabled ? false : true;
}


function checkNumberOfDecimalPlaces(num) {
    let numStrSeparatedByPoint = num.toString().split(".");

    if (numStrSeparatedByPoint.length > 1)
        return numStrSeparatedByPoint[1].length;
    
    return 0;
}


function toggleNumberSign() {
    let num = inputScreen.value;

    // To also handle a case where it displays '0.' in the screen
    if (num == 0)
        return;
    else if (num > 0) {
        inputScreen.value = `-${num}`;
    } else {
        inputScreen.value = num.slice(1);
    }
}


function handleSqrt() {
    let inputValue = +inputScreen.value;

    let result = Math.sqrt(inputValue);

    if (checkNumberOfDecimalPlaces(result) > DECIMAL_PLACES)
        inputScreen.value = result.toFixed(DECIMAL_PLACES);
    else
        inputScreen.value = result;

    isOperationRecentlyClicked = true;
}


function handleBackspace() {
    let inputText = inputScreen.value;

    if (inputText.length < 2)
        inputScreen.value = 0;
    else
        inputScreen.value = inputText.slice(0, inputText.length-1);
}