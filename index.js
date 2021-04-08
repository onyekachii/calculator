/*
Contents
1. Variable Declaration
2. Event Listeners for inputs
    2.1 for keyboard inputs
    2.2 for click inputs
    2.3 clear command
3. Functions
4. Evaluation
    4.1 via click events
    4.2 via keyboard inputs
*/

//////////////////////////////
//  1. Variable declaration
    var a, b;
    var value="";
    var evaluatedValue;
    var operator="";
    var displayMsg;
//////////////////////////////

//////////////////////////////
//  2. Event listeners for inputs...

    //  2.1 ...for keyboard inputs
            document.addEventListener('keydown', function(e){
                if (e.key==1){
                    value+= "1";
                }
                if (e.key=="2"){
                    value= value + "2";
                }
                if (e.key=="3"){
                    value= value + "3";
                }
                if (e.key=="4"){
                    value= value + "4";
                }
                if (e.key=="5"){
                    value= value + "5";
                }
                if (e.key=="6"){
                    value= value + "6";
                }
                if (e.key=="7"){
                    value= value + "7";
                }
                if (e.key=="8"){
                    value= value + "8";
                }
                if (e.key=="9"){
                    value= value + "9";
                }
                if (e.key=="0"){
                    value= value + "0";
                }
                if (e.key=="."){
                    if (value.includes(".")) { //if "." is already typed, error message is thrown
                        alert("Invalid entry");
                    }
                    else{
                        value= value + ".";
                    }
                }
                $(".opr").css("background-color","darkorange"); //jQuery: changes the operators color back to default when an input is made
                return display();
            })
    
    //  2.2 ...for click inputs
            $(".numb").click( //jQuery
                function(){
                    if (this.id=="1"){
                        value= value + "1";
                    }
                    if (this.id=="2"){
                        value= value + "2";
                    }
                    if (this.id=="3"){
                        value= value + "3";
                    }
                    if (this.id=="4"){
                        value= value + "4";
                    }
                    if (this.id=="5"){
                        value= value + "5";
                    }
                    if (this.id=="6"){
                        value= value + "6";
                    }
                    if (this.id=="7"){
                        value= value + "7";
                    }
                    if (this.id=="8"){
                        value= value + "8";
                    }
                    if (this.id=="9"){
                        value= value + "9";
                    }
                    if (this.id=="0"){
                        value= value + "0";
                    }
                    if (this.id=="."){
                        if (value.includes(".")) {
                            alert("Invalid entry");
                        }
                        else{
                            value= value + ".";
                        }
                    }
                    $(".opr").css("background-color","darkorange");
                    return display();
                }
            )
    //2.3 clear command
            $("#clear").click( function(){
                a= undefined;
                b= undefined;
                value="";
                evaluatedValue= undefined;
                operator="";
                displayMsg= undefined;
                document.getElementById("code").innerHTML="";
                document.getElementById("show").innerHTML= "";
                $("#plus, #minus, #multiply, #modulo, #equa").
                css("background-color","darkorange");
            })

//////////////////////////////

