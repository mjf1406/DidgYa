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
        if (milliseconds <= SECOND) {
            if (timerInterval) clearInterval(timerInterval);
            if (transitionInterval) clearInterval(transitionInterval);

            const now = new Date(JSON.parse(localStorage.getItem("timer-dt")));
            const didgYaData = JSON.parse(localStorage.getItem("timer-didgya"));
            const didgYaId = didgYaData.id;
            const didgYas = JSON.parse(localStorage.getItem("didgYas"));
            const didgYaIndex = didgYas.findIndex((i) => i.id == didgYaId);

            didgYaData.records.push({ dt: now });

            didgYas[didgYaIndex] = didgYaData;
            localStorage.setItem("didgYas", JSON.stringify(didgYas));

            updateDidgYaDivById(didgYaId);

            makeToast(`You DidgYa'd <b>${didgYaData.name}</b>!`, "success");

            const modal = document.getElementById("modal-timer-DidgYa");
            modal.classList.add("hidden");
        }
        milliseconds = milliseconds - SECOND;
        divTimer.innerHTML = convertMsToTime(milliseconds);
        divTimer.name = milliseconds;
    }
}
