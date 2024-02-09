function cancelTimer() {
    clearInterval(timerInterval);
    // clearInterval(transitionInterval);

    audioTenSecondCountdown.stop();
    transitionTrack.stop();
    audioTimesUp.stop();

    // const endTimeDiv = document.getElementById("timer-end");
    // endTimeDiv.classList.add("hidden");

    const modal = document.getElementById("modal-timer-DidgYa");
    modal.classList.add("hidden");

    // // Reveal timer adjustment buttons
    // const adjustmentButtons = document.getElementById(
    //     "timer-adjustment-buttons"
    // );
    // adjustmentButtons.classList.add("hidden");

    // // Reveal default timer and custom timer buttons
    // const defaultTimersGroup = document.getElementById("timer-buttons");
    // const customTimersGroup = document.getElementById("custom-timers");
    // defaultTimersGroup.classList.remove("hidden");
    // customTimersGroup.classList.remove("hidden");

    // const customTimerTitle = document.getElementById("custom-timer-title");
    // customTimerTitle.classList.add("hidden");
    // customTimerTitle.innerHTML = "";

    // setTime();
    // clockInterval = setInterval(setTime, 1000);
    // localStorage.setItem("state", "clock");

    // const classes = getClassesThatInclude("bg", "body");
    // removeClassesFromElement(classes, "body");
    // body.style.backgroundColor = color;

    // color = new Color(color);

    // setColors(color);
    // populateShapes(shape);
    // animateIcons();
}
function pauseTimer() {
    if (isPaused) return makeToast("The timer is already paused!", "warning");

    isPaused = true;

    const timerDiv = document.getElementById("time");
    timerDiv.classList.toggle("opacity-25");

    updateAnimationState(isPaused);
}
function resumeTimer() {
    if (!isPaused) return makeToast("The timer is already running!", "warning");

    isPaused = false;

    const timerDiv = document.getElementById("time");
    const currentDuration = parseInt(timerDiv.name);
    const adjustingTimer = true;
    setEndTime(currentDuration, adjustingTimer);

    timerDiv.classList.toggle("opacity-25");

    updateAnimationState(isPaused);
}
function setTimer(durationMilliseconds, color, shape) {
    const divTimer = document.getElementById("time");
    divTimer.innerHTML = convertMsToTime(durationMilliseconds);
    divTimer.name = durationMilliseconds;

    localStorage.setItem("repeated", false);
    localStorage.setItem("duration", durationMilliseconds);

    clearInterval(timerInterval);
    clearInterval(clockInterval);

    // // Hide default timer and custom timer buttons
    // const defaultTimersGroup = document.getElementById("timer-buttons");
    // const customTimersGroup = document.getElementById("custom-timers");
    // defaultTimersGroup.classList.add("hidden");
    // customTimersGroup.classList.add("hidden");

    // // Reveal timer adjustment buttons
    // const adjustmentButtons = document.getElementById(
    //     "timer-adjustment-buttons"
    // );
    // const modifyTimerButtonsPlus = document.getElementById(
    //     "timer-adjustment-buttons-plus"
    // );
    // const modifyTimerButtonsMinus = document.getElementById(
    //     "timer-adjustment-buttons-minus"
    // );
    // const playButton = document.getElementById("play-timer");
    // const pauseButton = document.getElementById("pause-timer");

    // adjustmentButtons.classList.remove("hidden");
    // modifyTimerButtonsMinus.classList.remove("hidden");
    // modifyTimerButtonsPlus.classList.remove("hidden");
    // pauseButton.classList.remove("hidden");
    // playButton.classList.remove("hidden");

    timerInterval = setInterval(timer, 1000);

    // Adjust the background color
    if (color) {
        const classes = getClassesThatInclude("bg", "body");
        removeClassesFromElement(classes, "body");
        body.style.backgroundColor = color;
        color = new Color(color);
        setColors(color);
    }
    if (shape != undefined) {
        populateShapes(shape);
        animateIcons();
    }
}
async function timer(transition) {
    audioTenSecondCountdown.loop = false;
    transitionTrack.loop = false;
    audioTimesUp.loop = false;

    let repeated = localStorage.getItem("repeated");
    let divTimer = document.getElementById("time");
    let milliseconds = parseInt(divTimer.name);
    if (!isPaused) {
        if (milliseconds <= 1000) {
            cancelTimer();
        }
        milliseconds = milliseconds - 1000;
        divTimer.innerHTML = convertMsToTime(milliseconds);
        divTimer.name = milliseconds;
    }
}