//////////////////////////////
//  3. Functions
    function modulo(){
        a=evaluatedValue;
        value="";
    }
    function moduloB() { 
        //activates background color of operator as active
        $("#modulo").css("background-color","darkgrey"); //jQuery: ...background color change indictes it is active
        //deactivates background-color as active
        $("#plus, #minus, #multiply, #equa, #divide"). 
        css("background-color","darkorange"); //jQuery: ...other operator buttons retore to default
        //then...
        if (operator==""){ // ... when clicking for the first time
            a= Number(value); // var a, collects the strings contained in "value" container and converts it to number
            value=""; // value becomes empty
            evaluatedValue= a/100; 
            operator="modulo"; // modulo operator becomes active
        }else if (operator=="minus"){ //.. if minus operator is active
            minus();
            operator="modulo";
        }else if (operator=="multiply"){
            multiply();
            operator= "modulo";
        }else if (operator=="divide"){
            divide();
            operator="modulo";
        }else if (operator=="plus"){
        plus();
        operator="modulo";
        }else if (operator=="equa"){
            a= evaluatedValue;
            value="";
            evaluatedValue= a/100;
            operator= "modulo";
        }
    }
    function equalTo(){
        $("#equa").css("background-color","darkgrey");
        $("#plus, #minus, #multiply, #modulo, #divide").
        css("background-color","darkorange");

        if(operator==""){
            evaluatedValue= Number(value);
        }else if (operator=="minus"){
            minus();
            operator="equa";
        }else if (operator=="multiply"){
        multiply();
        operator= "equa";
        }else if (operator=="divide"){
            divide();
            operator="equa";
        }else if (operator=="plus"){
            plus();
            operator="equa";
        }else if (operator=="modulo"){
            modulo();
            operator="equa";
        }else if (evaluatedValue== displayMsg && operator=="equa"){ 
            alert(evaluatedValue);
            /* when assignment/equalTo operator has already be clicked and the user clicks it again, 
            this code block prevents the "your answer is ..." message from rendering in the DOM twice
            rather a popup occurs.*/
        }else{
            displayMsg=document.getElementById("show").innerHTML= `your anwser is ${evaluatedValue}.`;
            evaluatedValue=displayMsg;
            //for a display message
        }
    }
    function equalToB(){ //sets to all variable to default when any arithmetic operator is clicked after the equal sign has been clicked twice
        displayMsg= undefined;
        evaluatedValue= undefined;
        value="";
        operator="";
        document.getElementById("show").innerHTML="";
        document.getElementById("code").innerHTML="";
    }
    function display(){
        let tag=document.getElementById("code");
        let display= tag.textContent= value;
        console.log(display);
        // the input temporarily stored in the value variable is sent to DOM for display
    }
    function plus (){
        b=Number(value);
        a=evaluatedValue;
        evaluatedValue= a+b;
        value="";
        return evaluatedValue;          
    }
    function plusB(){
        if (displayMsg && operator=="equa"){
            equalToB();
        }
        $("#plus").css("background-color","darkgrey");
        $("#equa, #minus, #multiply, #modulo, #divide").
        css("background-color","darkorange");
        if(operator==""){
            a=Number(value);
            b=0;
            value="";
            evaluatedValue= a+b;
            operator="plus";
        }else if (operator=="minus"){
            minus();
            operator="plus";
        }else if (operator=="multiply"){
            multiply();
            operator= "plus";
        }else if (operator=="divide"){
            divide();
            operator="plus";
        }else if (operator=="modulo"){
            modulo();
            operator="plus";
        } else if (operator=="equa"){
            a= evaluatedValue;
            b=0;
            value="";
            evaluatedValue= a+b;
            operator= "plus";
        }else {
            plus();
            operator="plus"; 
        }
    }
    function minus (){
        b= Number(value);
        a= evaluatedValue;
        value="";
        evaluatedValue= a-b;
        return evaluatedValue; 
    }
    function minusB(){
        if (displayMsg && operator=="equa"){
            equalToB();
        }
        $("#minus").css("background-color","darkgrey");
        $("#plus, #equa, #multiply, #modulo, #divide").
        css("background-color","darkorange");
        if (operator==""){
            a= Number(value);
            b=0;
            value="";
            evaluatedValue= a-b;
            operator="minus";
        }else if (operator=="plus"){
            plus();
            operator="minus";
        }else if (operator=="multiply"){
            multiply();
            operator= "minus";
        }else if (operator=="divide"){
            divide();
            operator="minus";
        }else if (operator=="modulo"){
            modulo();
            operator="minus";
        }else if (operator=="equa"){
            a= evaluatedValue;
            b=0;
            value="";
            evaluatedValue= a-b;
            operator= "minus";
        } else{
            minus();
            operator="minus";
        }       
    }
    function multiply (){
        b= Number(value);
        a=evaluatedValue;
        value="";
        evaluatedValue= a*b;
        return evaluatedValue; 
    }
    function multiplyB(){
        if (displayMsg && operator=="equa"){
            equalToB();
        }
        $("#multiply").css("background-color","darkgrey");
        $("#plus, #minus, #equa, #modulo, #divide").
        css("background-color","darkorange");
        if (operator==""){
            a= Number(value);
            b=1;
            value="";
            evaluatedValue= a*b;
            operator="multiply";
        }else if (operator=="plus"){
            plus();
            operator="multiply";
        }else if (operator=="minus"){
            minus();
            operator="multiply";
        }else if (operator=="divide"){
            divide();
            operator="multiply";
        }else if (operator=="modulo"){
            modulo();
            operator="multiply";
        }else if (operator=="equa"){
            a= evaluatedValue;
            b=1;
            value="";
            evaluatedValue= a*b;
            operator= "multiply";
        }else{
            multiply();
            operator= "multiply";
        }
    }
    function divide (){
        b= Number(value);
        a=evaluatedValue;
        value="";
        evaluatedValue=a/b;
        return evaluatedValue;
    }
    function divideB(){
        if (displayMsg && operator=="equa"){
            equalToB();
        }
        $("#divide").css("background-color","darkgrey");
        $("#plus, #minus, #multiply, #modulo, #equa").
        css("background-color","darkorange");
        if (operator==""){
            a= Number(value);
            b=1;
            value="";
            evaluatedValue=a/b;
            operator= "divide";
        }else if (operator=="plus"){
            plus();
            operator="divide";
        }else if (operator=="minus"){
            minus();
            operator="divide";
        }else if (operator=="multiply"){
            multiply();
            operator= "divide";
        }else if (operator=="equa"){
            a= evaluatedValue;
            b=1;
            value="";
            evaluatedValue= a/b;
            operator= "divide";
        }else if (operator=="modulo"){
            modulo();
            operator="divide";
        }else {
            divide();
            operator="divide";
        }
    }
