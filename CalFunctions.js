newLine = true;
var currentValue;
var value1;
var value2;
var currentOperator;


function digitBtnPressed(button){
    if(newLine){
        document.getElementById("inputBox").value = button;
        newLine = false; // Clear the input box for a new calculation
    }else {
        currentValue = document.getElementById("inputBox").value;
        document.getElementById("inputBox").value = currentValue + button;
    }
  
}

function btnACPressed(){
    document.getElementById("inputBox").value = 0; // Reset the input box
    newLine = true; // Allow a new calculation to start
}

function operatorBtnPressed(operator){
    currentOperator = operator;
    value1 = parseFloat(document.getElementById("inputBox").value);
    newLine = true; // Prepare for the next number input
}

function EqualsBtnPressed(){
    value2 = parseFloat(document.getElementById("inputBox").value);
    var finalTotal;;

    switch(currentOperator) {
        case '+':
            finalTotal = Add(value1, value2);
            break;
        case '-':
            finalTotal = Subtract(value1, value2);
            break;
        case '*':
            finalTotal = Multiply(value1, value2);
            break;
        case '/':
            finalTotal = Divide(value1, value2);
            break;
        default:
            alert("Invalid operator");
            return;
    }

    document.getElementById("inputBox").value = finalTotal; // Display the result
    newLine = true; // Allow a new calculation to start
    currentOperator = null; // Reset the operator
    value1 = null; // Reset the first value
}

function Add(a, b) {
    return a + b;
}

function Subtract(a, b) {
    return a - b;
}

function Multiply(a, b) {
    return a * b;
}

function Divide(a, b) {
    if (b === 0) {
        alert("Infinity");
        return null;
    }
    return a / b;
}

function getCurrentValue() {
    return parseFloat(document.getElementById("inputBox").value);
}

function setDisplay(value) {
    document.getElementById("inputBox").value = value;
}

function calculateSquareRoot() {
    let value = getCurrentValue();
    setDisplay(Math.sqrt(value));
}

function calculateSquare() {
    let value = getCurrentValue();
    setDisplay(value * value);
}

function calculateInverse() {
    let value = getCurrentValue();
    setDisplay(value !== 0 ? 1 / value : "Infinity");
}

function calculateSin() {
    let value = getCurrentValue();
    setDisplay(Math.sin(value * Math.PI / 180)); // degrees to radians
}

function calculateCos() {
    let value = getCurrentValue();
    setDisplay(Math.cos(value * Math.PI / 180));
}

function calculateTan() {
    let value = getCurrentValue();
    setDisplay(Math.tan(value * Math.PI / 180));
}

function calculateLog() {
    let value = getCurrentValue();
    setDisplay(Math.log10(value));
}

function calculateExp() {
    let value = getCurrentValue();
    setDisplay(Math.exp(value));
}

function calculatePower() {
    let base = getCurrentValue();
    let exponent = prompt("Enter exponent:");
    if (!isNaN(exponent)) {
        setDisplay(Math.pow(base, parseFloat(exponent)));
    } else {
        alert("Invalid exponent");
    }
}

function calculatePI() {
    setDisplay(Math.PI);
}