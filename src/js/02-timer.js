import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const value = document.querySelectorAll('.value');

let currentDate = new Date();

startButton.disabled = true;

function addZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (currentDate >= selectedDate) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

startButton.addEventListener('click', ourTime);

function updateTimer(endTime) {
  currentDate = Date.now();
  const timeRemaining = endTime - currentDate;

  if (timeRemaining <= 0) {
    value.forEach(field => (field.textContent = '00'));
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  value[0].textContent = addZero(days);
  value[1].textContent = addZero(hours);
  value[2].textContent = addZero(minutes);
  value[3].textContent = addZero(seconds);
}

let OurSelectedDate;
let intervalId;
function ourTime() {
  OurSelectedDate = flatpickr.parseDate(input.value);
  if (OurSelectedDate) {
    const endTime = OurSelectedDate.getTime();
    updateTimer(endTime);
    startButton.disabled = true;
    intervalId = setInterval(() => {
      updateTimer(endTime);
    }, 1000);
  }
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr(input, options);

console.log(options);
