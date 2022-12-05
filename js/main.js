'use strict'

// Globals

var gQuests
var gCurrQuestIdx = 0
var gTadaAFG = ['A', 'F', 'G', '']


// Functions

function onStartGameBtn(elStartGameBtn) {
    initGame()
    const elGameWrapper = document.querySelector('.game-wrapper')
    const elGameWonMsg = document.querySelector('.game-won-msg')
    elGameWonMsg.style.display = 'none'
    elGameWrapper.style.display = 'block'
    elStartGameBtn.style.display = 'none'
}

function initGame() {
    gQuests = createQuests()
    renderQuestion()
}

function renderQuestion() {
    const elGameWrapper = document.querySelector('.game-wrapper')
    var strHTML = `
    <img src="imgs/${gCurrQuestIdx+1}.jpg">
    <ul>
    <li data-opt-idx="0" onclick="onOptClicked(this)">${gQuests[gCurrQuestIdx].opts[0]}</li>
    <li data-opt-idx="1" onclick="onOptClicked(this)">${gQuests[gCurrQuestIdx].opts[1]}</li>
    </ul>`
    elGameWrapper.innerHTML = strHTML
}

function createQuests() {
    return [{
            id: 'q101',
            opts: [1964, 1966],
            correctOptIndex: 1
        },
        {
            id: 'q102',
            opts: [1965, 1967],
            correctOptIndex: 1
        },
        {
            id: 'q103',
            opts: [1967, 1968],
            correctOptIndex: 0
        },
        {
            id: 'q104',
            opts: [1967, 1969],
            correctOptIndex: 1
        }
    ]
}

function onOptClicked(elOpt) {
    var currOptIdx = elOpt.dataset.optIdx
    var answerIdx = gQuests[gCurrQuestIdx].correctOptIndex
    var tada = new Audio(`audio/tada${gTadaAFG[gCurrQuestIdx]}.flac`)
    tada.volume = 0.1
    elOpt.style.color = 'white'
    var isCorrectAnswer = +currOptIdx === +answerIdx
    var isLastTurn = gQuests.length - 1 === gCurrQuestIdx
    const answerBgColor = isCorrectAnswer ? '#73AA24' : '#F03A17'
    elOpt.style.backgroundColor = answerBgColor
    if (isCorrectAnswer) {
        tada.play()
        const cbFunction = (isLastTurn) ? gameWon : renderQuestion
        if (!isLastTurn) gCurrQuestIdx++
        setTimeout(cbFunction, 1000)
    }
}

function gameWon() {
    const elGameWrapper = document.querySelector('.game-wrapper')
    const elGameWonMsg = document.querySelector('.game-won-msg')
    var elStartGameBtn = document.querySelector('.start-game-btn')
    elGameWrapper.style.display = 'none'
    elStartGameBtn.innerText = 'Restart'
    elStartGameBtn.style.display = 'block'
    elGameWonMsg.style.display = 'block'
    gCurrQuestIdx = 0
}