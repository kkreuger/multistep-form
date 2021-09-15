let count        = 0
const previous   = document.getElementById('previous')
const next       = document.getElementById('next')
const setForm    = (percentage, opacity) => {
    document.querySelector(`[data-number="${count}"]`).style.cssText = `transform: translateX(${percentage});opacity:${opacity};`
}

next.addEventListener("click", () => {
    if(count === 3) return
    setForm('-100%', 0)
    count++
    setTimeout(() => {
        setForm('0', 1)
    }, 250)
})

previous.addEventListener("click", () => {
    if(count === 0) return
    setForm('100%', 0)
    count--
    setTimeout(() => {
        setForm('0', 1)
    }, 250)
})

