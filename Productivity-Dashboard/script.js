var elems = document.querySelectorAll('.elem')
var elementFullScreen = document.querySelectorAll('.fullelem')
var fullElemBack = document.querySelectorAll('.fullelem .back')

elems.forEach(function (card) {
    card.addEventListener('click',function(){
        elementFullScreen[card.id].style.display = 'block'
    })    
})

fullElemBack.forEach(function (back) {
    back.addEventListener('click',function () {
        elementFullScreen[back.id].style.display = 'none'
    })
})