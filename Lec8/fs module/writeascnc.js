const fs = require('fs');

let filename = "song2.txt";

console.log("file is being created ....");

fs.writeFile(filename, "hello world" , (err)=>{
    if(err) throw err ;
    
    console.log('file written successfully');
})


console.log('i m another print statement ')

console.log('i m another print statement ')
console.log('i m another print statement ')
console.log('i m another print statement ')
console.log('i m another print statement ')
console.log('i m another print statement ')
console.log('i m another print statement ')