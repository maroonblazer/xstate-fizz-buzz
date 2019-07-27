// import { interpret } from 'xstate';

// const xstate = require('xstate'); // we're importing xstate via index.html so we don't need this for front-end/client-side

machine = xstate.Machine({
  initial: 'digit_fizz_buzz',
  states: {
    digit_fizz_buzz: {
      initial: 'digit',
      on: {
        increment: [
          { cond: i => i % 3 == 0 && i % 5 == 0, target: '.fizzbuzz' },
          { cond: i => i % 3 == 0, target: '.fizz' },
          { cond: i => i % 5 == 0, target: '.buzz' },
          { target: '.digit' }
        ]
      },
      states: {
        digit: {
          onEntry: 'print_digit'
        },
        fizz: {
          onEntry: 'print_fizz'
        },
        buzz: {
          onEntry: 'print_buzz'
        },
        fizzbuzz: {
          onEntry: 'print_fizzbuzz'
        }
      }
    }
  }
});

const actions = {
  print_digit: i =>
    (document.querySelector('#digit').innerHTML += '<li>' + i + '</li>'),
  print_fizz: () =>
    (document.querySelector('#digit').innerHTML += '<li>Fizz</li>'),
  print_buzz: () =>
    (document.querySelector('#digit').innerHTML += '<li>Buzz</li>'),
  print_fizzbuzz: () =>
    (document.querySelector('#digit').innerHTML += '<li>FizzBuzz</li>')
};

let state = machine.initialState;

for (let i = 1; i <= 100; i++) {
  state = machine.transition(state, 'increment', i);
  state.actions.forEach(item => actions[item](i));
}
