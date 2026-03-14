var img = document.querySelector('img')
var like = document.querySelector('i')
img.addEventListener('dblclick',function(){
    like.style.transform = "translate(-50%,-50%) scale(1) rotate(0deg)"
})
setTimeout(() => {
    like.style.transform = "translate(-50%,-300%) scale(1) rotate(0deg)"
    like.style.opacity = 0
}, 2500);

setTimeout(() => {
    like.style.opacity = 0 
}, 2800);
setTimeout(() => {
    like.style.transform = "translate(-50%,-50%) scale(0) rotate(-50deg)"
}, 3000);