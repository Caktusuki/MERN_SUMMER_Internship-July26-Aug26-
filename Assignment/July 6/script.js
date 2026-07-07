// Convert cel to fahrenheit
cel=25
function celToFah(cel) {
    let fah = (cel * 9/5) + 32;
    return fah;
}
fah = celToFah(cel);
console.log(fah);

// Swap two no using third variable
function swapWithThird(a, b) {
    let temp = a;
    a = b;
    b = temp;
    return [a, b];
}
let x=5, y=10;
[x, y] = swapWithThird(x, y);
console.log(x, y);
// swap two no without using third no 
function swap(a, b) {
    a=a + b;
    b=a - b;
    a=a - b;
    return [a, b];
}
let a=5, b=10;
[a, b] = swap(a, b);
console.log(a, b);
// Calculate Simple interest
function simpleInterest(principal, rate, time) {
    let interest = (principal * rate * time) / 100;
    return interest;
}
let principal=1000, rate=5, time=2;
let interest = simpleInterest(principal, rate, time);
console.log(interest);

// Calculate total and average marks . you have an array of 10 size of marks 
function calculateTotalAndAverage(marks) {
    let total = marks.reduce((sum, mark) => sum + mark, 0);
    let average = total / marks.length;
    return { total, average };
}
let marks = [85, 92, 78, 96, 88, 91, 84, 89, 93, 87];
let { total, average } = calculateTotalAndAverage(marks);
console.log(total, average);

// find greatest among 5 no 
function findGreatest(a, b, c, d, e) {
    let greatest = a;
    if (b > greatest) greatest = b;
    if (c > greatest) greatest = c;
    if (d > greatest) greatest = d;
    if (e > greatest) greatest = e;
    return greatest;
}
let num1=10, num2=20, num3=15, num4=25, num5=5;
let max = findGreatest(num1, num2, num3, num4, num5);
console.log(max);

// check whether a no is even or odd 
function isEven(num) {
    return num % 2 === 0;
}
let number=10;
console.log(isEven(number));
/* calculate salary 
salary is divided into three parts HRA , DA , Basic so salary formula will be basic+ HRA + DA */
function calculateSalary(basic, hra, da) {
    let salary = basic + hra + da;
    return salary;
}
let basic=50000, hra=20000, da=15000;
let salary = calculateSalary(basic, hra, da);
console.log(salary);
// Reverse a no using while loop 
//  123 -> 321
function reverseNumber(num) {
    let reversed = 0;
    while (num > 0) {
        let digit = num % 10;
        reversed = reversed * 10 + digit;
        num = Math.floor(num / 10);
    }
    return reversed;
}
let numberToReverse=123;
let reversedNumber = reverseNumber(numberToReverse);
console.log(reversedNumber);
// chech whether a no is pallindrome or not  121 -> true 
function isPalindrome(num) {
    let original = num;
    let reversed = 0;
    while (num > 0) {
        let digit = num % 10;
        reversed = reversed * 10 + digit;
        num = Math.floor(num / 10);
    }
    return original === reversed;
}
let palindromeNumber=121;
console.log(isPalindrome(palindromeNumber));
// Count digits in a NUMBER 
// ex-> 123 output -> 3
function countDigits(num) {
    let count = 0;
    while (num > 0) {
        num = Math.floor(num / 10);
        count++;
    }
    return count;
}
let numberToCount=123;
console.log(countDigits(numberToCount));
/* design patterns 
    1.  * * * *
        * * * *
        * * * *
        * * * *
   
    2.  *
        * *
        * * *
        * * * *
   
    3.  1
        2 2
        3 3 3
        4 4 4 4 
func
    4.  1
        2 3
        4 5 6 
        7 8 9 10
*/
 function printPattern1(rows) {
        for (let i = 0; i < rows; i++) {
            let pattern = '';
            for (let j = 0; j < rows; j++) {
                pattern += '* ';
            }
            console.log(pattern.trim());
        }
    }
        // --------------------------------------------------------------------------------

    printPattern1(4);
     function printPattern2(rows) {
        for (let i = 0; i < rows; i++) {
            let pattern = '';
            for (let j = 0; j <= i; j++) {
                pattern += '* ';
            }
            console.log(pattern.trim());
        }
    }
        // --------------------------------------------------------------------------------

    printPattern2(4);
     function printPattern3(rows) {
        for (let i = 0; i < rows; i++) {
            let pattern = '';
            for (let j = 0; j <= i; j++) {
                pattern += '' + (i + 1) + ' ';
            }
            console.log(pattern.trim());
        }
    }
    printPattern2(4);
        // --------------------------------------------------------------------------------

    printPattern3(4);
     function printPattern4(rows) {
        let num = 1;
        for (let i = 0; i < rows; i++) {
            let pattern = '';
            for (let j = 0; j <= i; j++) {
                pattern += '' + num + ' ';
                num++;
            }
            console.log(pattern.trim());
        }
    }
    printPattern4(4);
          
 
// find maximum and minimum in an array 
function findMaxAndMin(arr) {
    let max = arr[0];
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return { max, min };
}
let array=[5, 10, 3, 8, 2];
let { max, min } = findMaxAndMin(array);
console.log(max, min);
// Left shift and right shift of an array 
function leftShift(arr) {
    let firstElement = arr.shift();
    arr.push(firstElement);
    return arr;
}
function rightShift(arr) {
    let lastElement = arr.pop();
    arr.unshift(lastElement);
    return arr;
}
let arrayToShift=[1, 2, 3, 4, 5];
console.log(leftShift(arrayToShift));
console.log(rightShift(arrayToShift));