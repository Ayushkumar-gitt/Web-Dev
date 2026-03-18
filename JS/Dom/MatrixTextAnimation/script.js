var para = document.querySelector('p')
var charecters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
var text = para.innerText
var iteration = 0
para.addEventListener('mouseenter', function () {
    var inte = setInterval(() => {
        var str = text.split('').map((char, idx) => {
            if(idx<iteration){
                return char;
            }
        return charecters.split('')[Math.floor(Math.random() * 53)]
    }
    ).join('')
    // console.log(str)
    iteration +=0.4;
    para.innerText = str
    }, 50);
})

