// const xstate = require('xstate'); // we're importing xstate directly onto the page so we don't need this for front-end/client-side

const machine = xstate.Machine({
  initial: 'digit',
  states: {
    digit: {
      on: {
        increment: 'digit'
      },
      onEntry: 'print_digit'
    }
  }
});

const actions = {
  // print_digit: i => console.log(i)
  // print_digit: i => document.write('<li>' + i + '</li>')
  print_digit: i =>
    (document.querySelector('#digit').innerHTML += '<li>' + i + '</li>')
};

let state = machine.initialState;

for (let i = 1; i < 5; i++) {
  state = machine.transition(state, 'increment', i);
  state.actions.forEach(item => actions[item](i));
}

// for (let i = 1; i < 100; i++) {
//   if (i % 3 === 0) {
//     console.log(i, 'Fizz');
//   } else {
//     if (i % 5 === 0) {
//       console.log(i, 'Buzz');
//     } else {
//       if (i % 15 === 0) {
//         console.log(i, 'fizz buzz');
//       } else {
//         console.log(i);
//       }
//     }
//   }
// }
