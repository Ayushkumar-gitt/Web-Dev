var team = [
    {
        team:"CSK",
        primary:"yellow",
        secondary :"blue",
    },
    {
        team:"MI",
        primary:"blue",
        secondary :"black",
    },
    {
        team:"RCB",
        primary:"red",
        secondary :"black",
    },
    {
        team:"RR",
        primary:"pink",
        secondary :"magenta",
    }
]
var btn = document.querySelector('button')
var h1 = document.querySelector('h1')
var main = document.querySelector('main')
var body = document.querySelector('body')
btn.addEventListener('click',function(){
    var idx = Math.floor(Math.random()*team.length)
    h1.innerHTML = team[idx].team
    main.style.backgroundColor = team[idx].primary
    body.style.backgroundColor = team[idx].secondary
})