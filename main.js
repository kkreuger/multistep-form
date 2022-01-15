let count = 0
let answers = {
    raamkozijn: null,
    positie: null,
    diepte: null,
    hoogte: null,
    breedte: null,
    bekleding: null,
    vensterbank: null,
    kozijnmaat: 'NVT',
    naam: null,
    email: null,
    telefoon: null,
    extraInfo: null,
    prijs: null,
    versturen: null,
    straatnaam: 'NVT',
    nummer: 'NVT',
    postcode: 'NVT',
    plaats: 'NVT',
}

//GO TO THE NEXT SLIDE
const next = () => {
    if(count === 6) return
    setForm('-100%', 0)
    activeCountBtn()
    count++
    setCount()
    scrollToTop()
    setTimeout(() => {
        setForm('0', 1)
    }, 250)
}

//GO TO THE PREVIOUS SLIDE
const previous = () => {
    if(count === 0) return
    setForm('100%', 0)
    count--
    setCount()
    scrollToTop()
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
    const number = parseInt(el[2].value, 10)
    
    
    if(number > 59 && number < 401) {
	    if(el[0].value != '' && el[1].value != '' && el[2].value != '') {
	        nextBtn.disabled = false
	    } else {
	        nextBtn.disabled = true
	    }
	    
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
    const extraQuestion = document.querySelector('.underneath-window2')
    
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.raamkozijn = element.getAttribute('data-underneath')
	setFinalPrice()
    setOverviewValues()
    
    if(element.getAttribute('data-underneath') === 'Ja') {
	    extraQuestion.classList.add('active')
	    return
    }
    
    scrollToTop()
    next()
}

const handleQuestionOneSize = (element) => {
	const btn = document.querySelector('.next-button-window')
	answers.kozijnmaat = element.value
	setOverviewValues()
	
	if(element.value != '') {
		btn.disabled = false
	} else {
		btn.disabled = true
	}
}

//HANDLE QUESTION 2
const handleQuestionTwo = (element) => {
    const el = document.querySelectorAll('.radiator-position > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.positie = element.getAttribute('data-position')
    scrollToTop()
    next()
}

//HANDLE QUESTION 3 DEPTH
const handleQuestionThreeDepth = (element) => {
    answers.diepte = element.value
    checkSizes()
}

//HANDLE QUESTION 3 HEIGHT
const handleQuestionThreeHeight = (element) => {
    answers.hoogte = element.value
    checkSizes()
}

//HANDLE QUESTION 3 LENGTH
const handleQuestionThreeWidth = (element) => {
    answers.breedte = element.value
    checkSizes()
}

//HANDLE QUESTION 4
const handleQuestionFour = (element) => {
    const el = document.querySelectorAll('.radiator-type > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.bekleding = element.getAttribute('data-type')
    scrollToTop()
    next()
}

//HANDLE QUESTION 5
const handleQuestionFive = (element) => {
    const el = document.querySelectorAll('.windowsill > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.vensterbank = element.getAttribute('data-windowsill')
    setOverviewValues()
    next()
}

//HANDLE QUESTION 6
const handleQuestionSix = (element) => {
    const el = document.querySelectorAll('.sending > div')
    el.forEach((el) => el.classList.remove('active'))
    element.classList.add('active')
    answers.versturen = element.getAttribute('data-sending')
    
    if(element.getAttribute('data-sending') === 'Ja') {
	    document.querySelector('.additional-info').classList.add('active')
    } else {
	    document.querySelector('.additional-info').classList.remove('active')
    }
    
    setOverviewValues()
    next()
}

//SET CORRECT PRICE
const setFinalPrice = () => {
	let price = 250
	price += answers.breedte * 1.25
	if(answers.vensterbank === 'Eiken') price += answers.breedte * 0.6
	if(answers.bekleding === 'Type D') price += 50
	
	answers.prijs = price
	
	if(answers.breedte > 300) answers.prijs = 'Maatwerk prijs'
}

//HANDLE NAME
const handleName = (element) => {
	answers.naam = element.value
}

//HANDLE EMAIL
const handleEmail = (element) => {
	answers.email = element.value
}

//HANDLE PHONE
const handlePhone = (element) => {
	answers.telefoon = element.value
}

//HANDLE STREET
const handleStreet = (element) => {
	answers.straatnaam = element.value
}

//HANDLE STREETNUMBER
const handleStreetNumber = (element) => {
	answers.nummer = element.value
}

//HANDLE POSTAL
const handlePostal = (element) => {
	answers.postcode = element.value
}

//HANDLE CITY
const handleCity = (element) => {
	answers.plaats = element.value
}

//HANDLE EXTRA INFO
const handleExtraInfo = (element) => {
	answers.extraInfo = element.value
}

//SCROLL TO TOP 
const scrollToTop = () => {
	window.scrollTo(0, 0)
}

//RESET FIELD
const resetFields = () => {
	document.getElementById('name').value = ''
	document.getElementById('email').value = ''
	document.getElementById('phone').value = ''
	document.getElementById('streetname').value = ''
	document.getElementById('streetnumber').value = ''
	document.getElementById('postal').value = ''
	document.getElementById('city').value = ''
}

//SET VALUES TO OVERVIEW
const setOverviewValues = () => {
	const windowChoice = document.querySelector('.underneath-window-choice')
	const wallChoice = document.querySelector('.wall-choice')
	const deptChoice = document.querySelector('.dept-choice')
	const heightChoice = document.querySelector('.height-choice')
	const widthChoice = document.querySelector('.width-choice')
	const typeChoice = document.querySelector('.type-choice')
	const windowsillChoice = document.querySelector('.windowsill-choice')
	const windowsillSize = document.querySelector('.windowsill-size')
	const sending = document.querySelector('.sending-choice')
	const price = document.querySelector('.total-price')
	
	windowChoice.innerText = answers.raamkozijn ? answers.raamkozijn : '-'
	wallChoice.innerText = answers.positie ? answers.positie : '-'
	deptChoice.innerText = answers.diepte ? `${answers.diepte} cm` : '-'
	heightChoice.innerText = answers.hoogte ? `${answers.hoogte} cm` : '-'
	widthChoice.innerText = answers.breedte ? `${answers.breedte} cm` : '-'
	typeChoice.innerText = answers.bekleding ? answers.bekleding : '-'
	windowsillChoice.innerText = answers.vensterbank ? answers.vensterbank : '-'
	windowsillSize.innerText = answers.kozijnmaat !== 'NVT' ? `${answers.kozijnmaat} cm` : 'NVT'
	sending.innerText = answers.versturen ? answers.versturen : '-'
	price.innerText = answers.prijs == 'Maatwerk prijs' ? 'Maatwerk prijs' : `€ ${answers.prijs}`
}


const submitMail = (e) => { 
	e.preventDefault();
    const data = answers;
    const spinner = document.querySelector('.spinner')
    
    spinner.classList.add('active')
    
    jQuery.ajax({
        type: 'POST',
        url: `${window.location.origin}/wp-admin/admin-ajax.php?action=mail_before_submit`,
        data: data, 
        success: function (result) {
	        resetFields()
			spinner.classList.remove('active')
			document.querySelector('.alert').classList.add('active')
        },
        error: function () {
            alert("error");
        }
    });
}


