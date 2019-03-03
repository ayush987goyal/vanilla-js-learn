// Function construtor
/*
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function() {
  console.log(2019 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);
console.log(jane.lastName);
*/

/************************************************************************************************ */

// Object.Create
/*
var personProto = {
  calculateAge: function() {
    console.log(2019 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
  name: { value: 'Jane' },
  yearOfBirth: { value: 1969 },
  job: { value: 'designer' }
});
*/

/************************************************************************************************ */

// Functions

// Passing func as arguments
/*
var years = [1990, 1965, 1937, 2011, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calcAge(el) {
  return 2019 - el;
}

function isFullAge(el) {
  return el >= 18;
}

var ages = arrayCalc(years, calcAge);
var fullAges = arrayCalc(ages, isFullAge);
console.log(ages);
console.log(fullAges);
*/

/************************************************************************************************ */

// Function returning functions
/*
function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(name + ', can you please explain what UX design is?');
    };
  } else if (job === 'teacher') {
    return name => {
      console.log('What subject do you teach ' + name + '?');
    };
  } else {
    return name => {
      console.log('Hello! ' + name);
    };
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Jane');
*/

/************************************************************************************************ */

// IIFE
/*
// function game() {
//   var score = Math.random() * 10;
//   console.log(score > 5);
// }
// game();

(function() {
  var score = Math.random() * 10;
  console.log(score > 5);
})();

// console.log(score);

(function(goodluck) {
  var score = Math.random() * 10;
  console.log(score > 5 - goodluck);
})(4);
*/

/************************************************************************************************ */
