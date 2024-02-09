var chart;

var timerInterval;
var clockInterval;
var transitionInterval;
var isPaused = false;

const SECOND = 1000;
const MINUTE = 60000;
const TEN_SECONDS = 10000;
const TRANSITION_DURATION = 30000;
const TIMER_DONE_AUDIO = 10000;
const TIMER_OFFSET = SECOND * 1;

const transitionTrack = new Audio(`assets/audio/30s-jeopardy-song.mp3`);
const audioTenSecondCountdown = new Audio(`assets/audio/10s-calm-alarm.mp3`);
const audioTimesUp = new Audio(`assets/audio/4s-magical-surprise.mp3`);
