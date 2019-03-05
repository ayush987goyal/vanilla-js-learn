import axios from 'axios';

async function getResults(query) {
  try {
    const key = 'a06658be68a261203d9759c6b5db0661';
    // const results = await axios.get(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    // console.log(results.data.recipes);
  } catch (err) {
    alert(err);
  }
}
getResults('pizza');
