'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function(mov , i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}
displayMovements(account1.movements);
const createUsername = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
})
}
createUsername(accounts);
console.log(accounts)

const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,curr) => acc += curr ,0);
  labelBalance.textContent = `${balance} €`
}
calcDisplayBalance(account1.movements)


const calcDisplaySummary = function(movements){
  const incomes = movements
  .filter(mov => mov > 0)
  . reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`

  const out = movements
  .filter(mov => mov < 0)
  .reduce((acc,mov)=> acc + mov , 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
  .filter(mov => mov >0)
  .map(deposit => deposit * 1.2 /100)
  .filter((int) =>{
    return int >= 1;
  })
  .reduce((acc,mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`

}
calcDisplaySummary(account1.movements)
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
const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => age <= 2? 2* age : 16 + age * 4);
  console.log(humanAges);
}
calcAverageHumanAge([5,2,4,1,15,8,6]);

console.log('hello world')
