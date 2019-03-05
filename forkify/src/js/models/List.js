import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateCount(id, newCount) {
    this.items.find(item => item.id === id).count = newCount;
  }
}
