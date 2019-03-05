import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    await state.search.getResults();

    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = +btn.dataset.goto;
    searchView.clearResults();
    searchView.renderResults(state.search.result, gotoPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
