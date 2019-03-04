// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      var newItem;
      var ID =
        data.allItems[type].length === 0
          ? 0
          : data.allItems[type][data.allItems[type].length - 1].id + 1;

      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      data.allItems[type].push(newItem);
      data.total[type] += val;

      return newItem;
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, // will be inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: +document.querySelector(domStrings.inputValue).value
      };
    },

    getDomStrings: function() {
      return domStrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var domStrings = UICtrl.getDomStrings();

    document.querySelector(domStrings.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    newItem = budgetController.addItem(input.type, input.description, input.value);
  };

  return {
    init: function() {
      console.log('App has started!');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
