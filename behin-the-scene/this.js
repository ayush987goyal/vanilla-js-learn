// console.log(this);

// calcAge(1985);

// function calcAge(year) {
//   console.log(2016 - year);
//   console.log(this);
// }

var john = {
  name: 'John',
  birthYear: 1990,
  calcAge: function() {
    console.log(this); // curr obj

    /*
    function innerFunc() {
      console.log(this); // again window...since regular func
    }
    innerFunc();
    */
  }
  /*
  calcFull: () => {
    console.log(this); // window
  }
  */
};

john.calcAge();
// john.calcFull();

var mike = {
  name: 'Mike',
  birthYear: 1984
};

// method borrowing
mike.calcAge = john.calcAge;
mike.calcAge(); // print this of mike...since this is only assigned when calling.
