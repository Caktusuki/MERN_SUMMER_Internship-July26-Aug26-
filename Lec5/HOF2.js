function getfun(){
    function hello(){
        console.log("hello");
    }

    return hello;

    // let x=10;
    // return x;
}

let fun = getfun();
fun();