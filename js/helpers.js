const sleep = ms => new Promise(r => setTimeout(r, ms));

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds,)}`;
}
function getClassesThatInclude(stringToSearch, elementId){
    const elem = document.getElementById(elementId)
    return Array.from(elem.classList).filter(i => i.includes(stringToSearch))
}
function removeClassesFromElement(classesToRemove, elementId){
    const elem = document.getElementById(elementId)
    for (let index = 0; index < classesToRemove.length; index++) {
        const element = classesToRemove[index]
        elem.classList.remove(element)        
    }
}
function getSelectedValueFromRadioGroup(radioGroupName) {
    try { return document.querySelector(`input[name="${radioGroupName}"]:checked`).value; }
    catch (error) {
        console.log("🚀 ~ file: global.js:545 ~ getSelectedValueFromRadioGroup ~ radioGroupName:", radioGroupName)
        console.error("🚀 ~ file: global.js:547 ~ getSelectedValueFromRadioGroup ~ error:", error)
    }
}
function generateId() { // Function to generate a random ID
    // Source: https://stackoverflow.com/a/44622300
    return Array.from(Array(16), () =>
        Math.floor(Math.random() * 36).toString(36)
    ).join("");
}
// Function to format milliseconds into 0h 0m 0s
function formatMillisecondsToReadable(milliseconds, displayMilliseconds) {
    const hours = Math.floor(milliseconds / 3600000); // 1 Hour = 3600000 milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 Minute = 60000 milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 Second = 1000 milliseconds
    const ms = milliseconds % 1000; // Remainder milliseconds after removing hours, minutes and seconds
    let timeString = "";
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    if (seconds > 0) timeString += `${seconds}s `;
    if (ms > 0 && displayMilliseconds) timeString += `${ms}ms`;
    return timeString.trim(); // Removes any extra space at the end
}
// Function to load a local JSON from data/JSONs/
async function fetchLocalJson(JSON) {
    const response = await fetch(`${JSON}.json`);
    const data = await response.json()
    return data 
}

Array.prototype.random = function() {
    if (this.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
}
Array.prototype.last = function() {
    return this[this.length - 1];
};
Audio.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
};