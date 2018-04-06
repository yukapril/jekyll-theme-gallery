var screenWidth = window.innerWidth
var screenHeight = window.innerHeight
var screenRatio = screenWidth / screenHeight
var figures = Array.prototype.slice.call(document.querySelectorAll('.J_Figure'))
var popBg = document.querySelector('#J_PopBg')
var pop = document.querySelector('#J_Pop')
var img = pop.querySelector('img')
var curImg = null

window.addEventListener('orientationchange', orientationchange)
popBg.addEventListener('click', hidePop)
pop.addEventListener('click', hidePop)

figures.map(function (figure) {
    var image = figure.style.backgroundImage.match(/"(.+)"/)[1]
    figure.addEventListener('click', showPop.bind(null, image))
})

function showPop (image) {
    curImg = image
    var temp = document.createElement('img')
    temp.onload = function () {
        var ratio = temp.width / temp.height
        if (ratio >= screenRatio) {
            img.style.width = '100%'
            img.style.height = 'auto'
        } else {
            img.style.width = 'auto'
            img.style.height = '100%'
        }
        img.src = image
        popBg.classList.add('show')
        popBg.classList.remove('fadeOut')
        popBg.classList.add('fadeIn')
        pop.classList.add('show')
        pop.classList.remove('zoomOut')
        pop.classList.add('zoomIn')
        temp = null
    }
    temp.src = image
}

function hidePop () {
    curImg = null
    popBg.classList.remove('fadeIn')
    popBg.classList.add('fadeOut')
    pop.classList.remove('zoomIn')
    pop.classList.add('zoomOut')
    setTimeout(() => {
        popBg.classList.remove('show')
        pop.classList.remove('show')
    }, 500);
}

function orientationchange () {
    setTimeout(function () {
        screenWidth = window.innerWidth
        screenHeight = window.innerHeight
        screenRatio = screenWidth / screenHeight
        if (curImg) {
            showPop(curImg)
        }
    }, 1000)
}
