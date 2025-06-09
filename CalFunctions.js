let expression = "";
let newLine = true;

function digitBtnPressed(digit) {
    expression = newLine && !expression.endsWith("(") ? digit.toString() : expression + digit;
    updateDisplay(expression);
    newLine = false;
}

function operatorBtnPressed(op) {
    if (!newLine) expression += op;
    updateDisplay(expression);
    newLine = false;
}

function sciFunc(funcName) {
    expression += funcName + "(";
    updateDisplay(expression);
    newLine = false;
}

function EqualsBtnPressed() {
    try {
        expression = autoCloseBrackets(expression);
        const result = evalSciExpression(expression);
        updateDisplay(result);
        expression = result.toString();
    } catch (e) {
        updateDisplay("Error");
        expression = "";
    }
    newLine = true;
}

function btnACPressed() {
    expression = "";
    updateDisplay("0");
    newLine = true;
}

function autoCloseBrackets(expr) {
    const open = (expr.match(/\(/g) || []).length;
    const close = (expr.match(/\)/g) || []).length;
    return expr + ")".repeat(open - close);
}

function insertMultiplication(expr) {
    const functions = ["sin", "cos", "tan", "log", "exp", "sqrt", "pi"];
    let result = "";

    for (let i = 0; i < expr.length; i++) {
        result += expr[i];
        for (let func of functions) {
            if (expr.substring(i + 1, i + 1 + func.length) === func && /[\d)]/.test(expr[i])) {
                result += "*";
                break;
            }
        }
    }
    return result;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

function evalSciExpression(expr) {
    expr = insertMultiplication(expr)
        .replace(/sin\(([^)]+)\)/g, "Math.sin(toRad($1))")
        .replace(/cos\(([^)]+)\)/g, "Math.cos(toRad($1))")
        .replace(/tan\(([^)]+)\)/g, "Math.tan(toRad($1))")
        .replace(/log\(([^)]+)\)/g, "Math.log10($1)")
        .replace(/exp\(([^)]+)\)/g, "Math.exp($1)")
        .replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)")
        .replace(/pi/g, "Math.PI");

    return eval(expr);
}

function updateDisplay(value) {
    document.getElementById("inputBox").value = value;
}

function getCurrentValue() {
    return parseFloat(document.getElementById("inputBox").value);
}

function calculateSquareRoot() {
    expression = `sqrt(${expression})`;
    updateDisplay(expression);
    newLine = false;
}

function calculateSquare() {
    expression = `(${expression})**2`;
    updateDisplay(expression);
    newLine = false;
}

function calculateInverse() {
    if (!expression.trim() || newLine) {
        // User pressed Inverse as the first input
        expression = "1/(";
        updateDisplay(expression);
        newLine = false;
        return;
    }

    // Otherwise, treat it as wrapping the current expression
    const inverseExpr = `1/(${autoCloseBrackets(expression)})`;

    try {
        const result = evalSciExpression(inverseExpr);
        updateDisplay(!isFinite(result) ? "Infinity" : result);
        expression = result.toString();
    } catch (e) {
        updateDisplay("Error");
        expression = "";
    }

    newLine = true;
}

function calculatePower() {
    expression += "**";
    updateDisplay(expression);
    newLine = false;
}

function calculatePI() {
    expression += "pi";
    updateDisplay(expression);
    newLine = false;
}
