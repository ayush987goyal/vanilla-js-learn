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
}
