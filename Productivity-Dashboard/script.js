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

var taskinput = document.querySelector('input')
var taskdetails = document.querySelector('textarea')
var taskCheckbox = document.querySelector('#checkbox')
var form = document.querySelector('.addtask form')

form.addEventListener('submit',function(val){
    val.preventDefault()
    console.log(taskinput.value)
    console.log(taskdetails.value)
    console.log(taskCheckbox.checked);
    
})