// let codelang=[ "JavaScript", "Python", "C++", "Java", "C#", "Ruby", "Go", "Swift", "Kotlin", "PHP"];
//     // for (let key in codelang) {
//     //     console.log(codelang[key]);
//     // }
//     //for-each
//     codelang.forEach(function (item){
//         console.log(item);
//     });
let employee = [
  { "id": 1, "name": "John",  "basic_salary": 30000, "hra": 18000, "da": 12000},
  { "id": 2, "name": "Jane",  "basic_salary": 25000, "hra": 15000, "da": 10000 },
  { "id": 3, "name": "Bob",   "basic_salary": 35000, "hra": 21000, "da": 14000},
  { "id": 4, "name": "Alice", "basic_salary": 27500, "hra": 16500, "da": 11000}
]
employee.forEach((emp) => {

console.log(emp.name)

console.log(emp.basic_salary + emp.hra + emp.da)

})