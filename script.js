'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed == 0) return 'today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);

    const displyDate = formatMovementDate(date);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displyDate}</div>
          <div class="movements__value">${mov.toFixed(2)}₹</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => (acc += curr), 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}₹`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}₹`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}₹`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}₹`;
};
const updateUi = function (acc) {
  displayMovements(acc);
  // display balance

  calcDisplayBalance(acc);
  // display dummary
  calcDisplaySummary(acc);
};

//event handaler
let currentAccount;

// Fake always logged in
currentAccount = account1;
updateUi(currentAccount);
containerApp.style.opacity = 100;

//event listner
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Disply UI and Message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();

    labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Display movemnets
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the tansfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(new Date());

    //update Ui
    updateUi(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());

    //update Ui
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // delete account
    accounts.splice(index, 1);

    // hide Ui
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////

// const z = Array.from({length:7},(_,i) => i+1);
// console.log(z)
// const accMovements = accounts.map;
// console.log(accMovements);
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov =>
//     mov * eurToUsd);

// console.log(movementsUSD);
// // console.log(movements.entries());
// currencies.forEach(function(value,key,map){
//   console.log(`${key}: ${value} `)
// })
// let arr = ['a', 'b' , 'c', 'd','e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1,-1));
// console.log(arr.slice());
// // SPLICE
// console.log(arr.s plice(2));
// for(const [i,movement] of movements.entries()){
//   if(movement > 0 ){
//     console.log(`${i+1}: You deposited ${movement}`);
//   }else{
//     console.log(`${i+1}: You withderw ${Math.abs(movement)}`);
//   }
// }
// console.log('--------------------------------------------');
// for(const [movement] of movements.entries()){
//   if(movement > 0 ){
//     console.log(` You deposited ${movement}`);
//   }else{
//     console.log(` You withderw ${Math.abs(movement)}`);
//   }
// }
// movements.forEach(function (movement, i, arr){
//   if(movement > 0 ){
//     console.log(`${i+1}: You deposited ${movement}`);
//   }else{
//     console.log(`${i+1}: You withderw ${Math.abs(movement)}`);
//   }
// });
// const checkDogs = function(dogsJulia, dogsKate){
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0,1);
//   dogsJuliaCorrected.splice(-2)
//   console.log(dogsJuliaCorrected);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

// }
// checkDogs([4,5,2,12,7], [4,1,15,8,2]);
// const depost = movements.filter(function(mov){
//   return mov > 0;
// })
// console.log(depost);

// const withdrawals = movements.filter(mov => mov <0);
// console.log(withdrawals);

// const balance  = movements.reduce(function(acc,cur,i,arr){
//   console.log(`Iteration ${i}: ${acc}`)
//   return acc + cur;
// },0);
// console.log(balance);
// console.log(movements);
// //maximum value

// const maximumvalue = movements.reduce(function(acc, curr){
//   if(acc > curr)
//   return acc;
//   else return curr;
// },movements[0]);
// console.log(maximumvalue);
// const calcAverageHumanAge = function(ages){
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
//   console.log(humanAges);
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);
// }
// calcAverageHumanAge([5,2,4,1,15,8,6]);
// const eurToUsd = 1.1;
// const totalDepositUSD=movements.filter(mov => mov > 0).map( mov => mov * eurToUsd).reduce((acc,mov)=> acc + mov,0);
// console.log(totalDepositUSD);
// const calcAverageHumanAge = ages => {
//   const humanAges = ages.map(age => age <= 2? 2* age : 16 + age * 4);
//   console.log(humanAges);
// }
// calcAverageHumanAge([5,2,4,1,15,8,6]);

// console.log('hello world')
