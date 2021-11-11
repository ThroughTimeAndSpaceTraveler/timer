let countDown;
const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);


    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft <= 0) {
            clearInterval(countDown);
            return;
        }

        displayTimeLeft(secondsLeft);

    }, 1000)
}

function displayTimeLeft (seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log(minutes, remainderSeconds)
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `WILL BE BACK AT ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    // for dumb endTime.textContent = `Whatever ${hour > 12 ? hour - 12}:${minutes}`;
} 

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})

