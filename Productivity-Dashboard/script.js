var elems = document.querySelectorAll('.elem')
var elementFullScreen = document.querySelectorAll('.fullelem')
var fullElemBack = document.querySelectorAll('.fullelem .back')
elems.forEach(function (card) {
    card.addEventListener('click', function () {
        elementFullScreen[card.id].style.display = 'block'
    })
})

fullElemBack.forEach(function (back) {
    back.addEventListener('click', function () {
        elementFullScreen[back.id].style.display = 'none'
    })
})


function todo() {
    var currentTasks = []
    if (localStorage.getItem('currentTasks')) {
        currentTasks = JSON.parse(localStorage.getItem('currentTasks'))
    } else {
        console.log("List is empty");

    }


    var taskinput = document.querySelector('input')
    var taskdetails = document.querySelector('textarea')
    var taskCheckbox = document.querySelector('#checkbox')
    var form = document.querySelector('.addtask form')

    form.addEventListener('submit', function (val) {
        val.preventDefault()

        currentTasks.push({ task: taskinput.value, details: taskdetails.value, imp: taskCheckbox.checked })
        renderTask()
        taskinput.value = ''
        taskdetails.value = ''
        taskCheckbox.checked = false
    })

    function renderTask() {

        var alltask = document.querySelector('.alltask')
        var sum = '';
        currentTasks.forEach(function (val, idx) {
            sum += `<div class="task">
                        <h2>${val.task} <span class="${val.imp}">imp</span></h2>
                        <button id = ${idx}>Mark as completed</button>
                    </div>`
        })

        alltask.innerHTML = sum
        localStorage.setItem('currentTasks', JSON.stringify(currentTasks))
        var compBtn = document.querySelectorAll('.task button')
        compBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTasks.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

}
todo()

function dailyPlanner(){
    var times = Array.from({ length: 18 }, function (ele, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`
})

var wholeSum = ''
var dayPlanner = document.querySelector('.day-planner')
let dayplanData = JSON.parse(localStorage.getItem('dayplanData')) || {}


times.forEach(function (elem, idx) {
    var savedData = dayplanData[idx]||'';

    wholeSum += `<div class="dayPlanner-time">
                    <p>${6 + idx}:00 - ${7 + idx}:00</p>
                    <input type="text" name=""  placeholder="..." id="${idx}" value = ${savedData}>
                </div>`
})

dayPlanner.innerHTML = wholeSum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function (elem) {
    elem.addEventListener('input', function () {
        dayplanData[elem.id] = elem.value
        console.log(dayplanData);
        localStorage.setItem('dayplanData',JSON.stringify(dayplanData))
    })
    
})
}

dailyPlanner()


