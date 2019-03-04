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

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(item) {
      sum += item.value;
    });
    data.total[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
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
    },

    calculateBudget: function() {
      calculateTotal('exp');
      calculateTotal('exp');

      data.budget = data.total.inc - data.total.exp;
      data.percentage =
        data.total.inc > 0 ? Math.round((data.total.exp / data.total.inc) * 100) : -1;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage
      };
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value, // will be inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseFloat(document.querySelector(domStrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      if (type === 'inc') {
        element = domStrings.incomeContainer;

        html = `
          <div class="item clearfix" id="income-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
          </div>
        `;
      } else {
        element = domStrings.expenseContainer;

        html = `
          <div class="item clearfix" id="expense-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
          </div>
        `;
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        domStrings.inputDescription + ', ' + domStrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(element) {
        element.value = '';
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(domStrings.expensesLabel).textContent = obj.totalExp;
      document.querySelector(domStrings.percentageLabel).textContent =
        obj.percentage > 0 ? obj.percentage + '%' : '---';
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

  var updateBudget = function() {
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();

    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    if (!input.description || Number.isNaN(input.value) || input.value === 0) return;

    newItem = budgetController.addItem(input.type, input.description, input.value);
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearFields();

    updateBudget();
  };

  return {
    init: function() {
      console.log('App has started!');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
