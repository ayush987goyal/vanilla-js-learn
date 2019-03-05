import axios from 'axios';

import { key } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const results = await axios.get(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.result = results.data.recipes;
    } catch (err) {
      alert(err);
    }
  }
}
