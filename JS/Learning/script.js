// console.log("hey")
if (10 > 5 || 10 < 20 || 10 === 10) {
    console.log("true")
}

console.log(5 | 1)
test()
function test() { console.log("Hello world") }

// let age = parseInt(prompt("Enter your age"))

// if(age>=18){
//     console.log("Adult")
// }else{
//     console.log("Minor")
// }


let score = 30
score > 35 ? console.log("Pass") : console.log("Fail")

let vall = parseInt(prompt("Enter number"))

switch (vall) {
    case 1:
        console.log("Sunday")
        break;
    case 2:
        console.log("Monday")
        break;
    case 3:
        console.log("Wednesday")
        break;
    default:
        console.log("Wrong input")
        break;
}
