function computeAverageBetweenDidgYasForSingleDay(didgYas) {
    if (didgYas.length <= 1) return "Insufficient DidgYas today...";
    let sum = 0;
    for (let index = 0; index < didgYas.length; index++) {
        const element = didgYas[index];
        const dt = new Date(element.dt);

        if (index + 1 >= didgYas.length) break;

        const dtNext = new Date(didgYas[index + 1].dt);
        sum += dt.getTime() - dtNext.getTime();
    }
    if (didgYas.length == 2) return sum;
    else return sum / didgYas.length;
}
function getDailyGoalText(didgYas, didgya) {
    const total = didgYas.length;
    const dailyGoal = didgya.dailyGoal;
    if (total >= dailyGoal) return "Accomplished! 🎉";
    else return "Getting there! 😀";
}
