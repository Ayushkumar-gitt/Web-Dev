var btn = document.querySelector("button")
var inner = document.querySelector('.inner')
var h1 = document.querySelector('h1')
var grow = 0
btn.addEventListener('click',function(){
    btn.style.pointerEvents = 'none';
    var int = setInterval(() => {
        grow++;
        h1.innerHTML = grow + "%"
        inner.style.width = grow+'%'
    },50);
    
    setTimeout(() => {
        clearInterval(int)
        btn.innerHTML = "Downloaded"
        btn.style.opacity = 0.5
    }, 5000);
})