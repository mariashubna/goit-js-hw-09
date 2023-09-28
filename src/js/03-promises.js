import Notiflix from 'notiflix';


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');
const btn = form.querySelector('button[type="submit"]');




btn.addEventListener('click', ourPromise);

function ourPromise(e) {
  e.preventDefault(); 
  const amount = amountInput.value;
  const initialDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  
  
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const delay = initialDelay + (i - 1) * step;
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}