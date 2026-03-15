const people = [
  {
    fullName: "Aarav Sharma",
    age: 28,
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    profession: "Software Engineer"
  },
  {
    fullName: "Priya Verma",
    age: 25,
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    profession: "Graphic Designer"
  },
  {
    fullName: "Rohan Mehta",
    age: 32,
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    profession: "Data Scientist"
  },
  {
    fullName: "Ananya Gupta",
    age: 27,
    city: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    profession: "Marketing Manager"
  },
  {
    fullName: "Karan Patel",
    age: 30,
    city: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    profession: "Entrepreneur"
  }
];
var htmlforcard = ""
people.forEach(function(val){
    htmlforcard+=`<div class="card">
        <img src="${val.image}" alt="">
        <h2 id="name">${val.fullName}</h2>
        <h4 id="city">City : ${val.city}</h4>
        <h4 id="age">Age : ${val.age}</h4>
        <h4 id="profession">Prof. : ${val.profession}</h4>
        <p id="desc">A talented social media content creator</p>
    </div>`
})
var body = document.querySelector('body')
console.log(htmlforcard);

body.innerHTML = htmlforcard