////////////////////////////////

////////////////////////////////
//  4. Evaluation

    //  4.1 via clicks
        $(".opr").click(function(){ //jQuery

            // if "%" is clicked...
            if (this.id=="modulo"){ 
                moduloB();
            }

            //if "=" is clicked...
            if (this.id=="equa"){
                equalTo();
            }

            //if "+" is clicked...
            if (this.id=="plus"){
                plusB();
            }

            //if "-" is clicked...
            if (this.id=="minus"){
                minusB();
            }

            //if "*" is clicked...
            if (this.id=="multiply"){
                multiplyB();
            }
            
            //if "/" is clicked...
            if (this.id=="divide"){
                divideB();
            }

            //if "-/+" is clicked...
            if (this.id=="minplus"){
                if(evaluatedValue){
                    evaluatedValue=0-evaluatedValue;
                }else{
                    evaluatedValue= 0 - Number(value)
                }
            }
            document.getElementById("show").innerHTML= evaluatedValue; 
            return console.log(evaluatedValue);
        })

        //  4.2 via keyboard inputs
        document.addEventListener('keydown', function(e){
            if (e.key=="%"){
                moduloB();
                return document.getElementById("show").innerHTML= evaluatedValue;
            }

            if (e.key=="=" || e.key=="Enter"){
                equalTo();
                return document.getElementById("show").innerHTML= evaluatedValue;
            }
            if (e.key=="+"){
                plusB;
                return document.getElementById("show").innerHTML= evaluatedValue;
            }
            if (e.key=="-"){
                minusB();
                return document.getElementById("show").innerHTML= evaluatedValue;
            }
            if (e.key=="*"){
                multiplyB();
                return document.getElementById("show").innerHTML= evaluatedValue;
            }
            if (e.key=="/"){
                divideB();
                return document.getElementById("show").innerHTML= evaluatedValue;
            }
        })
