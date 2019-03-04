// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    this.percentage = totalIncome > 0 ? Math.round((this.value / totalIncome) * 100) : -1;
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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

      return newItem;
    },

    deleteItem: function(type, id) {
      data.allItems[type] = data.allItems[type].filter(item => item.id !== id);
    },

    calculateBudget: function() {
      calculateTotal('exp');
      calculateTotal('inc');

      data.budget = data.total.inc - data.total.exp;
      data.percentage =
        data.total.inc > 0 ? Math.round((data.total.exp / data.total.inc) * 100) : -1;
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(element) {
        element.calcPercentage(data.total.inc);
      });
    },

    getPercentages: function() {
      return data.allItems.exp.map(function(ele) {
        return ele.getPercentage();
      });
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
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3);
    }

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
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
          <div class="item clearfix" id="inc-%id%">
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
          <div class="item clearfix" id="exp-%id%">
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
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorId) {
      var el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
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
      document.querySelector(domStrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        obj.budget >= 0 ? 'inc' : 'exp'
      );
      document.querySelector(domStrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        'inc'
      );
      document.querySelector(domStrings.expensesLabel).textContent = formatNumber(
        obj.totalExp,
        'exp'
      );
      document.querySelector(domStrings.percentageLabel).textContent =
        obj.percentage > 0 ? obj.percentage + '%' : '---';
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(domStrings.expensesPercLabel);
      fields.forEach(function(ele, index) {
        ele.textContent = percentages[index] > 0 ? percentages[index] + '%' : '---';
      });
    },

    displayMonth: function() {
      var now, year, month, months;

      now = new Date();
      year = now.getFullYear();

      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      month = now.getMonth();

      document.querySelector(domStrings.dateLabel).textContent = months[month] + ', ' + year;
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

    document.querySelector(domStrings.container).addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function() {
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();

    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    budgetCtrl.calculatePercentages();

    var percentages = budgetCtrl.getPercentages();

    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    if (!input.description || Number.isNaN(input.value) || input.value === 0) return;

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearFields();

    updateBudget();
    updatePercentages();
  };

  var ctrlDeleteItem = function(event) {
    var itemId, splitId, type, ID;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (!itemId) return;

    splitId = itemId.split('-');
    type = splitId[0];
    ID = +splitId[1];

    budgetCtrl.deleteItem(type, ID);
    UICtrl.deleteListItem(itemId);

    updateBudget();
    updatePercentages();
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
      UICtrl.displayMonth();
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
