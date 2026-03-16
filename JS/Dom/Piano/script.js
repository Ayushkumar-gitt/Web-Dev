var h1 = document.querySelector('h1')
// var audd = new Audio()
function playAud(aud){
    var audi = new Audio(aud)
    audi.play()
}
document.body.addEventListener('keydown',function(keys){
    switch (keys.key) {
        case 'a':
            playAud('./31.mp3')
            break;
        case 's':
            playAud('./32.mp3')
            break;
        case 'd':
            playAud('./33.mp3')
            break;
        case 'f':
            playAud('./34.mp3')
            break;
        case 'g':
            playAud('./51.mp3')
            break;
        case 'h':
            playAud('./53.mp3')
            break;
        case 'j':
            playAud('./57.mp3')
            break;
        case 'k':
            playAud('./58.mp3')
            break;
        case 'l':
            playAud('./60.mp3')
            break;
        case ';':
            playAud('./28.mp3')
            break;
        case '\'':
            playAud('./30.mp3')
            break;
        default:
            break;
    }
})