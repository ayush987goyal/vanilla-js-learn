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

// Closures
/*
function retirement(retirementAge) {
  var a = ' years left until retirement.';

  return function(yearOfBirth) {
    var age = 2019 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1990);

function interviewQuestion(job) {
  return function(name) {
    if (job === 'designer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if (job === 'teacher') {
      console.log('What subject do you teach ' + name + '?');
    } else {
      console.log('Hello! ' + name);
    }
  };
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Jane');
*/

/************************************************************************************************ */

// Bind, call, apply
/*
var john = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log(
        `Good ${timeOfDay} Ladies and Gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${
          this.age
        } years old.`
      );
    } else if (style === 'friendly') {
      console.log(
        `Hey! What's up? I'm ${this.name}, I'm a ${this.job} and I'm ${
          this.age
        } years old. Have a nice ${timeOfDay}.`
      );
    }
  }
};

var emily = {
  name: 'Emily',
  age: 35,
  job: 'designer'
};

john.presentation('formal', 'morning');

john.presentation.call(emily, 'friendly', 'afternoon');
john.presentation.apply(emily, ['friendly', 'night']);

var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

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

function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calcAge);
var fullJapanAges = arrayCalc(ages, isFullAge.bind(this, 20));
*/

/************************************************************************************************ */
