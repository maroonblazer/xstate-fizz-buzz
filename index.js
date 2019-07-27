// const xstate = require('xstate'); // we're importing xstate via index.html so we don't need this for front-end/client-side

const fizzBuzzMachine = XState.Machine({
  initial: 'digit',
  on: {
    increment: [
      { cond: i => i % 3 == 0 && i % 5 == 0, target: '.fizzBuzz' },
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
      onEntry: 'print_fizzBuzz'
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
  print_fizzBuzz: () =>
    (document.querySelector('#digit').innerHTML += '<li>FizzBuzz</li>')
};

let state = fizzBuzzMachine.initialState;

for (let i = 1; i <= 100; i++) {
  state = fizzBuzzMachine.transition(state, 'increment', i);
  state.actions.forEach(item => actions[item](i));
}
