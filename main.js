let count = 0
let answers = {
    raamkozijn: null,
    positie: null,
    diepte: null,
    hoogte: null,
    breedte: null,
    bekleding: null,
    naam: null,
    email: null,
    telefoon: null,
}

const next = () => {
    if(count === 4) return
    setForm('-100%', 0)
    activeCountBtn()
    count++
    setCount()
    setTimeout(() => {
        setForm('0', 1)
    }, 250)
}

const previous = () => {
    if(count === 0) return
    setForm('100%', 0)
    count--
    setCount()
    setTimeout(() => {
        setForm('0', 1)
    }, 250)
}

//SET THE CORRECT NUMBER IN THE COUNT
const setCount = () => {
    const countEl = document.querySelectorAll('.number')
    countEl.forEach((el) => {
        el.classList.remove('active')
    })
    document.querySelector(`[data-count="${count}"]`).classList.add('active')
}

//SET CORRECT FORM ORDER
const setForm = (percentage, opacity) => {
    document.querySelector(`[data-number="${count}"]`).style.cssText = `transform: translateX(${percentage});opacity:${opacity};`
}

//CHECK IF ALL SIZES ARE FILLED IN
const checkSizes = () => {
    const el = document.querySelectorAll('.radiator-size')
    const nextBtn = document.querySelector('.next-button')
    if(el[0].value != '' && el[1].value != '' && el[2].value != '') {
        nextBtn.disabled = false
    } else {
        nextBtn.disabled = true
    }
}

//ACTIVATE COUNT BUTTON
const activeCountBtn = () => {
    document.querySelector(`[data-count="${count}"]`).disabled = false
    document.querySelector(`[data-count="${count + 1}"]`).disabled = false
}

//SET CORRECT SLIDE
const setCorrectSlide = (el) => {
    const slideNumber = el.getAttribute('data-count')

    if(slideNumber == count) return

    if(slideNumber < count) {
        for (let i = count - 1; i >= slideNumber; i--) {
            previous()
        }
    }

    if(slideNumber > count) {
        for (let i = count; i <= slideNumber - 1; i++) {
            next()
        }          
    }
}

//HANDLE QUESTION 1
const handleQuestionOne = (element) => {
    const el = document.querySelectorAll('.underneath-window > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.raamkozijn = element.getAttribute('data-underneath')
    next()
}

//HANDLE QUESTION 2
const handleQuestionTwo = (element) => {
    const el = document.querySelectorAll('.radiator-position > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.positie = element.getAttribute('data-position')
    next()
}

//HANDLE QUESTION 3 DEPTH
const handleQuestionThreeDepth = (element) => {
    answers.diepte = element.value
    checkSizes()
}

//HANDLE QUESTION 3 DEPTH
const handleQuestionThreeHeight = (element) => {
    answers.hoogte = element.value
    checkSizes()
}

//HANDLE QUESTION 3 DEPTH
const handleQuestionThreeLenght = (element) => {
    answers.breedte = element.value
    checkSizes()
}

//HANDLE QUESTION 4
const handleQuestionFour = (element) => {
    const el = document.querySelectorAll('.radiator-type > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.bekleding = element.getAttribute('data-type')
    next()
}


