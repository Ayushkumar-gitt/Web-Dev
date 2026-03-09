// console.log("hey")
function sayHello(){
    console.log("Hello js")
}
sayHello()

function add(a,b){
    console.log(a+b)
    return a+b;
}

add(2,9)

function guest(guest = "Ayush"){
    console.log(`hi ${guest}`)
}
guest()
let ans = 0;
function unlin(...number){
    // number.forEach(function(val){ // Both loops doing same work
    //     ans += val
    // })
    for(let i = 0;i<number.length;i++){
        ans += number[i]
    }
}
// unlin(1,2,3,4,5)
// console.log(ans)

( function () {
    console.log("Ayush")
})();

// if (10 > 5 || 10 < 20 || 10 === 10) {
//     console.log("true")
// }

// console.log(5 | 1)
// test()
// function test() { console.log("Hello world") }

// // let age = parseInt(prompt("Enter your age"))

// // if(age>=18){
// //     console.log("Adult")
// // }else{
// //     console.log("Minor")
// // }


// let score = 30
// score > 35 ? console.log("Pass") : console.log("Fail")

// let vall = parseInt(prompt("Enter number"))

// switch (vall) {
//     case 1:
//         console.log("Sunday")
//         break;
//     case 2:
//         console.log("Monday")
//         break;
//     case 3:
//         console.log("Wednesday")
//         break;
//     default:
//         console.log("Wrong input")
//         break;
// }
