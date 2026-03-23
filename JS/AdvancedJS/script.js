class User{
    constructor(name,email){
        this.name = name,
        this.email = email
    }
    loggedIn(){
        console.log("user logged in")
    }
}
// var user = {
//     name : "Ayush",
//     email : "star@gmail.com",

//     login : function(){
//     console.log("user logged in");
    
// }
// }

let user1 = new User("Ayush","ayush@gmail.com")
let user2 = new User("Star","star@gmail.com")
let user3 = new User("harsh","harsh@gmail.com")

class Car{
    constructor(speed,brand){
        this.speed = speed,
        this.brand = brand
    }

    drive(){
        return this.brand + this.speed
    }
}

let car1 = new Car("100","honda")
let car2 = new Car("120","Tata")