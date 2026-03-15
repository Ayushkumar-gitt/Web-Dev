var cursor = document.querySelector("#cursor")
var body = document.querySelector('body')
body.addEventListener('mousemove',function(val){
    cursor.style.left = val.x+'px'
    cursor.style.top = val.y+'px'
})