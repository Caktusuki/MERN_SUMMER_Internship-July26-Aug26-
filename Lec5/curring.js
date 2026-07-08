//curring is a technique in functional programming where a function is transformed into a sequence of functions
let add = function(x){
    return function(y){
        return x+y;
    }
}

let add5 = add(5);
console.log(add5(10)); // Output: 15