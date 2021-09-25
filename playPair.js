let arrayOfNumbers = []
let choice1 = null
let choice2 = null
let hit = 0
let timer = null
let pairs = 8
let container = document.createElement('div')
let time = document.createElement('div')
let play = document.createElement('button')
let playAgainAfterWin = document.createElement('button')
let playAgainAfterLose = document.createElement('button')
let congratulation = document.createElement('div')
let lose = document.createElement('div')
let inputBox = document.createElement('form')
let input = document.createElement('input')
let winBox = document.createElement('div')
let loseBox = document.createElement('div')
let ul = document.createElement('ul')

container.classList.add('container')
inputBox.textContent = 'Введите количество строк от 1 до 5'
inputBox.classList.add('inputBox')
input.setAttribute('type', 'number')
input.setAttribute('min', '1')
input.setAttribute('max', '5')
input.classList.add('input')
winBox.classList.add('winBox')
loseBox.classList.add('loseBox')
time.classList.add('time')
time.textContent = '1' + ' : ' + '00'
inputBox.append(input)
container.append(winBox)
container.append(loseBox)
container.append(inputBox)

congratulation.textContent = 'Поздравляю! Вы выйграли! Хотите сыграть еще?'
congratulation.classList.add('congratulation')
lose.textContent = 'Время истекло, хотите попробовать еще?'
lose.classList.add('lose')
play.type = 'submit'
play.textContent = 'Играть'
play.classList.add('play')
playAgainAfterWin.textContent = 'Играть заново'
playAgainAfterWin.classList.add('playAgainAfterWin')
playAgainAfterLose.textContent = 'Играть заново'
playAgainAfterLose.classList.add('playAgainAfterLose')
winBox.append(congratulation)
loseBox.append(lose)
winBox.append(playAgainAfterWin)
loseBox.append(playAgainAfterLose)
inputBox.append(play)
document.body.append(container)

function createApp() {
    inputBox.addEventListener('submit', function(e) {
        e.preventDefault()
        let item = input.value
        console.log(item)
        if (item > 0 && item < 6) {
            pairs = item*2
            inputBox.style.display = 'none'

            for (let i = 1; i <= pairs; i++) {
                arrayOfNumbers.push(i)
                arrayOfNumbers.push(i)
            }

            function shuffle(array) {
                array.sort(() => Math.random() - 0.5)
            }

            shuffle(arrayOfNumbers)
            console.log(arrayOfNumbers)

            for (const item of arrayOfNumbers){
                container.append(time)

                let li = document.createElement('li')
                li.classList.add('box')
                li.textContent = item
                ul.append(li)
                container.append(ul)

                li.addEventListener('click', function createChoices(){
                    inputBox.style.display = 'none'

                    if (timer == null){
                        let minutes = 0
                        let seconds = 60
                        timer = setInterval(() => {
                            seconds--
                            time.textContent = minutes + ' : ' + seconds
                            if (seconds <= 9) {
                                time.textContent = minutes + ' : ' + '0' + seconds
                            }
                            if(seconds == 0 && minutes > 0){
                                minutes--
                                seconds = 60
                            }
                            if (seconds == 0 && minutes == 0) {
                                clearInterval(timer)
                                loseBox.style.display = 'block'
                            }
                        }, 1000);
                    }

                    li.classList.add('yellowBox')

                    if (choice1 == null){
                        list1 = li
                        choice1 = Number(li.textContent)
                        console.log('choice1 = ' + choice1)
                    } else {
                        if (choice2 == null) {
                            list2 = li
                            if (list1 != list2) {
                                choice2 = Number(li.textContent)
                                console.log('choice2 = ' + choice2)
                            }
                            if (choice1 == choice2) {
                                hit++
                                list1.classList.remove('yellowBox')
                                list1.classList.add('greenBox')
                                list2.classList.remove('yellowBox')
                                list2.classList.add('greenBox')
                            }
                        } else {
                            if (choice1 == choice2) {
                                console.log('равны')
                                choice1 = null
                                choice2 = null
                                list1 = null
                                list2 = null
                                choice1 = Number(li.textContent)
                                console.log('choice1 = ' + choice1)
                                list1 = li
                            } else {
                                console.log('не равны')
                                choice1 = null
                                choice2 = null
                                list1.classList.remove('yellowBox')
                                list2.classList.remove('yellowBox')
                                list1 = null
                                list2 = null
                                choice1 = Number(li.textContent)
                                console.log('choice1 = ' + choice1)
                                list1 = li
                            }
                        }
                    }
                    if (hit >= pairs) {
                        clearInterval(timer)
                        winBox.style.display = 'block'
                    }
                })
            }

            playAgainAfterWin.addEventListener('click', () => {
                location.reload()
            })

            playAgainAfterLose.addEventListener('click', () => {
                location.reload()
            })
        } else {
            alert('Введите корректное значение')
        }
    })
}
createApp()
