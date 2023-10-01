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

      startButton.addEventListener('click', ourTime);

      function updateTimer() {
        currentDate = Date.now();
        const timeRemaining = selectedDate - currentDate;

        if (timeRemaining <= 0) {
          
          clearTimeout(intervalId)
          startButton.disabled = true;
          return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeRemaining);

        value[0].textContent = addZero(days);
        value[1].textContent = addZero(hours);
        value[2].textContent = addZero(minutes);
        value[3].textContent = addZero(seconds);
      }

      
      let intervalId;
      function ourTime() {
        
        if (selectedDate) {
          
        
          startButton.disabled = true;
          intervalId = setInterval(() => {
            updateTimer();
          }, 1000);
        }
      }
    }
  },
};

function convertMs(ms) {
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



flatpickr(input, options);


