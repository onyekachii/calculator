/*
value: temporarily stores the inputted value before a mathematical operator is activated.
operator: this indicates the type of mathemtical operator that is active. */
var value = "", operator = "";

/*
evaluatedValue: The final evaluated value is stored here.
displayMsg: This is displays a message when the assignment operator is clicked twice after evaluation is complete. */
var evaluatedValue, displayMsg;

//<<<<<<<<<<<<<<<<<<< EVENT LISTENERS FOR KEYBOARD & SCREEN TOUCH INPUTS >>>>>>>>>>>>>>>>>>>>>
var arrayKey = ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

var keyboardInput = (() => {
    document.addEventListener('keydown', function(e){
        let keyPressed = e.key;
        if (arrayKey.includes(keyPressed)) {
            value += e.key;
        }
        if (e.key=="."){
            //if "." is already typed, error message is thrown
            (value.includes(".")) ? alert("Invalid entry"): value = value + ".";
        }
        //jQuery: changes the operators color back to default when an input is made
        $(".opr").css("background-color","darkorange");
        return display();
    })
}); keyboardInput();
    
var screenTouchInput = (() => {
    $(".numb").click( function () {
        let numId = this.id;
        if (arrayKey.includes(numId)) {
            value += numId;
        }
        if (this.id=="."){
            (value.includes(".")) ? alert("Invalid entry"): value = value + ".";
        }
        $(".opr").css("background-color","darkorange");
        return display();
    })
}); screenTouchInput();

var clearScreen = (() => {
    //restores to default
    $("#clear").click( function() {
        reset();
        $("#plus, #minus, #multiply, #modulo, #equa").css("background-color","darkorange");
    })
}); clearScreen();

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OPERATOR LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function modulo() {
    evaluatedValue = evaluatedValue/100;
    value="";
}

function plus(x) {
    let a = evaluatedValue;
    let b = Number(value);
    evaluatedValue = a+b;
    value = "";
}

function minus() {
    let a = evaluatedValue;
    let b = Number(value);
    value = "";
    evaluatedValue = a-b;
    return evaluatedValue;
}

function multiply() {
    a = evaluatedValue;
    b = Number(value);
    value = "";
    evaluatedValue = a*b;
    return evaluatedValue; 
}

function divide() {
    a = evaluatedValue;
    b = Number(value);
    value = "";
    evaluatedValue = a/b;
    return evaluatedValue;
}

function minplus() {
    if(evaluatedValue){
        evaluatedValue = 0 - evaluatedValue;
    }else{
        evaluatedValue = 0 - Number(value)
    }
}

function equalTo(){
    $("#equa").css("background-color","red");
    $("#plus, #minus, #multiply, #modulo, #divide").css("background-color","darkorange");
    if (operator == "") {
        evaluatedValue = Number(value);
    }else if (operator == "minus") {
        minus();
    }else if (operator == "multiply") {
        multiply();
    }else if (operator == "divide") {
        divide();
    }else if (operator == "plus") {
        plus();
    }else if (operator == "modulo") {
        modulo();
    /* if assignment operator has been clicked more than twice, 
    this code block prevents the "your answer is ..." message from rendering in the DOM twice rather a popup re-occurs. */
    }else if (evaluatedValue == displayMsg && operator == "equa"){ 
        alert(evaluatedValue);
    //for a display message; the "=" operator is clicked twice.
    }else {
        displayMsg = document.getElementById("show").innerHTML = `Anwser = ${evaluatedValue}.`;
        evaluatedValue = displayMsg;
    }
    operator="equa";
}

function reset() {
    displayMsg= undefined;
    evaluatedValue= undefined;
    value="";
    operator="";
    document.getElementById("show").innerHTML="";
    document.getElementById("code").innerHTML="";
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OTHERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// display(): displays the inputted value as soon as it is keyed in.
function display(){
    let code = document.getElementById("code");
    code.textContent = value;
}

// evaluate(): evaluates for all other arithmetic operators aside "=" and "-/+".
function evaluate(operatorId) {
    //if the user previously used the "=" more than thrice and then clicks any other operator, reset() function is run.
    if (displayMsg && operator == "equa"){
        reset();
    }
    $(".opr").css("background-color", "darkorange");
    $(`#${operatorId}`).css("background-color", "red");
    if (operator == "" && operatorId == "modulo") {
        evaluatedValue = Number(value)/100;
        value ="";
    }else if (operator == "modulo") {
        modulo();
    }else if (operator == "") {
        evaluatedValue = Number(value);
        value = "";
    }
    else if (operator == "minus") {
        minus();
    }else if (operator=="plus"){
        plus(x);
    }else if (operator == "multiply") {
        multiply();
    }else if (operator == "divide") {
        divide();
    }else if (operator == "equa") {
        if ( operatorId == "modulo" ) {
            let valueCollector = evaluatedValue;
            value = "";
            evaluatedValue = valueCollector/100;
        }else {
            let a = evaluatedValue;
            value = "";
            evaluatedValue = a;
        }          
    }
    operator = operatorId;
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EVENT LISTENERS THAT RUNS EVALUATING LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var evaluatingListenerTouch = (() => {
    $(".opr").click(function(){ 
        if (this.id == "equa"){
            equalTo();
        }else if (this.id == "minplus"){
            minplus();
        }else {
            let a = this.id;
            evaluate(a);
        }
        document.getElementById("show").innerHTML= evaluatedValue; 
    })
}); evaluatingListenerTouch();

var evaluatingListenerKey = (() => {
    document.addEventListener('keydown', function(e){
        if (e.key == "=" || e.key == "Enter"){
            equalTo();
            document.getElementById("show").innerHTML= evaluatedValue;
        } else if (e.key == "%" || e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
            let a;
            if (e.key == "%") {
                a = "modulo";
            }else if (e.key == "+") {
                a = "plus";
            }else if (e.key == "-") {
                a = "minus";
            }else if (e.key == "*") {
                a = "multiply";
            }else if (e.key == "/") {
                a = "divide";
            }
            evaluate(a);    
            document.getElementById("show").innerHTML= evaluatedValue;       
        }        
    })
}); evaluatingListenerKey();