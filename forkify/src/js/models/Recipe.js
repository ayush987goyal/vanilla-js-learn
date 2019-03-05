import axios from 'axios';

import { key } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const {
        data: { recipe }
      } = await axios.get(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

      this.title = recipe.title;
      this.author = recipe.publisher;
      this.img = recipe.image_url;
      this.url = recipe.source_url;
      this.ingredients = recipe.ingredients;
    } catch (err) {
      console.log(err);
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    // Assuming 15min for every 3 ingredients
    const numIngs = this.ingredients.length;
    const periods = Math.ceil(numIngs / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(item => units.includes(item));

      let objIng;
      if (unitIndex > -1) {
        // There is unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'));
        } else {
          count = eval(arrCount.join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit but 1s ele is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // No unit and no number
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}
