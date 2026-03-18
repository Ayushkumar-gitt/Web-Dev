var body = document.querySelector('body')
var div = document.querySelector('.effect')

div.addEventListener('mousemove', function (val) {
    body.style.setProperty('--x', val.x + 'px')
    body.style.setProperty('--y', val.y + 'px')
})
