console.log(x); /// undefined
//hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase. This means that you can reference variables and functions before they are actually declared in the code. However, only the declarations are hoisted, not the initializations. In this example, the variable x is hoisted, so it exists when we first log it, but its value is undefined until it is assigned 10 later in the code.
var x = 10;

console.log(x); // 10


hello(); 

function hello(){
    console.log("hellooo");
}

hello(); // hellooo