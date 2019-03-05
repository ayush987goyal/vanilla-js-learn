import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const key = 'a06658be68a261203d9759c6b5db0661';
      const results = await axios.get(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.result = results.data.recipes;
    } catch (err) {
      alert(err);
    }
  }
}
